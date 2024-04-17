import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Priority, Status } from '../../utils/enums/Task'

export type FilterState = {
  term?: string
  criteria: 'priority' | 'status' | 'all'
  value?: Priority | Status
}

const initialState: FilterState = {
  term: '',
  criteria: 'all'
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeTerm: (state, action: PayloadAction<string>) => {
      state.term = action.payload
    },
    changeFilter: (state, action: PayloadAction<FilterState>) => {
      state.criteria = action.payload.criteria
      state.value = action.payload.value
    }
  }
})

export const { changeTerm, changeFilter } = filterSlice.actions
export default filterSlice.reducer
