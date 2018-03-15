import loginSvc from '../services/login'
import localStorage from '../localstorage/localstorage'

import { sendMessage } from './notificationReducer'

const initialState = {
    login: undefined
};

const reducer = (store = initialState, action) => {
    if (action.type == 'LOGIN') {
        return [...store, { login: action.data.login }]
    }
    if (action.type == 'LOGOUT') {
        return [...store, { login: undefined }]
    }
    return store
};

export const initializeLogin = () => {
    return async (dispatch) => {
        const login = await localStorage.getLogin();
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

            sendMessage('SUCCESS', 'Logged in successfully', dispatch)

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
        sendMessage('SUCCESS', 'Logged out successfully', dispatch)
        localStorage.loggedOut()
        dispatch({
            type: 'LOGOUT'
        })
    }
}

export default reducer