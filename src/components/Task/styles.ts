import styled from 'styled-components'
import variables from '../../styles/variables'
import { Priority, Status } from '../../utils/enums/Task'
import { Button } from '../../styles'

type TagProps = {
  priority?: Priority
  status?: Status
  parameter: 'status' | 'priority'
}

function returnBgColor(props: TagProps): string {
  if (props.parameter === 'priority') {
    if (props.priority === Priority.URGENT) return variables.red
    if (props.priority === Priority.IMPORTANT) return variables.orange
  } else {
    if (props.status === Status.PENDING) return variables.yellow
    if (props.status === Status.COMPLETED) return variables.green
  }

  return '#ccc'
}

export const Card = styled.div`
  background: #fcfcfc;
  box-shadow: 0px 4px 4px 0px #00000040;
  padding: 16px;
  margin-bottom: 32px;
  border-radius: 16px;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
`

export const Title = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-left: 8px;
`

export const Tag = styled.span<TagProps>`
  padding: 4px 8px;
  color: #fff;
  font-size: 10px;
  font-weight: bold;
  background: ${(props) => returnBgColor(props)};
  border-radius: 8px;
  margin-right: 16px;
  display: inline-block;
`

export const Description = styled.textarea`
  color: #8b8b8b;
  font-size: 14px;
  line-height: 24px;
  font-family: 'Roboto Mono', monospace;
  display: block;
  width: 100%;
  margin-bottom: 16px;
  margin-top: 16px;
  resize: none;
  border: none;
  background: transparent;
`

export const ActionBar = styled.div`
  border-top: 1px solid #0000001a;
  padding-top: 16px;
`

export const DeleteCancelButton = styled(Button)`
  background: ${variables.red};
`
