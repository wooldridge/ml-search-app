import React from 'react';

const Results = (props) => {

    let result = [];
    const getResults  = () => {
        if (props.result?.length) {
            props.result.forEach((res, i) => {
                result.push(<div key={i}>{res.uri}</div>);
            });
        }
        return result;
    };

    return (<div>{getResults()}</div>);

};

export default Results;