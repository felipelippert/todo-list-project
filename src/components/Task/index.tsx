import { useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import * as S from './styles'
import { remove, edit } from '../../store/reducers/tasks'
import TaskClass from '../../models/Task'

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

  return (
    <S.Card>
      <S.Title>{title}</S.Title>
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
            <S.SaveButton
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
            </S.SaveButton>
            <S.DeleteCancelButton onClick={cancelEdition}>
              Cancel
            </S.DeleteCancelButton>
          </>
        ) : (
          <>
            <S.Button onClick={() => setIsEditing(true)}>Edit</S.Button>
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
