import { handleError } from './reducers'

// Keeps track of what components should be open

const initialState = {
    openUsers: [],
    openGroups: [],
    openWorlds: [],
    openPlugins: []
}

export const isOpen = (items, item) => {
    return items.includes(item)
}

const toggle = (items, item) => {
    if (isOpen(items, item)) {
        return [...items].filter(i => i !== item)
    } else {
        return [...items].concat(item)
    }
}

const reducer = (store = initialState, action) => {
    if (action.type === 'TOGGLE_USER') {
        const username = action.data.username
        return { ...store, ...{ openUsers: toggle(store.openUsers, username) } }
    }
    if (action.type === 'TOGGLE_GROUP') {
        const groupName = action.data.groupName
        return { ...store, ...{ openGroups: toggle(store.openGroups, groupName) } }
    }
    if (action.type === 'TOGGLE_WORLD') {
        const worldName = action.data.worldName
        return { ...store, ...{ openWorlds: toggle(store.openWorlds, worldName) } }
    }
    if (action.type === 'TOGGLE_PLUGIN') {
        const pluginName = action.data.pluginName
        return { ...store, ...{ openPlugins: toggle(store.openPlugins, pluginName) } }
    }
    return store
}

export const toggleUser = (username) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'TOGGLE_USER',
                data: {
                    username
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const toggleGroup = (groupName) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'TOGGLE_GROUP',
                data: {
                    groupName
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const toggleWorld = (worldName) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'TOGGLE_WORLD',
                data: {
                    worldName
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const togglePlugin = (pluginName) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'TOGGLE_PLUGIN',
                data: {
                    pluginName
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer