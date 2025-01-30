import { Routes, Route } from 'react-router-dom';
import SearchDetails from '../Components/SearchDetails';

function Main() {
    return (
        <div>
          <Routes>
            <Route path='/' element={<SearchDetails />} />
          </Routes>
        </div>
    )
}

export default Main;