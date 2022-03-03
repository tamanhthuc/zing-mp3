import { createStore, applyMiddleware, compose } from "redux"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/index"
import thunk from 'redux-thunk'

const makeStore = () => createStore(rootReducer, applyMiddleware(thunk))

export  const wrapper = createWrapper(makeStore)


