import React from "react";

import "./Utils.scss";

const Loader = props => {

    return (
        <span>
            <div class="loader"></div>
            { props.label }
        </span>
    );

};

export default Loader;