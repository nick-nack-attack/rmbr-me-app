import React from 'react';
import { Link } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NiceDate } from '../Utils/Utils';
// import StyleIcon from '../StyleIcon/StyleIcon'
import './PersonListItem.css'

export default function PersonListItem(props)  {
        return (
            <li key={props.id} className='PersonListItem'>
                <div> <h3 className='PersonListItem__heading'> { props.person_name } </h3> </div>
                <div> <p className='person_category'>{ props.type_of_person }</p> </div>
                <div className='personListItem__div_button'><Link to={`/people/${props.id}`}><button className='personListItem__button'>View Person</button></Link></div>
            </li>
            //     <header className='PersonListItem__header'>
            //         <h3 className='PersonListItem__heading'>
            //             { props.person_name }
            //         </h3>
            //     </header>
            //     <div>
            //         <p className='person_category'>{ props.type_of_person }</p>
            //     </div>
            //     <footer className='PersonListItem__footer'>
            //         <PersonRmbrCount person={2}/>
            //     </footer>
            // <Link to={`/people/${props.id}`}>
            //     <button>View Person</button>
            // </Link>
            // </li>
        )

};

function PersonStyle({ person }) {
    return (
        <span>
            { person.style }
        </span>
    )
};

function PersonAddedDate({ person }) {
    return (
        <span>
            <NiceDate/>
        </span>
    )
};

function PersonRmbrCount({ person }) {
    return (
        <span>
            <span>
                {'2'}
            </span>
        </span>
    )
};