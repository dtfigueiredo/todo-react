import { useEffect } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import {
  filteredTaskListValue,
  inputTaskValue,
  isInputStrValid,
  taskListValue,
} from './atoms/atoms'

import { ListItem } from './components/ListItem'
import { TaskListProps } from './types/types'

export const App = () => {
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
      setTaskList([...taskList, { task: inputTask, isCompleted: false }])
      setInputTask('')
    }
  }

  useEffect(() => {
    const list = localStorage.getItem('tasklist')

    if (list) {
      const parseList = JSON.parse(list)
      if (parseList.length > 0) {
        localStorage.setItem('tasklist', list)
        setTaskList([...parseList])
      }
    }
  }, [])

  useEffect(() => {
    const stringList = JSON.stringify(taskList)
    localStorage.setItem('tasklist', stringList)
  }, [taskList])

  return (
    <>
      <header className='w-11/12 max-w-[600px] mx-auto'>
        <form
          onSubmit={handleSubmitTask}
          className='flex flex-col gap-2 mt-8 py-4 px-8 bg-slate-700 rounded-lg'>
          <div className='flex justify-between items-center gap-4'>
            <input
              className={`flex-1 p-2 rounded-lg border outline-none ${
                isInputValid === false && 'border border-red-500'
              }`}
              type='text'
              value={inputTask}
              onChange={handleInputTask}
              placeholder='digite a tarefa'
            />

            <button
              type='submit'
              className='py-[6px] px-4 text-white bg-slate-900 rounded-lg border border-slate-200 transition-all hover:opacity-80'>
              Salvar
            </button>
          </div>
          {isInputValid === false ? (
            <p className='pl-2 text-red-200 text-sm underline'>Input vazio</p>
          ) : null}
        </form>
      </header>

      <main className='w-11/12 max-w-[600px] mx-auto'>
        <ul className='flex flex-col gap-4 mt-8 py-4 px-8 bg-slate-900 rounded-lg'>
          <h3 className='text-xl text-white uppercase underline font-bold tracking-widest'>
            Lista de tarefas
          </h3>

          {taskList.length === 0 ? <p className='text-white'>Nenhuma tarefa cadastrada</p> : null}

          {taskList.map((item: { task: string; isCompleted: boolean }) => (
            <ListItem
              key={item.task}
              description={item.task}
              isCompleted={item.isCompleted}
            />
          ))}
        </ul>
      </main>
    </>
  )
}
