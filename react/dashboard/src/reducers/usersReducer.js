import usersSvc from '../services/users'
import localStore from '../localstorage/localstorage'

import { handleError, toggleDash, moveArray } from './reducers'

const initialState = {
    users: [],
    filter: '',
    displayedUsers: [],
    currentPage: 1,
    maxPage: 1
}

const perPage = 25

const sortUsers = (users) => {
    return users.sort((a, b) => a.name >= b.name ? 1 : -1)
}

const getPage = (users, user) => {
    const indx = users.indexOf(user)
    const page = indx === 0 ? 1 : Math.ceil(indx / perPage)
    console.log(indx, page)
    return page
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
        if (users.find(u => u.name === user.name) === undefined) {
            users = sortUsers(users.concat(user))
            changeUser(users)

            const page = getPage(users, user)

            const displayed = getDisplayedUsers(page, users)
            return { ...store, ...{ users: users, currentPage: page, filter: '', displayedUsers: displayed, maxPage: maxPage(users) } }
        }
    }
    if (action.type === 'REMOVE_USER') {
        let users = store.users.filter(user => user.name !== action.data.userName)
        changeUser(users)
        const displayed = getDisplayedUsers(store.currentPage, users)
        return { ...store, ...{ users: users, filter: '', displayedUsers: displayed, maxPage: maxPage(users) } }
    }
    if (action.type === 'RENAME_USER') {
        const user = action.data.user
        let users = store.users
        if (users.find(u => u.name === user.name) === undefined) {
            users[users.indexOf(users.find(user => user.name === action.data.oldName))] = user
            users = sortUsers(users)
            changeUser(users)
            const page = getPage(users, user)

            const displayed = getDisplayedUsers(page, users)
            return { ...store, ...{ users: users, currentPage: page, filter: '', displayedUsers: displayed, maxPage: maxPage(users) } }
        }
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
        changeUser(users)
        const filtered = filter(store.filter, users)
        const displayed = getDisplayedUsers(store.currentPage, filtered)
        return { ...store, ...{ users: users, displayedUsers: displayed } }
    }
    return store
}

const changeUser = async (users) => {
    localStore.storeUsers(users)
}

export const initializeUsers = (token, users) => {
    return async (dispatch) => {
        try {
            if (!users) {
                users = await usersSvc.getAll(token)
                users = sortUsers(users)
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

            const newPermissions = [...user.permissions]
            newPermissions[newPermissions.indexOf(permission)] = negatedPerm

            const newUser = {
                ...user,
                permissions: newPermissions
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

            const newPermissions = world.permissions
            newPermissions[newPermissions.indexOf(permission)] = negatedPerm

            const newWorld = {
                ...world,
                permissions: newPermissions
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                ...user,
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
                ...user,
                permissions: user.permissions.filter(perm => perm !== permission)
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
                ...world,
                permissions: world.permissions.filter(perm => perm !== permission),
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                ...user,
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
                ...user,
                groups: user.groups.filter(g => g !== group)
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
                    ...user,
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
                ...user,
                permissions: permissions
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
                ...user,
                groups: groups
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
                ...user,
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
                ...world,
                permissions: world.permissions.concat(permission)
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                ...user,
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
                ...user,
                name: userName
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
                ...user,
                permissions: newPermisisons
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
                ...user,
                groups: newGroups
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
                ...user,
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
            const newPermissions = moveArray(world.permissions, oldIndex, newIndex)

            const newWorld = {
                ...world,
                permissions: newPermissions
            }

            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newUser = {
                ...user,
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
                ...user,
                name: newName
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
                ...world,
                name: newName
            }
            const worlds = user.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld
            const newUser = {
                ...user,
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