import pluginsSvc from '../services/plugins'

import { handleError } from './reducers'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_PLUGINS') {
        return [...action.data.plugins]
    }
    return store
}

export const initializePlugins = (token) => {
    return async (dispatch) => {
        try {
            const plugins = await pluginsSvc.getAll(token)
            dispatch({
                type: 'INIT_PLUGINS',
                data: {
                    plugins
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer