import { initializeBackups } from './backupsReducer'
import { initializeGroups } from './groupsReducer'
import { initializePlugins } from './pluginsReducer'
import { initializeUsers } from './usersReducer'
import { initializeWorlds } from './worldsReducer'
import { initializeLogin } from './loginReducer'

export const initialize = async () => {
    await initializeLogin()
    await initializeFromBackend()
}

const initializeFromBackend = async () => {
    console.log('Initializing from backend')
    await initializeWorlds()
    await initializeGroups()
    await initializeUsers()

    await initializePlugins()
    await initializeBackups()
    console.log('Initialization complete')
}