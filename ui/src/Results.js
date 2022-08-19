import React from 'react';

const Results = (props) => {

    let result = [];
    const getResults  = () => {
        if (props.result?.results?.length) {
            props.result.results.forEach((res, i) => {
                result.push(<div key={i}>{res.extracted.person.nameGroup.fullname.value}</div>)
            });
        }
        return result;
    };

    return (<div>{getResults()}</div>);

};

export default Results;