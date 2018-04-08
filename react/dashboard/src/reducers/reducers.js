import { logoutExpiredToken } from './loginReducer'

import { arrayMove } from 'react-sortable-hoc';

export const handleError = (error, dispatch) => {
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

export const moveArray = (items, oldIndex, newIndex) => {
    return  arrayMove(items, oldIndex, newIndex)
}