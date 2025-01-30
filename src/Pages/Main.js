import { Routes, Route } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchDetails from '../Components/SearchDetails';
import TaskList from '../Components/TaskList';

function Main() {
    return (
        <div>
          <NavBar />
          <Routes>
            <Route path='/' element={<SearchDetails />} />
            <Route path='/Task-List' element={<TaskList />}/>
          </Routes>
        </div>
    )
}

export default Main;