import worldsSvc from '../services/worldsService'

const reducer = (store = [], action) => {
    if (action.type == 'INIT_WORLDS') {
        return [...store, ...action.data.worlds]
    }
    return store
}

export const initializeWorlds = () => {
    return async (dispatch) => {
        const worlds = await worldsSvc.getAll()
        dispatch({
            type: 'INIT_WORLDS',
            data: {
                worlds
            }
        })
    }
}

export default reducer