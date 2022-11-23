import { FaCheckCircle, FaTrash } from 'react-icons/fa'
import { useRecoilState } from 'recoil'

import { taskListValue } from '../atoms/atoms'
import { ListItemProps, TaskListProps } from '../types/types'

export const ListItem = ({ description }: ListItemProps) => {
  const [taskList, setTaskList] = useRecoilState<TaskListProps[]>(taskListValue)

  const handleIsCompleted = (e: any) => {}

  const handleRemove = (e: any) => {
    const description = e.target.parentElement.parentElement.parentElement.previousSibling.innerText

    const filteredList = taskList.filter((task) => task.task !== description)
    const stringList = JSON.stringify(filteredList)
    localStorage.setItem('tasklist', stringList)
    setTaskList(filteredList)
  }

  return (
    <li className='flex justify-between items-center py-1 px-4 rounded-lg border border-white'>
      <p className={`text-white`}>{description}</p>

      <div className='flex justify-between items-center gap-4'>
        <button
          className='rounded-full text-green-400'
          onClick={handleIsCompleted}>
          <FaCheckCircle className='text-2xl font-bold' />
        </button>

        <button
          className='rounded-full text-red-400'
          onClick={handleRemove}>
          <FaTrash className='text-xl font-bold' />
        </button>
      </div>
    </li>
  )
}
