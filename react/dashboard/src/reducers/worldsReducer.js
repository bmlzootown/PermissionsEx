import worldsSvc from '../services/worlds'

import { handleError } from './reducers'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_WORLDS') {
        return [...action.data.worlds]
    }
    return store
}

export const initializeWorlds = (token, worlds) => {
    return async (dispatch) => {
        try {
            if (!worlds) {
                worlds = await worldsSvc.getAll(token)
            }
            dispatch({
                type: 'INIT_WORLDS',
                data: {
                    worlds
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer