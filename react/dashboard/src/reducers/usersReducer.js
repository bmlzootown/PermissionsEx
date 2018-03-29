import usersSvc from '../services/users'

import { handleError, toggleDash, moveArray } from './reducers'

const initialState = {
    users: [],
    filter: '',
    displayedUsers: [],
    currentPage: 1,
    maxPage: 1
}

const perPage = 25

const getPage = (users, user) => {
    const indx = users.indexOf(user)
    return Math.ceil(indx / perPage)
}

const filter = (filter, users) => {
    return users
        .filter(user => filter.length === 0 || user.name.includes(filter))
}

const getDisplayedUsers = (page, users) => {
    return users
        .slice((page - 1) * perPage, page * perPage)
}

const maxPage = (users) => {
    const max = Math.ceil(users.length / perPage)
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
    if (action.type === 'ADD_USER') {
        const user = action.data.user
        let users = store.users
        if (users.filter(u => u.name === user.name).length === 0) {
            users = users.concat(user).sort((a, b) => a.name > b.name)
        }

        const page = getPage(users, user)

        const displayed = getDisplayedUsers(page, users)
        return { ...store, ...{ users: users, currentPage: page, filter: '', displayedUsers: displayed, maxPage: maxPage(users) } }
    }
    if (action.type === 'REMOVE_USER') {
        let users = store.users.filter(user => user.name !== action.data.userName)
        const displayed = getDisplayedUsers(store.currentPage, users)
        return { ...store, ...{ users: users, filter: '', displayedUsers: displayed, maxPage: maxPage(users) } }
    }
    if (action.type === 'RENAME_USER') {
        const user = action.data.user
        let users = store.users
        if (users.filter(u => u.name === user.name).length === 0) {
            users[users.indexOf(users.find(user => user.name === action.data.oldName))] = user
            users = users.sort((a, b) => a.name > b.name)
        }

        const page = getPage(users, user)

        const displayed = getDisplayedUsers(page, users)
        return { ...store, ...{ users: users, currentPage: page, filter: '', displayedUsers: displayed, maxPage: maxPage(users) } }

    }
    if (action.type === 'NEGATE_USER_PERMISSION'
        || action.type === 'MOVE_USER_PERMISSION'
        || action.type === 'REMOVE_USER_PERMISSION'
        || action.type === 'ADD_USER_PERMISSION'
        || action.type === 'ADD_USER_GROUP'
        || action.type === 'MOVE_USER_GROUP'
        || action.type === 'REMOVE_USER_GROUP'
        || action.type === 'ADD_USER_WORLD'
        || action.type === 'REMOVE_USER_WORLD'
        || action.type === 'MOVE_USER_WORLD'
        || action.type === 'RENAME_USER_WORLD'
        || action.type === 'ADD_USER_WORLD_PERMISSION'
        || action.type === 'MOVE_USER_WORLD_PERMISSION'
        || action.type === 'REMOVE_USER_WORLD_PERMISSION'
        || action.type === 'NEGATE_USER_WORLD_PERMISSION'
    ) {
        const user = action.data.user
        let users = store.users
        users[users.indexOf(users.find(u => u.name === user.name))] = user

        const displayed = getDisplayedUsers(store.currentPage, users)
        return { ...store, ...{ users: users, displayedUsers: displayed } }
    }
    return store
}

