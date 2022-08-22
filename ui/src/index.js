import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Results from './Results';
import Search from './Search';
import ResultsList from "./components/ResultsList/ResultsList";
import SearchBox from "./components/SearchBox/SearchBox";
import axios from 'axios';
import appConfig from './config/app.config';
import searchboxConfig from './config/searchbox.config';
import searchConfig from './config/search.config';
import searchNodeConfig from './config/searchNode.config';
import "bootstrap/dist/css/bootstrap.min.css";

const el = document.getElementById('root');
const root = ReactDOM.createRoot(el);

const App = () => {

    const [result, setResult] = useState("");

    const name = appConfig.name || "MarkLogic Search App";
    const components = appConfig.components || "local";
    const host = appConfig.server.host || "localhost";
    const port = appConfig.server.port || 4000;
    const api = appConfig.server.api || "search";

    const baseUrl = "http://" + host + ":" + port;

    const getSearchResults = async (query, api) => { 
        try {
          if (api === "search") {
            // Search using Search API
            const response = await axios.get(baseUrl + "/search?q=" + query);
            if (response && response.status === 200) {
              return response.data;
            }
          }
          if (api === "node") {
            // Search using Node.js API
            const response = await axios.get(baseUrl + "/searchWithNode?format=json&q=" + query); //, config);
            if (response && response.status === 200) {
              return response.data;
            }
          }
        } catch (error) {
          let message = error;
          console.error("Error: getSearchResults", message);
        }
    };

    const handleSearch = (query) => {
        const response = getSearchResults(query, api);
        response.then(response => {
            console.log("handleSearch response", response);
            if (api === "search") {
              setResult(response.results);
            }
            if (api === "node") {
              setResult(response);
            }
          }).catch(error => {
            console.error(error);
          });
    }

    console.log(searchboxConfig)

    return (
        <div>
            {components === "local" ?
            <div style={{padding: '10px'}}>
              <Search label="Search!" handleSearch={handleSearch} />
              <hr />
              <Results result={result} /> 
            </div> :
            <div>
              <header style={{backgroundColor: "rgb(43, 51, 60)", width: "100%", padding: "10px"}}>
                <h1 style={{fontSize: "18px", color: "#CCC", fontWeight: "bold"}}>{name}</h1>
                <SearchBox config={searchboxConfig.searchbox} button="horizontal" handleSearch={handleSearch} width="600px" />
              </header>
              <div style={{padding: '10px'}}>
                  <ResultsList 
                    data={result} 
                    config={ api === "node" ? 
                      searchNodeConfig.search.results.config : 
                      searchConfig.search.results.config } 
                  />
              </div>
            </div>}
        </div>
    )
}

root.render(<App />);