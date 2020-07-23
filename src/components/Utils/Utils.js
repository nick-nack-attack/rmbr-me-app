import React from "react";
import './Utils.scss';

export function Button({ className, ...props }) {
    return ( 
        <button className={['Button', className].join(' ')} {...props} >
            <div>
            { 
                props.label === "Friend"
                    ? <span class="material-icons">person</span>
                    : props.label === "Co-Worker"
                    ? <span class="material-icons">work</span>
                    : props.label === "Family"
                    ? <span class="material-icons">house</span>
                    : props.label === "delete" 
                    ? <span class="material-icons">delete</span>
                    : props.label === "edit"
                    ? <span class="material-icons">create</span>
                    : ''
            }
            </div>
            <div>
            { props.label }
            </div>
        </button> 
    );
};

export function Textarea({ className, ...props }) {
    return (
        <textarea className={['Textarea', className].join(' ')} {...props} />
    )
};

export function Input({ className, ...props }) {
    return (
        <input className={['Input', className].join(' ')} {...props} />
    )
};

export function Required({ className, ...props }) {
    return (
        <span className={['Required', className].join(' ')} {...props}>
      &#42;
    </span>
    )
};

export function Section({ className, list, ...props }) {
    const classes = [
        'Section',
        list && 'Section--list',
        className,
    ].filter(Boolean).join(' ')
    return (
        <section className={classes} {...props} />
    )
};