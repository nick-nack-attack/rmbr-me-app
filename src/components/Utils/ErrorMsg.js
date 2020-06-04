// Element component - Error Message (for forms)
import React from 'react';

// Takes the props.message and displays it with special treatment
const ErrorMsg = (props) => {
    return (
        <span className="form-error-label">
            {props.message}
        </span>
    );
};

export default ErrorMsg;