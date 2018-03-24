import groupsSvc from '../services/groups'

import { handleError, toggleDash, moveArray } from './reducers'

const reducer = (store = [], action) => {
    let newState = [...store]
    if (action.type === 'INIT_GROUPS') {
        newState = action.data.groups
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
        || action.type === 'ADD_GROUP_WORLD'
        || action.type === 'REMOVE_GROUP_WORLD'
        || action.type === 'MOVE_GROUP_WORLD'
        || action.type === 'RENAME_GROUP_WORLD'
        || action.type === 'ADD_GROUP_WORLD_PERMISSION'
        || action.type === 'MOVE_GROUP_WORLD_PERMISSION'
        || action.type === 'REMOVE_GROUP_WORLD_PERMISSION'
        || action.type === 'NEGATE_GROUP_WORLD_PERMISSION'
    ) {
        const replacing = action.data.group
        newState[newState.indexOf(newState.find(group => group.name === replacing.name))] = replacing
    }
    return newState
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

            const negatedPerm = toggleDash(permission)

            const newPermisisons = [...group.permissions]
            newPermisisons[newPermisisons.indexOf(permission)] = negatedPerm

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

export const negateWorldPermission = (group, world, permission) => {
    return async (dispatch) => {
        try {

            const negatedPerm = toggleDash(permission)

            const newPermisisons = world.permissions
            newPermisisons[newPermisisons.indexOf(permission)] = negatedPerm

            const newWorld = {
                name: world.name,
                permissions: newPermisisons
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'NEGATE_GROUP_WORLD_PERMISSION',
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
            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions.filter(perm => perm !== permission),
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

export const removeWorldPermission = (group, world, permission) => {
    return async (dispatch) => {
        try {
            const newWorld = {
                name: world.name,
                permissions: world.permissions.filter(perm => perm !== permission),
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'REMOVE_GROUP_WORLD_PERMISSION',
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
            const newGroup = {
                name: group.name,
                inheritance: group.inheritance.filter(inherit => inherit !== inheritedGroup),
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
            if (confirm(`Are you sure you want to remove '${group.name}'?`)) {
                dispatch({
                    type: 'REMOVE_GROUP',
                    data: {
                        groupName: group.name
                    }
                })
            }
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeWorld = (group, world) => {
    return async (dispatch) => {
        try {
            if (confirm(`Are you sure you want to remove '${world.name}' from '${group.name}'?`)) {
                const newGroup = {
                    name: group.name,
                    inheritance: group.inheritance,
                    permissions: group.permissions,
                    worlds: group.worlds.filter(w => w.name !== world.name)
                }

                dispatch({
                    type: 'REMOVE_GROUP_WORLD',
                    data: {
                        group: newGroup
                    }
                })
            }
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
            const permissions = group.permissions.concat(permission.replace(' ', ''))

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
            const inheritance = group.inheritance.concat(inheritedGroup)

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

export const addWorld = (group, worldName) => {
    return async (dispatch) => {
        if (!worldName) {
            return
        }
        try {
            const newWorld = {
                name: worldName,
                permissions: []
            }

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: group.worlds.concat(newWorld)
            }

            dispatch({
                type: 'ADD_GROUP_WORLD',
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

export const addWorldPermission = (group, world, permission) => {
    return async (dispatch) => {
        if (!permission) {
            return
        }
        try {
            const newWorld = {
                name: world.name,
                permissions: world.permissions.concat(permission)
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'ADD_GROUP_WORLD_PERMISSION',
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
            const newPermisisons = moveArray(group.permissions, oldIndex, newIndex)

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
            const newInheritance = moveArray(group.inheritance, oldIndex, newIndex)

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

export const swapWorld = (group, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newWorlds = moveArray(group.worlds, oldIndex, newIndex)

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: newWorlds
            }
            dispatch({
                type: 'MOVE_GROUP_WORLD',
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

export const swapWorldPermission = (group, world, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newPermisisons = moveArray(world.permissions, oldIndex, newIndex)

            const newWorld = {
                name: world.name,
                permissions: newPermisisons
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: worlds
            }

            dispatch({
                type: 'MOVE_GROUP_WORLD_PERMISSION',
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

export const renameWorld = (group, world, newName) => {
    return async (dispatch) => {
        if (!newName) {
            return
        }
        try {
            const newWorld = {
                name: newName,
                permissions: world.permissions
            }
            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld
            const newGroup = {
                name: group.name,
                inheritance: group.inheritance,
                permissions: group.permissions,
                worlds: worlds
            }
            dispatch({
                type: 'RENAME_GROUP_WORLD',
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

export default reducer