export const initializeUsers = (token, users) => {
    return async (dispatch) => {
        try {
            if (!users) {
                users = await usersSvc.getAll(token)
                users = users.sort((a, b) => a.name >= b.name ? 1 : -1)
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

export const negatePermission = (user, permission) => {
    return async (dispatch) => {
        try {

            const negatedPerm = toggleDash(permission)

            const newPermisisons = [...user.permissions]
            newPermisisons[newPermisisons.indexOf(permission)] = negatedPerm

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: newPermisisons,
                worlds: user.worlds
            }

            dispatch({
                type: 'NEGATE_USER_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const negateWorldPermission = (user, world, permission) => {
    return async (dispatch) => {
        try {

            const negatedPerm = toggleDash(permission)

            const newPermisisons = world.permissions
            newPermisisons[newPermisisons.indexOf(permission)] = negatedPerm

            const newWorld = {
                name: world.name,
                permissions: newPermisisons
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'NEGATE_USER_WORLD_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removePermission = (user, permission) => {
    return async (dispatch) => {
        try {
            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions.filter(perm => perm !== permission),
                worlds: user.worlds
            }

            dispatch({
                type: 'REMOVE_USER_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeWorldPermission = (user, world, permission) => {
    return async (dispatch) => {
        try {
            const newWorld = {
                name: world.name,
                permissions: world.permissions.filter(perm => perm !== permission),
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'REMOVE_USER_WORLD_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeGroup = (user, group) => {
    return async (dispatch) => {
        try {
            const newUser = {
                name: user.name,
                groups: user.groups.filter(g => g !== group),
                permissions: user.permissions,
                worlds: user.worlds
            }

            dispatch({
                type: 'REMOVE_USER_GROUP',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeUser = (user) => {
    return async (dispatch) => {
        try {
            if (confirm(`Are you sure you want to remove '${user.name}'?`)) {
                dispatch({
                    type: 'REMOVE_USER',
                    data: {
                        userName: user.name
                    }
                })
            }
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeWorld = (user, world) => {
    return async (dispatch) => {
        try {
            if (confirm(`Are you sure you want to remove '${world.name}' from '${user.name}'?`)) {
                const newUser = {
                    name: user.name,
                    groups: user.groups,
                    permissions: user.permissions,
                    worlds: user.worlds.filter(w => w.name !== world.name)
                }

                dispatch({
                    type: 'REMOVE_USER_WORLD',
                    data: {
                        user: newUser
                    }
                })
            }
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addPermission = (user, permission) => {
    return async (dispatch) => {
        if (!permission) {
            return
        }
        try {
            const permissions = user.permissions.concat(permission.replace(' ', ''))

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: permissions,
                worlds: user.worlds
            }

            dispatch({
                type: 'ADD_USER_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addGroup = (user, groupName) => {
    return async (dispatch) => {
        if (!groupName) {
            return
        }
        try {
            const groups = user.groups.concat(groupName)

            const newUser = {
                name: user.name,
                groups: groups,
                permissions: user.permissions,
                worlds: user.worlds
            }

            dispatch({
                type: 'ADD_USER_GROUP',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addWorld = (user, worldName) => {
    return async (dispatch) => {
        if (!worldName) {
            return
        }
        try {
            const newWorld = {
                name: worldName,
                permissions: []
            }

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions,
                worlds: user.worlds.concat(newWorld)
            }

            dispatch({
                type: 'ADD_USER_WORLD',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addWorldPermission = (user, world, permission) => {
    return async (dispatch) => {
        if (!permission) {
            return
        }
        try {
            const newWorld = {
                name: world.name,
                permissions: world.permissions.concat(permission)
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'ADD_USER_WORLD_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addUser = (userName) => {
    return async (dispatch) => {
        if (!userName) {
            return
        }
        try {
            const newUser = {
                name: userName,
                groups: [],
                permissions: [],
                worlds: []
            }

            dispatch({
                type: 'ADD_USER',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const duplicateUser = (user, userName) => {
    return async (dispatch) => {
        if (!userName) {
            return
        }
        try {
            const newUser = {
                name: userName,
                groups: user.groups,
                permissions: user.permissions,
                worlds: user.worlds
            }

            dispatch({
                type: 'ADD_USER',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapPermission = (user, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newPermisisons = moveArray(user.permissions, oldIndex, newIndex)

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: newPermisisons,
                worlds: user.worlds
            }
            dispatch({
                type: 'MOVE_USER_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapGroup = (user, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newGroups = moveArray(user.groups, oldIndex, newIndex)

            const newUser = {
                name: user.name,
                groups: newGroups,
                permissions: user.permissions,
                worlds: user.worlds
            }
            dispatch({
                type: 'MOVE_USER_GROUP',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapWorld = (user, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newWorlds = moveArray(user.worlds, oldIndex, newIndex)

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions,
                worlds: newWorlds
            }
            dispatch({
                type: 'MOVE_USER_WORLD',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapWorldPermission = (user, world, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newPermisisons = moveArray(world.permissions, oldIndex, newIndex)

            const newWorld = {
                name: world.name,
                permissions: newPermisisons
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'MOVE_USER_WORLD_PERMISSION',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapUser = (oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'MOVE_USER',
                data: {
                    oldIndex,
                    newIndex
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const renameUser = (user, newName) => {
    return async (dispatch) => {
        if (!newName) {
            return
        }
        try {
            const oldName = user.name
            const newUser = {
                name: newName,
                groups: user.groups,
                permissions: user.permissions,
                worlds: user.worlds
            }
            dispatch({
                type: 'RENAME_USER',
                data: {
                    user: newUser,
                    oldName
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const renameWorld = (user, world, newName) => {
    return async (dispatch) => {
        if (!newName) {
            return
        }
        try {
            const newWorld = {
                name: newName,
                permissions: world.permissions
            }
            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld
            const newUser = {
                name: user.name,
                groups: user.groups,
                permissions: user.permissions,
                worlds: worlds
            }
            dispatch({
                type: 'RENAME_USER_WORLD',
                data: {
                    user: newUser
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer