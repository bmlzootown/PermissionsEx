import loginSvc from '../services/login'
import localStorage from '../localstorage/localstorage'

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
            console.log('logging in..');
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
        } catch (error) {
            if (error.response) {
                console.log(error.response)
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
    }
}

export default reducer