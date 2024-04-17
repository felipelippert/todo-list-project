import { useSelector } from 'react-redux'
import Task from '../../components/Task'
import { ListContainer } from './styles'
import { RootReducer } from '../../store'

const TaskList = () => {
  const { items } = useSelector((state: RootReducer) => state.tasks)
  const { term, criteria, value } = useSelector(
    (state: RootReducer) => state.filter
  )

  const filterTasks = () => {
    let filteredTasks = items

    if (term !== undefined) {
      filteredTasks = filteredTasks.filter(
        (item) => item.title.toLowerCase().search(term.toLowerCase()) >= 0
      )

      if (criteria === 'priority') {
        filteredTasks = filteredTasks.filter((item) => item.priority === value)
      } else if (criteria === 'status') {
        filteredTasks = filteredTasks.filter((item) => item.status === value)
      }

      return filteredTasks
    } else {
      return items
    }
  }

  return (
    <ListContainer>
      <p>2 tasks marked with: &quot;category&ldquo; e &quot;{term}&ldquo;</p>
      <ul>
        <li>{term}</li>
        <li>{criteria}</li>
        <li>{value}</li>
      </ul>
      <ul>
        {filterTasks().map((t) => (
          <li key={t.title}>
            <Task
              id={t.id}
              description={t.description}
              title={t.title}
              status={t.status}
              priority={t.priority}
            />
          </li>
        ))}
      </ul>
    </ListContainer>
  )
}

export default TaskList
