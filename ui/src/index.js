import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import ResultsList from './ResultsList';
import SearchBox from './SearchBox';
import axios from 'axios';

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

const App = () => {

    const [result, setResult] = useState("");

    const getSearchResults = async (query) => { 
        try {
          // Search using Node.js API
          //const response = await axios.get("http://localhost:4000/searchNode?format=json&q=" + query, config);
          // Search using Search API
          const response = await axios.get("http://localhost:4000/search?q=" + query);
          if (response && response.status === 200) {
            return response.data;
          }
        } catch (error) {
          let message = error;
          console.error("Error: getSearchResults", message);
        }
    };

    const handleSearch = (query) => {
        const response = getSearchResults(query);
        response.then(result => {
            setResult(result);
          }).catch(error => {
            console.error(error);
          });
    }

    return (
        <div>
            <SearchBox label="Search!" handleSearch={handleSearch} />
            <hr />
            <ResultsList result={result} />
        </div>
    )
}

root.render(<App />);