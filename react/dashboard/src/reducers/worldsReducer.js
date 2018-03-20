import worldsSvc from '../services/worlds'

import { handleError, toggleDash, moveArray } from './reducers'

const findWorld = (name, worlds) => {
    return worlds.find(world => world.name === name)
}

const solveInheritance = (worlds) => {
    worlds.forEach(world => {
        const inherited = world.inheritance ? world.inheritance : []
        const inheritedWorlds = inherited.map(inheritedWorld => findWorld(inheritedWorld, worlds)).filter(world => Boolean(world))
        world.inheritedWorlds = inheritedWorlds
    })
    return worlds
}

const reducer = (store = [], action) => {
    let newState = [...store];
    if (action.type === 'INIT_WORLDS') {
        newState = [...action.data.worlds]
    }
    if (action.type === 'ADD_WORLD') {
        newState = newState.concat(action.data.world)
    }
    if (action.type === 'REMOVE_WORLD') {
        newState = newState.filter(world => world.name !== action.data.worldName)
    }
    if (action.type === 'NEGATE_WORLD_PERMISSION'
        || action.type === 'MOVE_WORLD_PERMISSION'
        || action.type === 'MOVE_WORLD_INHERITANCE'
        || action.type === 'REMOVE_WORLD_PERMISSION'
        || action.type === 'REMOVE_WORLD_INHERITED'
        || action.type === 'ADD_WORLD_INHERITED'
        || action.type === 'ADD_WORLD_PERMISSION'
    ) {
        const replacing = action.data.world
        newState = newState.filter(world => world.name !== replacing.name).concat(replacing)
    }
    return solveInheritance(newState.sort((a, b) => a.name > b.name ? 1 : -1))
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
                name: world.name,
                inheritance: world.inheritance,
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
            const permissions = [...world.permissions].filter(perm => perm !== permission)

            const newWorld = {
                name: world.name,
                inheritance: world.inheritance,
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
            const inheritance = [...world.inheritance].filter(inherit => inherit !== inheritedWorld)

            const newWorld = {
                name: world.name,
                inheritance: inheritance,
                permissions: world.permissions
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
            const permissions = [...world.permissions].concat(permission.replace(' ', ''))

            const newWorld = {
                name: world.name,
                inheritance: world.inheritance,
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
            const inheritance = [...world.inheritance].concat(inheritedWorld)

            const newWorld = {
                name: world.name,
                inheritance: inheritance,
                permissions: world.permissions
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

export const swapPermission = (world, oldIndex, newIndex) => {
    return async (dispatch) => {
        try {
            const permissions = [...world.permissions]

            const newPermisisons = moveArray(permissions, oldIndex, newIndex)

            const newWorld = {
                name: world.name,
                inheritance: world.inheritance,
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
            const inheritance = [...world.inheritance]

            const newInheritance = moveArray(inheritance, oldIndex, newIndex)

            const newWorld = {
                name: world.name,
                inheritance: newInheritance,
                permissions: world.permissions
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

export default reducer