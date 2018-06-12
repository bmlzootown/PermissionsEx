import groupsSvc from '../services/groups'
import localStore from '../localstorage/localstorage'

import { handleError, toggleDash, moveArray } from './reducers'

const reducer = (store = [], action) => {
    let newState = [...store]
    if (action.type === 'INIT_GROUPS') {
        return action.data.groups
    }
    if (action.type === 'ADD_GROUP') {
        if (newState.filter(group => group.name === action.data.group.name).length === 0) {
            newState = newState.concat(action.data.group)
            changeGroup(newState)
        }
    }
    if (action.type === 'MOVE_GROUP') {
        newState = moveArray(newState, action.data.oldIndex, action.data.newIndex)
        changeGroup(newState)
    }
    if (action.type === 'REMOVE_GROUP') {
        newState = newState.filter(group => group.name !== action.data.groupName)
        changeGroup(newState)
    }
    if (action.type === 'RENAME_GROUP') {
        const replacing = action.data.group
        if (newState.filter(group => group.name === replacing.name).length === 0) {
            newState[newState.indexOf(newState.find(group => group.name === action.data.oldName))] = replacing
            changeGroup(newState)
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
        || action.type === 'CHANGE_LADDER'
        || action.type === 'CHANGE_LADDER_RANK'
        || action.type === 'CHANGE_PREFIX'
    ) {
        const replacing = action.data.group
        newState[newState.indexOf(newState.find(group => group.name === replacing.name))] = replacing
        changeGroup(newState)
    }
    return newState
}

const changeGroup = async (groups) => {
    localStore.storeGroups(groups)
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
                ...group,
                permissions: newPermisisons
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
                ...world,
                permissions: newPermisisons
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                ...group,
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
                ...group,
                permissions: group.permissions.filter(perm => perm !== permission)
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
                ...world,
                permissions: world.permissions.filter(perm => perm !== permission),
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                ...group,
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
                ...group,
                inheritance: group.inheritance.filter(inherit => inherit !== inheritedGroup)
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
                    ...group,
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
                ...group,
                permissions: permissions
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
                ...group,
                inheritance: inheritance
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
                ...group,
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
                ...world,
                permissions: world.permissions.concat(permission)
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                ...group,
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
                worlds: [],
                ladder: 'default',
                ladderRank: 0,
                prefix: ''
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
                ...group,
                name: groupName
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
                ...group,
                permissions: newPermisisons
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
                ...group,
                inheritance: newInheritance
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
                ...group,
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
                ...world,
                permissions: newPermisisons
            }

            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld

            const newGroup = {
                ...group,
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
                ...group,
                name: newName
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
                ...world,
                name: newName
            }
            const worlds = group.worlds
            worlds[worlds.indexOf(worlds.find(w => w.name === world.name))] = newWorld
            const newGroup = {
                ...group,
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

export const changeLadder = (group, newLadder) => {
    return async (dispatch) => {
        if (!newLadder) {
            return
        }
        try {
            const newGroup = {
                ...group,
                ladder: newLadder.trim()
            }
            dispatch({
                type: 'CHANGE_LADDER',
                data: {
                    group: newGroup
                }
            })
        }catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const changeLadderRank = (group, newLadderRank) => {
    return async (dispatch) => {
        const rankNum = parseInt(newLadderRank)
        if (!rankNum || isNaN(rankNum)) {
            return
        }
        try {
            const newGroup = {
                ...group,
                ladderRank: rankNum
            }
            dispatch({
                type: 'CHANGE_LADDER_RANK',
                data: {
                    group: newGroup
                }
            })
        }catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const changePrefix = (group, newPrefix) => {
    return async (dispatch) => {
        if (!newPrefix) {
            return
        }
        try {
            const newGroup = {
                ...group,
                prefix: newPrefix
            }
            dispatch({
                type: 'CHANGE_PREFIX',
                data: {
                    group: newGroup
                }
            })
        }catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export default reducer