import backupSvc from '../services/backupsService'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_BACKUPS') {
        return [...store, ...action.data.backups]
    }
    return store
}

export const initializeBackups = () => {
    return async (dispatch) => {
        const backups = await backupSvc.getAll()
        dispatch({
            type: 'INIT_BACKUPS',
            data: {
                backups
            }
        })
    }
}

export default reducer