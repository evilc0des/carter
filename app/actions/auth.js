import axios from 'axios';


function attemptLogin(email) {
    return {
        type: 'ATTEMPT_LOGIN',
        email: email
    }
}

function setLoginSuccess(json) {
    return {
        type: 'SET_LOGIN_SUCCESS',
        success: json.data.s,
        receivedAt: Date.now()
    }
}

function attemptLogout() {
    return {
        type: 'ATTEMPT_LOGOUT'
    }
}

function setLogoutSuccess(json) {
    return {
        type: 'SET_LOGOUT_SUCCESS',
        success: json.data.s,
        receivedAt: Date.now()
    }
}

export function login(email, password) {
    return dispatch => {
        dispatch(attemptLogin(email));
        return axios.post(`/auth/login`, {
            email: email,
            password: password
        })
        .then(json => dispatch(setLoginSuccess(json)))
    }
}

export function logout() {
    return dispatch => {
        dispatch(attemptLogout());
        return axios.get(`/auth/logout`)
        .then(json => dispatch(setLogoutSuccess(json)))
    }
}