import React, { useContext } from 'react';

const Results = (props) => {
    mlContext = useContext(MLContext);

    let result = [];
    const getResults  = () => {
        if (mlContext.results?.length) {
          mlContext.results.forEach((res, i) => {
            result.push(<div key={i}>{res.uri}</div>);
          });
        }
        return result;
    };

    return (<div>{getResults()}</div>);

};

export default Results;