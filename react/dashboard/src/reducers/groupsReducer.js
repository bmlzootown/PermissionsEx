import groupsSvc from '../services/groups'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_GROUPS') {
        return [...store, ...action.data.groups]
    }
    return store
}

export const initializeGroups = (groups) => {
    return async (dispatch) => {
        if (!groups) {
            groups = await groupsSvc.getAll()
        }
        dispatch({
            type: 'INIT_GROUPS',
            data: {
                groups
            }
        })
    }
}

export default reducer