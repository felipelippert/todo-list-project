import { FormEvent, useState } from 'react'
import { Input, ListContainer, SaveButton, Title } from '../../styles'
import { Form, Option, Options } from './styles'
import { useDispatch } from 'react-redux'
import { Priority, Status } from '../../utils/enums/Task'
import { register } from '../../store/reducers/tasks'
import { useNavigate } from 'react-router-dom'

const Formulary = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState(Priority.REGULAR)

  const registerTask = (event: FormEvent) => {
    event.preventDefault()

    dispatch(
      register({
        title,
        priority,
        description,
        status: Status.PENDING
      })
    )
    navigate('/')
  }

  return (
    <ListContainer>
      <Title>New task</Title>
      <Form onSubmit={registerTask}>
        <Input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          type="text"
          placeholder="Title"
        />
        <Input
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          as="textarea"
          placeholder="Task description"
        />
        <Options>
          <p>Priority:</p>
          {Object.values(Priority).map((priority) => (
            <Option key={priority}>
              <input
                value={priority}
                name="priority"
                type="radio"
                onChange={(event) =>
                  setPriority(event.target.value as Priority)
                }
                id={priority}
                defaultChecked={priority === Priority.REGULAR}
              />{' '}
              <label htmlFor={priority}>{priority}</label>
            </Option>
          ))}
        </Options>
        <SaveButton type="submit">Register</SaveButton>
      </Form>
    </ListContainer>
  )
}

export default Formulary
