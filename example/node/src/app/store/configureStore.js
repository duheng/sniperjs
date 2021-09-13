import {createStore, applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {routerReducer, routerMiddleware} from "react-router-redux"
import reducer from "../reducers"

let middlewares = [thunk]
let ENV = process.env.NODE_ENV

if (ENV !== "release" && ENV !== "gray") {
    let { createLogger } = require("redux-logger")
    const logger = createLogger({
        level: "info",
        logger: console,
        collapsed: true
    })

    middlewares = [...middlewares, logger]
}

export default function configureStore(history, initialState) {
    middlewares = [...middlewares, routerMiddleware(history)]
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(
        createStore
    )
    return createStoreWithMiddleware(reducer, initialState)
}
