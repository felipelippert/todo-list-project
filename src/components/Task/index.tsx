import { useDispatch } from 'react-redux'
import { ChangeEvent, useEffect, useState } from 'react'
import * as S from './styles'
import { remove, edit, changeStatus } from '../../store/reducers/tasks'
import TaskClass from '../../models/Task'
import { Button, SaveButton } from '../../styles'
import { Status } from '../../utils/enums/Task'

type Props = TaskClass

const Task = ({
  description: originalDescription,
  priority,
  status,
  title,
  id
}: Props) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (originalDescription.length > 0) {
      setDescription(originalDescription)
    }
  }, [originalDescription])

  function cancelEdition() {
    setIsEditing(false)
    setDescription(originalDescription)
  }

  function changeTaskStatus(event: ChangeEvent<HTMLInputElement>) {
    console.log(event.target.checked)
    dispatch(
      changeStatus({
        id,
        completed: event.target.checked
      })
    )
  }

  return (
    <S.Card>
      <label htmlFor={title}>
        <input
          onChange={changeTaskStatus}
          checked={status === Status.COMPLETED}
          type="checkbox"
          id={title}
        />
        <S.Title>
          {isEditing && <em>Editing: </em>}
          {title}
        </S.Title>
      </label>
      <S.Tag parameter="priority" priority={priority}>
        {priority}
      </S.Tag>
      <S.Tag parameter="status" status={status}>
        {status}
      </S.Tag>
      <S.Description
        disabled={!isEditing}
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />
      <S.ActionBar>
        {isEditing ? (
          <>
            <SaveButton
              onClick={() => {
                dispatch(
                  edit({
                    description,
                    priority,
                    status,
                    title,
                    id
                  })
                )
                setIsEditing(false)
              }}
            >
              Save
            </SaveButton>
            <S.DeleteCancelButton onClick={cancelEdition}>
              Cancel
            </S.DeleteCancelButton>
          </>
        ) : (
          <>
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <S.DeleteCancelButton onClick={() => dispatch(remove(id))}>
              Delete
            </S.DeleteCancelButton>
          </>
        )}
      </S.ActionBar>
    </S.Card>
  )
}

export default Task
