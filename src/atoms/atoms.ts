import { atom } from 'recoil'

import { TaskListProps } from '../types/types'

export const taskListValue = atom<TaskListProps[]>({
  key: 'taskListKey',
  default: [],
})

export const inputTaskValue = atom<string>({
  key: 'inputTaskKey',
  default: '',
})

export const isInputStrValid = atom<boolean>({
  key: 'isInputValidKey',
  default: true,
})

export const isTaskCompletedValue = atom<boolean>({
  key: 'isTaskCompletedKey',
  default: false,
})
