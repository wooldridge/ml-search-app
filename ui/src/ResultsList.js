import React from 'react';

const ResultsList = (props) => {

    let result = [];
    const getResults  = () => {
        if (props.result?.results?.length) {
            console.log("getResults", props.result.results);
            props.result.results.forEach((res, i) => {
                result.push(<div key={i}>{res.uri}</div>)
            });
        }
        return result;
    };

    return (<div>{getResults()}</div>);

};

export default ResultsList;