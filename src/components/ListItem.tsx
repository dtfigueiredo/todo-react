import { AiOutlineCheck } from 'react-icons/ai'
import { FiTrash2 } from 'react-icons/fi'

interface ListItemProps {
  description: string
  object: { task: string; isCompleted: boolean }
  isCompleted: boolean
}

export const ListItem = ({ description, isCompleted }: ListItemProps) => {
  const handleRemove = () => {}

  return (
    <li className='flex justify-between items-center border border-white'>
      {/* <p className={`text-white ${taskCompleted ? 'line-through' : ''}`}>{description}</p> */}
      <p className={`text-white`}>{description}</p>

      <div className='flex justify-between items-center gap-4'>
        <button
          className='text-emerald-200'
          onClick={() => console.log('checked')}>
          <AiOutlineCheck />
        </button>
        <button
          className='text-red-400'
          onClick={() => console.log('apagado')}>
          <FiTrash2 />
        </button>
      </div>
    </li>
  )
}
