import React, { useState } from 'react';
import UserDetails from './UserDetails';

function SearchDetails() {
  const [searchDetail, setSearchDetail] = useState('');
  const [searchType, setSearchType] = useState('users');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDetails = (resource, query) => {
    setLoading(true);
    fetch(`https://task-manager3-cl1c.onrender.com/${resource}?q=${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Error fetching ${resource}: ${response.statusText}`);
        }
        return response.json();
      })
      .then(setResults)
      .catch((error) => {
        console.error(error);
        setResults([]);
      })
      .finally(() => setLoading(false));
  };

  const handleSearch = () => {
    if (!searchDetail.trim()) {
      alert('Please enter a search term.');
      return;
    }
    fetchDetails(searchType, searchDetail);
  };
 
  return (
    <div className='search-container'>
      <input
        type="text"
        value={searchDetail}
        onChange={(e) => setSearchDetail(e.target.value)}
        placeholder="Search..."
      />
      <select
        value={searchType}
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="users">Users</option>
        <option value="departments">Departments</option>
        <option value="tasks">Tasks</option>
      </select>
      <button onClick={handleSearch}>Search</button>

      <div className='results-container'>
      <h3>Results</h3>
      {loading ? (
        <p>Loading...</p>
      ) : results.length > 0 ? (
        <ul>
          {searchType === 'users' ? (
            // Render UserDetail component for each user
            results.map((user) => (
              <li key={user.id}>
                <UserDetails user={user} />
              </li>
            ))
          ) : (
            // Render other results (departments or tasks)
            results.map((item) => (
              <li key={item.id}>
                {item.name || item.title || item.description}
              </li>
            ))
          )}
        </ul>
      ) : (
        <p>No results found.</p>
      )}
    
        
      </div>
    </div>
  
  );
}

export default SearchDetails;