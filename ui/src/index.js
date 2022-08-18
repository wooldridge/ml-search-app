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
          //const response = await axios.get("http://localhost:4000/search?format=json&q=" + query, config);
          const response = await axios.get("http://localhost:4000/search2?q=" + query);
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
            console.log(result);
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