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

export default { getLogin, loggedIn, loggedOut }