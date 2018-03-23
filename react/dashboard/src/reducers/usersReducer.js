import usersSvc from '../services/users'

import { handleError } from './reducers'

const reducer = (store = [], action) => {
    if (action.type === 'INIT_USERS') {
        return [...action.data.users]
    }
    return store
}

export const initializeUsers = (token, users) => {
    return async (dispatch) => {
        try {
            if (!users) {
                users = await usersSvc.getAll(token)
            }
            dispatch({
                type: 'INIT_USERS',
                data: {
                    users
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer