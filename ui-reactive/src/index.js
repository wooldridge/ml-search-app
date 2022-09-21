import React from 'react';
// React 18
// import ReactDOM from 'react-dom/client';
// React pre-18
import { render } from "react-dom";

import { ReactiveBase, DataSearch, ReactiveList, MultiList, StateProvider } from "@appbaseio/reactivesearch";
import appConfig from './config/app.config';

import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.scss";

import ResultsList from './components/ResultsList/ResultsList';
import searchConfig from './config/search.config.js'; // Elasticsearch UI config
import searchConfigML from './config/searchML.config.js'; // MarkLogic UI config

// React 18
// const el = document.getElementById('root');
// const root = ReactDOM.createRoot(el);

// React pre-18
const root = document.getElementById("root");

const dataSource = "MarkLogic"; // "Elasticsearch" or "MarkLogic"

const App = () => {

    const name = appConfig.name || "Search App";

    return (
        <ReactiveBase
            url={ dataSource ==="Elasticsearch" ? "http://localhost:3000" : "http://localhost:7777" }
            app="good-books-ds"
            credentials="elastic:X1loFwNN3fFJLAOCjtRn"
            enableAppbase={false}
            transformResponse={async (elasticsearchResponse, componentId) => {
                console.log("transformResponse", elasticsearchResponse, componentId);
                return elasticsearchResponse;
            }}
        >
            <div>
                <header style={{backgroundColor: "rgb(43, 51, 60)", width: "100%", padding: "10px"}}>
                    <h1 style={{display: "inline-block", position: "relative", top: "3px", margin: "0 20px 0 0", fontSize: "28px", color: "#CCC", fontWeight: "bold"}}>{name}</h1>
                    <div class="searchbox">
                        <DataSearch
                            componentId="searchbox"
                            dataField={ dataSource === "Elasticsearch" ? [
                                {
                                    "field": "authors",
                                    "weight": 3
                                },
                                {
                                    "field": "authors.autosuggest",
                                    "weight": 1
                                },
                                {
                                    "field": "original_title",
                                    "weight": 5
                                },
                                {
                                    "field": "original_title.autosuggest",
                                    "weight": 1
                                },
                            ] : "content.person.nameGroup.fullname.value" }
                            placeholder="Search for data"
                            innerClass={{
                                input: 'search-input'
                            }}
                            react={{ and: ["list-0"]}}
                        />
                    </div>
                </header>
                <div style={{display: 'flex', alignItems: 'flex-start'}}>
                    <div id="left" style={{padding: '10px', minWidth: '300px', display: 'inline-block'}}>
                        <MultiList
                            componentId="list-0"
                            dataField={ dataSource === "Elasticsearch" ? "authors.keyword" : "country" }
                            className="filter"
                            title="Filter"
                            filterLabel="Filter"
                            size={10}
                            sortBy="count"
                            react={{ and: ["searchbox"]}}
                        />
                    </div>
                    <div style={{padding: '10px', display: 'inline-block', width: 'calc(100% - 340px)'}}>
                        {/* <ReactiveList
                            componentId="results"
                            dataField="_score"
                            size={10}
                            pagination={true}
                            react={{
                            and: ["searchbox"] //, "authorsfilter", "ratingsfilter"]
                            }}
                            render={({ data }) => (
                            <ReactiveList.ResultCardsWrapper>
                            {data.map((item) => (
                                <ResultCard key={item._id}>
                                <ResultCard.Image src={item.image} />
                                <ResultCard.Title
                                dangerouslySetInnerHTML={{
                                __html: item.original_title
                                }}
                                />
                                <ResultCard.Description>
                                {item.authors + " " + "*".repeat(item.average_rating)}
                                </ResultCard.Description>
                                </ResultCard>
                            ))}
                            </ReactiveList.ResultCardsWrapper>
                            )}
                        /> */}
                        <ReactiveList
                            componentId="results2"
                            dataField="_id"
                            size={5}
                            pagination={true}
                            showResultStats={true}
                            react={{
                                and: ["searchbox", "list-0"] //, "authorsfilter", "ratingsfilter"]
                            }}
                            render={({ data }) => (
                                <ResultsList 
                                    data={data} 
                                    config={ dataSource === "Elasticsearch" ? 
                                        searchConfig.search.results.config : searchConfigML.search.results.config } 
                                />
                            )}
                        />
                        {/* <StateProvider componentIds="results2" render={({ searchState }) => (
                            <div>
                                <pre>Search State: ${JSON.stringify(searchState, undefined, 2)}</pre>
                            </div>
                        )}/> */}
                    </div>
                </div>
            </div>
        </ReactiveBase>
    )
}

// React 18
// root.render(<App />);

// React pre-18
render(<App />, root);