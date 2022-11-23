import { useRecoilValue } from 'recoil'

import { taskListValue } from '../atoms/atoms'
import { ListItem } from './ListItem'

export const Main = () => {
  const taskList = useRecoilValue(taskListValue)

  return (
    <main className='w-11/12 max-w-[600px] mx-auto'>
      <ul className='flex flex-col gap-4 mt-8 py-6 px-8 bg-slate-900 rounded-lg'>
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
  )
}
