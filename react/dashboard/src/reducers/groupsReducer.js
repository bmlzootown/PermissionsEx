import groupsSvc from '../services/groups'

import { handleError } from './reducers'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_GROUPS') {
        return [...action.data.groups]
    }
    return store
}

export const initializeGroups = (token, groups) => {
    return async (dispatch) => {
        try {
            if (!groups) {
                groups = await groupsSvc.getAll(token)
            }
            dispatch({
                type: 'INIT_GROUPS',
                data: {
                    groups
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer