import loginSvc from '../services/login'
import localStorage from '../localstorage/localstorage'

import { sendMessage } from './notificationReducer'

const initialState = {
    login: undefined
};

const reducer = (store = initialState, action) => {
    if (action.type == 'LOGIN') {
        return {...store, ...{ login: action.data.login }}
    }
    if (action.type == 'LOGOUT') {
        return {...store, ...{ login: undefined }}
    }
    return store
};

export const initializeLogin = () => {
    return (dispatch) => {
        const login = localStorage.getLogin();
        if (login) {
            dispatch({
                type: 'LOGIN',
                data: {
                    login
                }
            })
        }
    }
};

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            const response = await loginSvc.login({
                username: username,
                password: password
            });

            const token = response.data.token

            localStorage.loggedIn({ username, token });

            dispatch({
                type: 'LOGIN',
                data: {
                    login: {
                        username,
                        token
                    }
                }
            })
            sendMessage('SUCCESS', 'Logged in successfully', dispatch)
        } catch (error) {
            if (error.response) {
                sendMessage('ERROR', error.response.data.error, dispatch)
            } else {
                console.log(error)
            }
        }
    }
};

export const logout = () => {
    return async (dispatch) => {
        localStorage.loggedOut()
        dispatch({
            type: 'LOGOUT'
        })
        sendMessage('SUCCESS', 'Logged out successfully', dispatch)
    }
}

export const logoutExpiredToken = (dispatch, errorMsg) => {
    localStorage.loggedOut()
    dispatch({
        type: 'LOGOUT'
    })
    sendMessage('ERROR', errorMsg, dispatch)
}

export default reducer