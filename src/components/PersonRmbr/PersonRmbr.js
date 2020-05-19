import React, { Component } from "react";
import RmbrMeContext from "../../contexts/RmbrMeContext";
import PeopleApiService from "../../services/person-api-service";
import { NiceDate } from "../Utils/Utils";
import { Button, Textarea } from "../Utils/Utils";
// import './PersonRmbr.css'

export default function PersonRmbr(props) {

        return (

            <li key={props.id} className='PersonRmbrListItem'>
                <div><p>title: {props.rmbr_title}</p></div>
                { !props.rmbr_text ? <div></div> : <div><p>text: {props.rmbr_text}</p></div> } 
                {/* <div> <p>Created: {props.date_created}</p></div>
                <div> <p>Modified: {props.date_modified}</p></div> */}
            </li>

        )


}