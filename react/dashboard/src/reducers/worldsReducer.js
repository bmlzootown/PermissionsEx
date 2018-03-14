import worldsSvc from '../services/worlds'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_WORLDS') {
        return [...store, ...action.data.worlds]
    }
    return store
}

export const initializeWorlds = (worlds) => {
    return async (dispatch) => {
        if (!worlds) {
            const worlds = await worldsSvc.getAll()
        }
        dispatch({
            type: 'INIT_WORLDS',
            data: {
                worlds
            }
        })
    }
}

export default reducer