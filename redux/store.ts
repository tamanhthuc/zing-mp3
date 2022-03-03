import { createStore, applyMiddleware, compose } from "redux"
import { createWrapper } from "next-redux-wrapper"
import rootReducer from "./reducers/index"


const makeStore = () => createStore(rootReducer)

export  const wrapper = createWrapper(makeStore)


