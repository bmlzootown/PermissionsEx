import usersSvc from '../services/users'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_USERS') {
        return [...store, ...action.data.users]
    }
    return store
}

export const initializeUsers = (users) => {
    return async (dispatch) => {
        if (!users) {
            users = await usersSvc.getAll()
        }
        dispatch({
            type: 'INIT_USERS',
            data: {
                users
            }
        })
    }
}

export default reducer