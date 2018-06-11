import backupSvc from '../services/backups'
import localStore from '../localstorage/localstorage'

import { handleError } from './reducers'

import { sendMessage } from './notificationReducer'

const sorter = (a, b) => {
    return a.created > b.created ? 1 : -1
}

const reducer = (store = [], action) => {
    if (action.type === 'INIT_BACKUPS') {
        return [...action.data.backups].sort(sorter)
    }
    if (action.type === 'CREATE_BACKUP' || action.type === 'CLONE_BACKUP') {
        return store.concat(action.data.backup).sort(sorter)
    }
    if (action.type === 'REMOVE_BACKUP') {
        return store.filter(backup => backup.name !== action.data.name).sort(sorter)
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

export const createBackup = (token) => {
    return async (dispatch) => {
        const name = prompt('Name of the new Backup?\n(Unsaved changes will not be in the backup)')
        if (!name) {
            return
        }
        sendMessage("SUCCESS", "Creating backup..", dispatch)
        try {
            const backup = await backupSvc.create(token, name)
            dispatch({
                type: 'CREATE_BACKUP',
                data: {
                    backup
                }
            })
            sendMessage("SUCCESS", "Backup created!", dispatch)
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const cloneBackup = (token, name) => {
    return async (dispatch) => {
        try {
            const backup = await backupSvc.clone(token, name)
            dispatch({
                type: 'CLONE_BACKUP',
                data: {
                    backup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const restoreBackup = (token, name) => {
    return async (dispatch) => {
        if (!confirm("Are you sure you want to restore '" + name + "'?\nAll unsaved changes will be discarded.")) {
            return
        }
        sendMessage("SUCCESS", "Restoring backup.. Page will refresh after complete.", dispatch)
        try {
            await backupSvc.restore(token, name)
            await localStore.discardChanges()
            window.location.reload()
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeBackup = (token, name) => {
    return async (dispatch) => {
        if (!confirm("Are you sure you want to remove '" + name + "'?")) {
            return
        }
        sendMessage("SUCCESS", "Removing backup..", dispatch)
        try {
            await backupSvc.remove(token, name)
            dispatch({
                type: 'REMOVE_BACKUP',
                data: {
                    name
                }
            })
            sendMessage("SUCCESS", "Backup removed!", dispatch)
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer