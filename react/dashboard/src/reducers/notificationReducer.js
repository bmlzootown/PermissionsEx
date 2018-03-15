
const initialState = {
    error: '',
    success: ''
}

const reducer = (store = initialState, action) => {
    if (action.type == 'ERROR') {
        return { ...store, ...{ error: action.data.message } }
    }
    if (action.type == 'SUCCESS') {
        return { ...store, ...{ success: action.data.message } }
    }
    if (action.type == 'CLEAR') {
        return initialState
    }
    return store
}

export const sendMessage = (type, message, dispatch) => {
    dispatch({
        type,
        data: {
            message
        }
    })
    setTimeout(() => {
        dispatch({
            type: 'CLEAR'
        })
    }, 5000);
}

export const error = (message) => {
    return async (dispatch) => {
        return sendMessage('ERROR', message, dispatch)
    }
}

export const success = (message) => {
    return async (dispatch) => {
        return sendMessage('SUCCESS', message, dispatch)
    }
}

export const clear = () => {
    return async (dispatch) => {
        dispatch({
            type: 'CLEAR'
        })
    }
}

export default reducer