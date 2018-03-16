import backupSvc from '../services/backups'

import { handleError } from './reducers'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_BACKUPS') {
        return [...store, ...action.data.backups]
    }
    return store
}

export const initializeBackups = (token) => {
    return async (dispatch) => {
        try {
            const backups = await backupSvc.getAll(token)
            dispatch({
                type: 'INIT_BACKUPS',
                data: {
                    backups
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer