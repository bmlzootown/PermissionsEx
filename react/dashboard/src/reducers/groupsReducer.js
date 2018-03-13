import groupsSvc from '../services/groupsService'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_GROUPS') {
        return [...store, ...action.data.groups]
    }
    return store
}

export const initializeGroups = () => {
    return async (dispatch) => {
        const groups = await groupsSvc.getAll()
        dispatch({
            type: 'INIT_GROUPS',
            data: {
                groups
            }
        })
    }
}

export default reducer