import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import usersReducer from './reducers/usersReducer'
import groupsReducer from './reducers/groupsReducer'
import worldsReducer from './reducers/worldsReducer'
import pluginsReducer from './reducers/pluginsReducer'
import backupsReducer from './reducers/backupsReducer'

import loginReducer from './reducers/loginReducer'

import notificationReducer from './reducers/notificationReducer'
import openReducer from './reducers/openReducer'

const reducer = combineReducers({
    users: usersReducer,
    groups: groupsReducer,
    worlds: worldsReducer,
    plugins: pluginsReducer,
    backups: backupsReducer,
    login: loginReducer,
    notification: notificationReducer,
    open: openReducer
})

const loggerMiddleware = store => next => action => {
    console.log("Action:", action.type);
    next(action);
  }

const store = createStore(reducer, applyMiddleware(thunk, loggerMiddleware))

export default store