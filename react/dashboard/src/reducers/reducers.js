import { logoutExpiredToken } from './loginReducer'

export const handleError = (error, dispatch) => {
    console.log('catch:', error)
    if (error.response.status === 401) {
        logoutExpiredToken(dispatch, error.response.data.error)
    } else {
        console.log(error.response)
    }
}