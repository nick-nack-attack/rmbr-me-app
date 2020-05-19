import config from "../config";
import TokenService from "./token-service";

const PeopleApiService = {

    getPeople() {
        console.log('getPeople ran')
        return fetch(`${config.API_ENDPOINT}/people`, {
            headers: {}
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    getPerson(userId) {
        return fetch(`${config.API_ENDPOINT}/people/users/${userId}`, {
            // headers: {
            //     'Authorization': `bearer ${TokenService.getAuthToken()}`
            // }
        })
            .then(res => 
                (!res.ok) 
                    ? res.json().then(e => Promise.reject(e)) 
                    : res.json() )
    },

    getOnePerson(personId) {
        return fetch(`${config.API_ENDPOINT}/people/${personId}`, {
            // headers: {
            //     'Authorization': `bearer ${TokenService.getAuthToken()}`
            // }
        })
        .then(res => 
            (!res.ok) 
                ? res.json().then(e => Promise.reject(e)) 
                : res.json() )
},

    getPersonRmbrs(personId) {
        return fetch(`${config.API_ENDPOINT}/people/${personId}/rmbrs`, {
            // headers: {
            //     'Authorization': `bearer ${TokenService.getAuthToken()}`
            // }
        })
            .then(res => 
                (!res.ok) 
                ? res.json().then(e => Promise.reject(e)) 
                : res.json() )
    },

    postPerson(newPerson) {

        return fetch (`http://localhost:8000/api/people`, {
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
        return fetch (`${config.API_ENDPOINT}/rmbrs`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRmbr)
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    }

}

export default PeopleApiService;