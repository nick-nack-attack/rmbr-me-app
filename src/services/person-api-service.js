import config from "../config";
import TokenService from "./token-service";

const PeopleApiService = {

    getPeople() {
        return fetch(`${config.API_ENDPOINT}/people`, {
            headers: {}
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    getPerson(personId) {
        return fetch(`${config.API_ENDPOINT}/people/${personId}`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    getPersonRmbrs(personId) {
        return fetch(`${config.API_ENDPOINT}/people/${personId}/rmbrs`, {
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            }
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    },

    postRmbr(personId, title, text, category, userId) {
        return fetch (`${config.API_ENDPOINT}/rmbrs`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({
                person_id: personId,
                title,
                text,
                category,
                userId
            })
        })
            .then(res => (!res.ok) ? res.json().then(e => Promise.reject(e)) : res.json() )
    }

}

export default PeopleApiService;