import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardFilter from '../../components/CardFilter'

import * as S from './styles'
import { RootReducer } from '../../store'
import { changeTerm } from '../../store/reducers/filter'
import { Priority, Status } from '../../utils/enums/Task'
import { Button, Input } from '../../styles'

type Props = {
  showFilters: boolean
}

const SideBar = ({ showFilters }: Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { term } = useSelector((state: RootReducer) => state.filter)
  return (
    <S.Aside>
      <div>
        {showFilters ? (
          <>
            <Input
              type="text"
              placeholder="Search"
              value={term}
              onChange={(event) => dispatch(changeTerm(event.target.value))}
            />
            <S.Filters>
              <CardFilter
                value={Status.PENDING}
                criteria="status"
                legend="pending"
              />
              <CardFilter
                value={Status.COMPLETED}
                criteria="status"
                legend="completed"
              />
              <CardFilter
                value={Priority.URGENT}
                criteria="priority"
                legend="urgent"
              />
              <CardFilter
                value={Priority.IMPORTANT}
                criteria="priority"
                legend="important"
              />
              <CardFilter
                value={Priority.REGULAR}
                criteria="priority"
                legend="regular"
              />
              <CardFilter criteria="all" legend="all" />
            </S.Filters>
          </>
        ) : (
          <Button onClick={() => navigate('/')} type="button">
            Back to task list
          </Button>
        )}
      </div>
    </S.Aside>
  )
}

export default SideBar
