import { useDispatch, useSelector } from 'react-redux'
import * as S from './styles'
import { changeFilter } from '../../store/reducers/filter'
import { Priority, Status } from '../../utils/enums/Task'
import { RootReducer } from '../../store'

export type Props = {
  legend: string
  criteria: 'priority' | 'status' | 'all'
  value?: Priority | Status
}

const CardFilter = ({ legend, criteria, value }: Props) => {
  const dispatch = useDispatch()
  const { filter, tasks } = useSelector((state: RootReducer) => state)

  const checkIfActive = () => {
    const sameCriteria = filter.criteria === criteria
    const sameValue = filter.value === value

    return sameCriteria && sameValue
  }

  const countTasks = () => {
    if (criteria === 'all') return tasks.items.length
    if (criteria === 'priority') {
      return tasks.items.filter((item) => item.priority === value).length
    }
    if (criteria === 'status') {
      return tasks.items.filter((item) => item.status === value).length
    }
  }

  const filtering = () => {
    dispatch(
      changeFilter({
        criteria,
        value
      })
    )
  }

  const count = countTasks()
  const active = checkIfActive()

  return (
    <S.Card onClick={filtering} active={active}>
      <S.Count>{count}</S.Count>
      <S.Label>{legend}</S.Label>
    </S.Card>
  )
}

export default CardFilter
