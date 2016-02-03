import createRootReducer from './createRootReducer'
import configureStore from './configureStore'

const rootReducer = createRootReducer()
const createStore = configureStore()

const initalState = {
  auth: {
    hasError: false,
    isLoggedIn: Boolean(window.localStorage.getItem('isLoggedIn')) || false
  }
}

const store = createStore(rootReducer, initalState)

export default store;
