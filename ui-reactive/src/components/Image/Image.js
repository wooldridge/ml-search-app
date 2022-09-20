import React from "react";
import "./Image.scss";
import { getValByConfig } from "../../util/util";

/**
 * Component for showing date and time information.
 *
 * @component
 * @example
 * TBD
 */
const Image = (props) => {

    let src;
    if (props.children) {
        src = props.children;
    } else {
        src = getValByConfig(props.data, props.config, true);
    }

    const imageClassName = props.className ? props.className : props.config.className ? props.config.className : "";
    const imageStyle = props.style ? props.style : props.config.style ? props.config.style : {};

    return (<img
        src={src}
        className={imageClassName ? imageClassName : "Image"}
        style={imageStyle}
        alt={props.config.alt}
        data-testid="imageId"
    />);
};

export default Image;
