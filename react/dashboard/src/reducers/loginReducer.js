import loginSvc from '../services/login'
import localStorage from '../localstorage/localstorage'

const reducer = (store = [], action) => {
    if (action.type == 'PREVIOUS_LOGIN') {
        return [...store, ...action.data.user]
    }
    return store
}

export const initializeLogin = () => {
    return async (dispatch) => {
        const login = localStorage.getLogin()
        if (login) {
            dispatch({
                type: 'PREVIOUS_LOGIN',
                data: {
                    login
                }
            })
        }
    }
}

export default reducer