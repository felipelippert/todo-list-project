import AddButton from '../../components/AddButton'
import SideBar from '../../containers/SideBar'
import TaskList from '../../containers/TaskList'

const Home = () => (
  <>
    <SideBar showFilters />
    <TaskList />
    <AddButton />
  </>
)

export default Home
