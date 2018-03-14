import loginSvc from '../services/login'
import localStorage from '../localstorage/localstorage'

const initialState = {
    login: undefined
}

const reducer = (store = initialState, action) => {
    if (action.type == 'LOGIN') {
        return [...store, { login: action.data.login}]
    }
    return store
}

export const initializeLogin = () => {
    return async (dispatch) => {
        const login = await localStorage.getLogin()
        if (login) {
            dispatch({
                type: 'LOGIN',
                data: {
                    login
                }
            })
        }
    }
}

export const login = (username, password) => {
    return async (dispatch) => {
        try {
            console.log('logging in..')
            const token = await loginSvc.login({
                username: username,
                password: password
            })

            localStorage.loggedIn({ username, token })

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
            console.log(error)
            // TODO Error notification "unknown user ect"
        }
    }
}

export default reducer