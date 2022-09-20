import React from "react";
import "./DateTime.scss";
import { getValByConfig, getFormattedDateTime } from "../../util/util";
import { DateTime as dt } from "luxon";
import _ from "lodash";

/**
 * Component for showing date and time information.
 *
 * @component
 * @example
 * TBD
 */
const DateTime = (props) => {

    const defaultFormat = "yyyy-MM-dd";

    let val;
    if (props.children) {
        val = props.children;
    } else {
        val = getValByConfig(props.data, props.config, true)
    }

    val = getFormattedDateTime(val, props.config.format, props.config.from);

    // Handle prefix/suffix during display (different from prepend/append during extraction)
    if (val && props.config.prefix) {
        val = props.config.prefix.concat(val);
    }
    if (val && props.config.suffix) {
        val = val.concat(props.config.suffix);
    }

    const dateTimeClassName = props.className ? props.className : props.config.className ? props.config.className : "";
    const dateTimeStyle = props.style ? props.style : props.config.style ? props.config.style : {};
    const dateTimeTitle = val;

    return (
        val && 
        <span 
            className={dateTimeClassName ? dateTimeClassName : "DateTime"} 
            style={dateTimeStyle}
            title={dateTimeTitle}
            data-testid="dateTimeContainer" 
        >
            {val}
        </span>
    );
};

export default DateTime;
