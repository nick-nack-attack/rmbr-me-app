import { REACT_APP_API_ENDPOINT } from "../config";
import TokenService from "./token-service";

const RmbrApiService = {
    getPeople() {
        return fetch(`${REACT_APP_API_ENDPOINT}/people`, {
            headers: {}
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    getUserId() {
        return window.localStorage.getItem('user_id')
    },

    getPersonByUserId(user_id) {
        return fetch(`${REACT_APP_API_ENDPOINT}/person/user/${user_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    getPersonByPersonId(person_id) {
        return fetch(`${REACT_APP_API_ENDPOINT}/person/${person_id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    getRmbrByPersonId(person_id) {
        return fetch(`${REACT_APP_API_ENDPOINT}/person/${person_id}/rmbr`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res =>
                (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
            );
    },

    getRmbrByUserId(user_id) {
        return fetch (`${REACT_APP_API_ENDPOINT}/rmbr/user/${user_id}`, {
            method: 'GET',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
        .then(res =>
            (!res.ok)
                ? res.json().then(e => Promise.reject(e))
                : res.json()
        );
    },

    postPerson(newPerson) {
        return fetch (`${REACT_APP_API_ENDPOINT}/person`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(newPerson)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    postRmbr(newRmbr) {
        return fetch (`${REACT_APP_API_ENDPOINT}/rmbr`, {
            method: 'POST',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(newRmbr)
        })
            .then(res =>
                (!res.ok)
                    ? res.json().then(e => Promise.reject(e))
                    : res.json()
            );
    },

    editRmbr(rmbr_id, rmbrFields) {
        return fetch(`${REACT_APP_API_ENDPOINT}/rmbr/${rmbr_id}`, {
            method: 'PATCH',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(rmbrFields)
        });
    },

    editPerson(person_id, personToUpdate) {
        return fetch(`${REACT_APP_API_ENDPOINT}/person/${person_id}`, {
            method: 'PATCH',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify(personToUpdate)
        });
    },

    deletePerson(personId) {
        return fetch(`${REACT_APP_API_ENDPOINT}/person/${personId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            }
        })
            .then(res => {
                    if (!res.ok)
                        throw new Error('Could not delete')
            });
    },

    deleteRmbr(rmbrId) {
        return fetch(`${REACT_APP_API_ENDPOINT}/rmbr/${rmbrId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `bearer ${TokenService.getAuthToken()}`,
                'content-type': 'application/json'
            },
        })
            .then(res => {
                if (!res.ok)
                    throw new Error('Could not delete')
            });
    }

};

export default RmbrApiService;
