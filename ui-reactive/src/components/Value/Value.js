import React from "react";
import "./Value.scss";
import {getValByPath, getValByConfig} from "../../util/util";

/**
 * Component for showing normal value.
 *
 * @component
 * @example
 * TBD
 */
const Value = (props) => {

    let val;
    if (props.children) {
        val = props.children;
    } else {
        val = getValByConfig(props.data, props.config, true);
    }

    // Handle prefix/suffix during display (different from prepend/append during extraction)
    if (val && props.config.prefix) {
        val = props.config.prefix.concat(val);
    }
    if (val && props.config.suffix) {
        val = val.concat(props.config.suffix);
    }

    let valueClassName = props.className ? props.className : props.config.className ? props.config.className : "";
    let valueStyle = props.style ? props.style : props.config.style ? props.config.style : {};
    let valueTitle = val;

    let id;
    if (props.id) {
        id = props.id
    } else {
        id = props.config.id ? getValByPath(props.data, props.config.id) : null
    }

    return (
        val && 
        <span
            id={id}
            className={valueClassName}
            style={valueStyle}
            title={valueTitle}
            data-testid="valueId"
        >{val}</span>
    );
};

export default Value;
