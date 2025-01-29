import { Routes, Route } from 'react-router-dom';
import SearchBar from '../Components/SearchBar';

function Main() {
    return (
        <div>
          <Routes>
            <Route path='/' element={<SearchBar />} />
          </Routes>
        </div>
    )
}

export default Main;