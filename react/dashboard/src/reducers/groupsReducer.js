import groupsSvc from '../services/groups'

import { handleError, toggleDash, moveArray } from './reducers'

const findGroup = (name, groups) => {
    return groups.find(group => group.name === name)
}

const solveInheritance = (groups) => {
    groups.forEach(group => {
        const inherited = group.inheritance ? group.inheritance : []
        const inheritedGroups = inherited.map(inheritedGroup => findGroup(inheritedGroup, groups)).filter(group => Boolean(group))
        group.inheritedGroups = inheritedGroups
    })
    return groups
}

const reducer = (store = [], action) => {
    let newState = [...store];
    if (action.type == 'INIT_GROUPS') {
        newState = [...action.data.groups]
    }
    if (action.type === 'ADD_GROUP') {
        if (newState.filter(group => group.name === action.data.group.name).length === 0) {
            newState = newState.concat(action.data.group)
        }
    }
    if (action.type === 'MOVE_GROUP') {
        newState = moveArray(newState, action.data.oldIndex, action.data.newIndex)
    }
    if (action.type === 'REMOVE_GROUP') {
        newState = newState.filter(group => group.name !== action.data.groupName)
    }
    if (action.type === 'RENAME_GROUP') {
        const replacing = action.data.group
        if (newState.filter(group => group.name === replacing.name).length === 0) {
            newState[newState.indexOf(newState.find(group => group.name === action.data.oldName))] = replacing
        }
    }
    if (action.type === 'NEGATE_GROUP_PERMISSION'
        || action.type === 'MOVE_GROUP_PERMISSION'
        || action.type === 'MOVE_GROUP_INHERITED'
        || action.type === 'REMOVE_GROUP_PERMISSION'
        || action.type === 'REMOVE_GROUP_INHERITED'
        || action.type === 'ADD_GROUP_INHERITED'
        || action.type === 'ADD_GROUP_PERMISSION'
    ) {
        const replacing = action.data.group
        newState[newState.indexOf(newState.find(group => group.name === replacing.name))] = replacing
        newState = newState
    }
    return solveInheritance(newState)
}

export const initializeGroups = (token, groups) => {
    return async (dispatch) => {
        try {
            if (!groups) {
                groups = await groupsSvc.getAll(token)
            }
            dispatch({
                type: 'INIT_GROUPS',
                data: {
                    groups
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const negatePermission = (group, permission) => {
    return async (dispatch) => {
        try {
            const permissions = [...group.permissions]

            const negatedPerm = toggleDash(permission)

            const newPermisisons = [...permissions]
            newPermisisons[permissions.indexOf(permission)] = negatedPerm

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: newPermisisons,
                worlds: group.worlds
            }

            dispatch({
                type: 'NEGATE_GROUP_PERMISSION',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removePermission = (group, permission) => {
    return async (dispatch) => {
        try {
            const permissions = [...group.permissions].filter(perm => perm !== permission)

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: permissions,
                worlds: group.worlds
            }

            dispatch({
                type: 'REMOVE_GROUP_PERMISSION',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeInheritedGroup = (group, inheritedGroup) => {
    return async (dispatch) => {
        try {
            const inheritance = [...group.inheritance].filter(inherit => inherit !== inheritedGroup)

            const newGroup = {
                name: group.name,
                inheritance: inheritance,
                permissions: group.permissions,
                worlds: group.worlds
            }

            dispatch({
                type: 'REMOVE_GROUP_INHERITED',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeGroup = (group) => {
    return async (dispatch) => {
        try {
            if (confirm(`Are you sure you want to remove '${group.name}'?`))
                dispatch({
                    type: 'REMOVE_GROUP',
                    data: {
                        groupName: group.name
                    }
                })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addPermission = (group, permission) => {
    return async (dispatch) => {
        if (!permission) {
            return
        }
        try {
            const permissions = [...group.permissions].concat(permission.replace(' ', ''))

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: permissions,
                worlds: group.worlds
            }

            dispatch({
                type: 'ADD_GROUP_PERMISSION',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addInheritedGroup = (group, inheritedGroup) => {
    return async (dispatch) => {
        if (!inheritedGroup) {
            return
        }
        try {
            const inheritance = [...group.inheritance].concat(inheritedGroup)

            const newGroup = {
                name: group.name,
                inheritance: inheritance,
                permissions: group.permissions,
                worlds: group.worlds
            }

            dispatch({
                type: 'ADD_GROUP_INHERITED',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addGroup = (groupName) => {
    return async (dispatch) => {
        if (!groupName) {
            return
        }
        try {
            const newGroup = {
                name: groupName,
                inheritance: [],
                permissions: [],
                worlds: []
            }

            dispatch({
                type: 'ADD_GROUP',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const duplicateGroup = (group, groupName) => {
    return async (dispatch) => {
        if (!groupName) {
            return
        }
        try {
            const newGroup = {
                name: groupName,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: group.worlds
            }

            dispatch({
                type: 'ADD_GROUP',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapPermission = (group, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const permissions = [...group.permissions]

            const newPermisisons = moveArray(permissions, oldIndex, newIndex)

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: newPermisisons,
                worlds: group.worlds
            }
            dispatch({
                type: 'MOVE_GROUP_PERMISSION',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapInheritedGroup = (group, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const inheritance = [...group.inheritance]

            const newInheritance = moveArray(inheritance, oldIndex, newIndex)

            const newGroup = {
                name: group.name,
                inheritance: newInheritance,
                permissions: group.permissions,
                worlds: group.worlds
            }
            dispatch({
                type: 'MOVE_GROUP_INHERITED',
                data: {
                    group: newGroup
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapGroup = (oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'MOVE_GROUP',
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

export const renameGroup = (group, newName) => {
    return async (dispatch) => {
        if (!newName) {
            return
        }
        try {
            const oldName = group.name
            const newGroup = {
                name: newName,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: group.worlds
            }
            dispatch({
                type: 'RENAME_GROUP',
                data: {
                    group: newGroup,
                    oldName
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer