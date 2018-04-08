export const store = (key, obj) => {
    window.localStorage.setItem(key, JSON.stringify(obj))
}

export const fetch = (key) => {
    return JSON.parse(window.localStorage.getItem(key))
}

export const remove = (key) => {
    window.localStorage.removeItem(key)
}

export const getLogin = () => {
    return fetch('user')
}

export const loggedIn = (user) => {
    store('user', user)
}

export const loggedOut = () => {
    remove('user')
}

const storeUsers = (users) => {
    store('users', users)
}

const getUsers = () => {
    return fetch('users')
}

const storeGroups = (groups) => {
    store('groups', groups)
}

const getGroups = () => {
    return fetch('groups')
}

const storeWorlds = (worlds) => {
    store('worlds', worlds)
}

const getWorlds = () => {
    return fetch('worlds')
}

const containsChanges = () => {
    return getGroups() !== null || getWorlds() !== null || getUsers() !== null
}

const discardChanges = () => {
    remove('users')
    remove('groups')
    remove('worlds')
}

export default {
    getLogin, loggedIn, loggedOut,
    storeUsers, storeGroups, storeWorlds,
    getUsers, getGroups, getWorlds,
    containsChanges, discardChanges
}