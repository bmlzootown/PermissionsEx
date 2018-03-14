import pluginsSvc from '../services/plugins'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_BACKUPS') {
        return [...store, ...action.data.plugins]
    }
    return store
}

export const initializePlugins = () => {
    return async (dispatch) => {
        try {
            const plugins = await pluginsSvc.getAll()
            dispatch({
                type: 'INIT_BACKUPS',
                data: {
                    plugins
                }
            })
        } catch (error) {
            if (error.response) {
                console.log(error.response)
            } else {
                console.log(error)
            }
        }
    }
}

export default reducer