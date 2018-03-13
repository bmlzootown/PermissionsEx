import pluginsSvc from '../services/pluginsService'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_BACKUPS') {
        return [...store, ...action.data.plugins]
    }
    return store
}

export const initializePlugins = () => {
    return async (dispatch) => {
        const plugins = await pluginsSvc.getAll()
        dispatch({
            type: 'INIT_BACKUPS',
            data: {
                plugins
            }
        })
    }
}

export default reducer