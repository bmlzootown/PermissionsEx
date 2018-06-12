import worldsSvc from '../services/worlds'
import localStore from '../localstorage/localstorage'

import { handleError, toggleDash, moveArray } from './reducers'

const reducer = (store = [], action) => {
    let newState = [...store]
    if (action.type === 'INIT_WORLDS') {
        return action.data.worlds
    }
    if (action.type === 'ADD_WORLD') {
        if (newState.filter(world => world.name === action.data.world.name).length === 0) {
            newState = newState.concat(action.data.world)
            changeWorld(newState)
        }
    }
    if (action.type === 'MOVE_WORLD') {
        newState = moveArray(newState, action.data.oldIndex, action.data.newIndex)
        changeWorld(newState)
    }
    if (action.type === 'REMOVE_WORLD') {
        newState = newState.filter(world => world.name !== action.data.worldName)
        changeWorld(newState)
    }
    if (action.type === 'RENAME_WORLD') {
        const replacing = action.data.world
        if (newState.filter(world => world.name === replacing.name).length === 0) {
            newState[newState.indexOf(newState.find(world => world.name === action.data.oldName))] = replacing
            changeWorld(newState)
        }
    }
    if (action.type === 'NEGATE_WORLD_PERMISSION'
        || action.type === 'MOVE_WORLD_PERMISSION'
        || action.type === 'MOVE_WORLD_INHERITED'
        || action.type === 'REMOVE_WORLD_PERMISSION'
        || action.type === 'REMOVE_WORLD_INHERITED'
        || action.type === 'ADD_WORLD_INHERITED'
        || action.type === 'ADD_WORLD_PERMISSION'
    ) {
        const replacing = action.data.world
        newState[newState.indexOf(newState.find(world => world.name === replacing.name))] = replacing
        changeWorld(newState)
    }
    return newState
}

const changeWorld = async (worlds) => {
    localStore.storeWorlds(worlds)
}

export const initializeWorlds = (token, worlds) => {
    return async (dispatch) => {
        try {
            if (!worlds) {
                worlds = await worldsSvc.getAll(token)
            }
            dispatch({
                type: 'INIT_WORLDS',
                data: {
                    worlds
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const negatePermission = (world, permission) => {
    return async (dispatch) => {
        try {
            const permissions = [...world.permissions]

            const negatedPerm = toggleDash(permission)

            const newPermisisons = [...permissions]
            newPermisisons[permissions.indexOf(permission)] = negatedPerm

            const newWorld = {
                ...world,
                permissions: newPermisisons
            }

            dispatch({
                type: 'NEGATE_WORLD_PERMISSION',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removePermission = (world, permission) => {
    return async (dispatch) => {
        try {
            const permissions = world.permissions.filter(perm => perm !== permission)

            const newWorld = {
                ...world,
                permissions: permissions
            }

            dispatch({
                type: 'REMOVE_WORLD_PERMISSION',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeInheritedWorld = (world, inheritedWorld) => {
    return async (dispatch) => {
        try {
            const inheritance = world.inheritance.filter(inherit => inherit !== inheritedWorld)

            const newWorld = {
                ...world,
                inheritance: inheritance
            }

            dispatch({
                type: 'REMOVE_WORLD_INHERITED',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const removeWorld = (world) => {
    return async (dispatch) => {
        try {
            if (confirm(`Are you sure you want to remove '${world.name}'?`))
                dispatch({
                    type: 'REMOVE_WORLD',
                    data: {
                        worldName: world.name
                    }
                })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addPermission = (world, permission) => {
    return async (dispatch) => {
        if (!permission) {
            return
        }
        try {
            const permissions = world.permissions.concat(permission.replace(' ', ''))

            const newWorld = {
                ...world,
                permissions: permissions
            }

            dispatch({
                type: 'ADD_WORLD_PERMISSION',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addInheritedWorld = (world, inheritedWorld) => {
    return async (dispatch) => {
        if (!inheritedWorld) {
            return
        }
        try {
            const inheritance = world.inheritance.concat(inheritedWorld)

            const newWorld = {
                ...world,
                inheritance: inheritance
            }

            dispatch({
                type: 'ADD_WORLD_INHERITED',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const addWorld = (worldName) => {
    return async (dispatch) => {
        if (!worldName) {
            return
        }
        try {
            const newWorld = {
                name: worldName,
                inheritance: [],
                permissions: []
            }

            dispatch({
                type: 'ADD_WORLD',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const duplicateWorld = (world, worldName) => {
    return async (dispatch) => {
        if (!worldName) {
            return
        }
        try {
            const newWorld = {
                ...world,
                name: worldName
            }

            dispatch({
                type: 'ADD_WORLD',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapPermission = (world, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newPermisisons = moveArray(world.permissions, oldIndex, newIndex)

            const newWorld = {
                ...world,
                permissions: newPermisisons
            }
            dispatch({
                type: 'MOVE_WORLD_PERMISSION',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapInheritedWorld = (world, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const newInheritance = moveArray(world.inheritance, oldIndex, newIndex)

            const newWorld = {
                ...world,
                inheritance: newInheritance
            }
            dispatch({
                type: 'MOVE_WORLD_INHERITED',
                data: {
                    world: newWorld
                }
            })
        } catch (error) {
            handleError(error, dispatch)
            throw error
        }
    }
}

export const swapWorld = (oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: 'MOVE_WORLD',
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

export const renameWorld = (world, newName) => {
    return async (dispatch) => {
        if (!newName) {
            return
        }
        try {
            const oldName = world.name
            const newWorld = {
                ...world,
                name: newName
            }
            dispatch({
                type: 'RENAME_WORLD',
                data: {
                    world: newWorld,
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