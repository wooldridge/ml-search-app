import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Results from './Results';
import Search from './Search';
import ResultsList from "./components/ResultsList/ResultsList";
import SearchBox from "./components/SearchBox/SearchBox";
import axios from 'axios';
import searchboxConfig from './config/searchbox.config'
import searchConfig from './config/search.config'
import "bootstrap/dist/css/bootstrap.min.css";

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

    console.log(searchboxConfig)

    return (
        <div>
            {/* <div style={{padding: '10px'}}>
              <Search label="Search!" handleSearch={handleSearch} />
              <hr />
              <Results result={result} /> 
            </div> */}
            <header style={{backgroundColor: "rgb(43, 51, 60)", width: "100%", padding: "10px"}}>
              <SearchBox config={searchboxConfig.searchbox} button="horizontal" handleSearch={handleSearch} width="600px" />
            </header>
            <div style={{padding: '10px'}}>
              <ResultsList data={result} config={searchConfig.search.results.config} />
            </div>
        </div>
    )
}

root.render(<App />);