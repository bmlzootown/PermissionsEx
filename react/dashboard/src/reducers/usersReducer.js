import usersSvc from '../services/usersService'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_USERS') {
        return [...store, ...action.data.users]
    }
    return store
}

export const initializeUsers = () => {
    return async (dispatch) => {
        const users = await usersSvc.getAll()
        dispatch({
            type: 'INIT_USERS',
            data: {
                users
            }
        })
    }
}

export default reducer