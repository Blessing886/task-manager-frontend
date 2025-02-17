import { Routes, Route } from 'react-router-dom';
import NavBar from '../Components/NavBar';
import SearchDetails from '../Components/SearchDetails';
import TaskList from '../Components/TaskList';
import AssignForm from '../Components/AssignForm';
import Home from './Home';

function Main() {
    return (
        <div>
          <NavBar />
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/search-details' element={<SearchDetails />} />
            <Route path='/Task-List' element={<TaskList />}/>
            <Route path='/assign-task' element={<AssignForm />}/>
          </Routes>
        </div>
    )
}

export default Main;