import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import Task from '../../models/Task'
import { Priority, Status } from '../../utils/enums/Task'

type TasksState = {
  items: Task[]
}

const initialState: TasksState = {
  items: [
    {
      id: 1,
      description: 'Study JavaScript',
      priority: Priority.REGULAR,
      status: Status.COMPLETED,
      title: 'Study Java and do exercises from Module 7'
    },
    {
      id: 2,
      description: 'Study TypeScript',
      priority: Priority.REGULAR,
      status: Status.PENDING,
      title: 'Study TS and do exercises from Module 8 and 9'
    },
    {
      id: 3,
      description: 'Go to the gym',
      priority: Priority.IMPORTANT,
      status: Status.PENDING,
      title: 'Go to the gym and do workout B'
    }
  ]
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    remove: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((task) => task.id !== action.payload)
    },
    edit: (state, action: PayloadAction<Task>) => {
      const taskIndex = state.items.findIndex((t) => t.id === action.payload.id)

      if (taskIndex >= 0) {
        state.items[taskIndex] = action.payload
      }
    },
    register: (state, action: PayloadAction<Omit<Task, 'id'>>) => {
      const taskAlreadyExists = state.items.find(
        (task) =>
          task.title.toLowerCase() === action.payload.title.toLowerCase()
      )

      if (taskAlreadyExists) {
        alert("There's already a task with this name")
      } else {
        const lastTask = state.items[state.items.length - 1]
        const newTask = {
          ...action.payload,
          id: lastTask ? lastTask.id + 1 : 1
        }
        state.items.push(newTask)
      }
    },
    changeStatus: (
      state,
      action: PayloadAction<{ id: number; completed: boolean }>
    ) => {
      const taskIndex = state.items.findIndex((t) => t.id === action.payload.id)

      if (taskIndex >= 0) {
        state.items[taskIndex].status = action.payload.completed
          ? Status.COMPLETED
          : Status.PENDING
      }
    }
  }
})

export const { remove, edit, register, changeStatus } = tasksSlice.actions

export default tasksSlice.reducer
