import usersSvc from '../services/users'

import { handleError } from './reducers'

const initialState = {
    users: [],
    filter: '',
    displayedUsers: [],
    currentPage: 1,
    maxPage: 1
}

const perPage = 25

const filter = (filter, users) => {
    return users
        .filter(user => filter.length === 0 || user.name.includes(filter))
}

const getDisplayedUsers = (page, users) => {
    return users
        .slice((page - 1) * perPage, page * perPage)
}

const maxPage = (users) => {
    const max = Math.ceil(users.length / 25)
    return max > 0 ? max : 1
}

const reducer = (store = initialState, action) => {
    if (action.type === 'INIT_USERS') {
        const filtered = filter(store.filter, action.data.users)
        return { ...store, ...action.data, ...{ displayedUsers: getDisplayedUsers(1, filtered), maxPage: maxPage(filtered) } }
    }
    if (action.type === 'CHANGE_PAGE') {
        const filtered = filter(store.filter, store.users)
        return { ...store, ...{ currentPage: action.data.page, displayedUsers: getDisplayedUsers(action.data.page, filtered) } }
    }
    if (action.type === 'CHANGE_FILTER') {
        const filtered = filter(action.data.filter, store.users)
        const displayed = getDisplayedUsers(1, filtered)
        return { ...store, ...{ currentPage: 1, filter: action.data.filter, displayedUsers: displayed, maxPage: maxPage(filtered) } }
    }
    return store
}

export const initializeUsers = (token, users) => {
    return async (dispatch) => {
        try {
            if (!users) {
                users = await usersSvc.getAll(token)
            }
            dispatch({
                type: 'INIT_USERS',
                data: {
                    users
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const changePage = (page) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'CHANGE_PAGE',
                data: {
                    page
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const changeFilter = (filter) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'CHANGE_FILTER',
                data: {
                    filter
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer