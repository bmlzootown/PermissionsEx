import { logoutExpiredToken } from './loginReducer'

export const handleError = (error, dispatch) => {
    console.log('catch:', error)
    if (error.response) {
        if (error.response.status === 401) {
            logoutExpiredToken(dispatch, error.response.data.error)
        } else {
            console.log(error.response)
        }
    } else {
        console.log(error)
    }
}

export const toggleDash = (permission) => {
    if (permission.startsWith('-')) {
        return permission.substring(1)
    } else {
        return '-' + permission
    }
}