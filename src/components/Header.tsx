import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { inputTaskValue, isInputStrValid, taskListValue } from '../atoms/atoms'
import { TaskListProps } from '../types/types'

export const Header = () => {
  const [taskList, setTaskList] = useRecoilState<TaskListProps[]>(taskListValue)

  const [isInputValid, setIsInputValid] = useRecoilState(isInputStrValid)
  const [inputTask, setInputTask] = useRecoilState(inputTaskValue)

  const handleInputTask = (e: any) => setInputTask(e.target.value)

  const handleSubmitTask = (e: any) => {
    e.preventDefault()

    if (!inputTask) {
      setIsInputValid(false)
      return
    } else {
      setIsInputValid(true)
      setTaskList([{ task: inputTask, isCompleted: false }, ...taskList])
      setInputTask('')
    }
  }

  useEffect(() => {
    const savedList = localStorage.getItem('tasklist')

    if (savedList) {
      const parseList = JSON.parse(savedList)
      if (parseList.length > 0) {
        localStorage.setItem('tasklist', savedList)
        setTaskList([...parseList])
      }
    }
  }, [])

  useEffect(() => {
    const stringList = JSON.stringify(taskList)
    localStorage.setItem('tasklist', stringList)
  }, [taskList])

  return (
    <header className='w-11/12 max-w-[600px] mx-auto'>
      <form
        onSubmit={handleSubmitTask}
        className='flex flex-col gap-2 mt-8 mx-auto py-4 px-8 bg-slate-700 rounded-lg'>
        <div className='flex gap-4'>
          <input
            className={`w-full p-2 rounded-lg border outline-none ${
              isInputValid === false && 'border border-red-500'
            }`}
            type='text'
            value={inputTask}
            onChange={handleInputTask}
            placeholder='digite a tarefa'
          />

          <button
            type='submit'
            className='py-[6px] px-4 text-sm md:text-base text-white bg-slate-900 rounded-lg border border-slate-200 transition-all hover:opacity-80'>
            Salvar
          </button>
        </div>

        {isInputValid === false ? (
          <p className='pl-2 text-red-200 text-sm underline'>Input vazio</p>
        ) : null}
      </form>
    </header>
  )
}
