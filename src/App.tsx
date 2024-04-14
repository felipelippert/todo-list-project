import SideBar from './containers/SideBar'
import TaskList from './containers/TaskList'
import GlobalStyle, { Container } from './styles'

function App() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <SideBar />
        <TaskList />
      </Container>
    </>
  )
}

export default App
