
import 'babel-polyfill'
import ReactDom from "react-dom"
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom"

import {Provider} from "react-redux"

import { createBrowserHistory } from "history" // URL模式的history

import configureStore from "app/store/configureStore"


const store = configureStore(createBrowserHistory)

import asyncComponent from "utils/asyncComponent"
// import Home from "./home"
// import About from "./about"

const Home = asyncComponent(() => import(/* webpackChunkName: "home" */ "./home"))
const About = asyncComponent(() => import(/* webpackChunkName: "about" */ "./about"))

const routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route component={Home} />
        </Switch>
    </BrowserRouter>
)

const renderDom = () => {
  
    return <Provider store={store}>{routes()}</Provider>
  
}

ReactDom.render(
    renderDom(),
    document.getElementById("app")
)
;if (module.hot) {module.hot.accept()};