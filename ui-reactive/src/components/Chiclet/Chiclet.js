import React from "react";
import "./Chiclet.scss";
import { getValByConfig } from "../../util/util";

/**
 * Component for showing value in colored container.
 *
 * @component
 * @example
 * TBD
 */
const Chiclet = (props) => {

    let val;
    if (props.children) {
        val = props.children;
    } else {
        val = getValByConfig(props.data, props.config, true)
    }

    const chicletColors = props.config.colors || {};
    const defaultColor = "#dfdfdf";
    
    let chicletStyle = props.config.style ? props.config.style : {};
    chicletStyle = Object.assign({
        backgroundColor: chicletColors[val] ? chicletColors[val] : defaultColor
    }, chicletStyle);
    const chicletTitle = val;

    return (
        <span 
            className="Chiclet" 
            style={chicletStyle}
            title={chicletTitle}
            data-testid="chiclet-container" 
        >
            {val}
        </span>
    );
};

export default Chiclet;
