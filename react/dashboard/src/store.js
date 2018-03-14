import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import groupsReducer from './reducers/groupsReducer'
import worldsReducer from './reducers/worldsReducer'
import pluginsReducer from './reducers/pluginsReducer'
import backupsReducer from './reducers/backupsReducer'

import loginReducer from './reducers/loginReducer'

const reducer = combineReducers({
    users: usersReducer,
    groups: groupsReducer,
    worlds: worldsReducer,
    plugins: pluginsReducer,
    backups: backupsReducer,
    login: loginReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store