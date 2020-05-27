import config from "../config";
import TokenService from "./token-service";

const RmbrApiService = {

    getPeople() {
        console.log('getPeople ran')
        return fetch(`${config.API_ENDPOINT}/people`, {
            headers: {}
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    getUserId() {
        return window.localStorage.getItem('user_id')
    },

    getPersonByUserId(user_id) {
        return fetch(`${config.API_ENDPOINT}/person/user/${user_id}`, {
            method: 'GET'
            // headers: {
            //     'Authorization': `bearer ${TokenService.getAuthToken()}`
            // }
        })
            .then(res => 
                (!res.ok) 
                    ? res.json().then(e => Promise.reject(e)) 
                    : res.json() )
    },

    getPersonByPersonId(person_id) {
        return fetch(`${config.API_ENDPOINT}/person/${person_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    getRmbrByPersonId(person_id) {
        return fetch(`${config.API_ENDPOINT}/person/${person_id}/rmbr`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                // 'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => 
                (!res.ok) 
                ? res.json().then(e => Promise.reject(e)) 
                : res.json() )
    },

    getRmbrByUserId(user_id) {
        return fetch (`${config.API_ENDPOINT}/rmbr/user/${user_id}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json() )
    },

    postPerson(newPerson) {
        return fetch (`http://localhost:8000/api/person`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify(newPerson)
        })
        .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    postRmbr(newRmbr) {
        return fetch (`${config.API_ENDPOINT}/rmbr`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRmbr)
        })
        .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    deleteRmbr(rmbrId) {
        return fetch(`${config.API_ENDPOINT}/rmbr/${rmbrId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            },
        })
        .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    editRmbr(rmbr_id, rmbrFields) {
        console.log(rmbr_id, rmbrFields)
        return fetch(`${config.API_ENDPOINT}/rmbr/${rmbr_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(rmbrFields)
        })
    },

    editPerson(person_id, personToUpdate) {
        return fetch(`${config.API_ENDPOINT}/person/${person_id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(personToUpdate)
        })
    },

    deletePerson(personId) {
        return fetch(`${config.API_ENDPOINT}/person/${personId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    }

}

export default RmbrApiService;