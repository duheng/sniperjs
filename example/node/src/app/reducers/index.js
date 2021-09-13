import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import home from './home'
const rootReducer = combineReducers({
  // 注意一定要加上routing: routerReducer 这是用于redux和react-router的连接
  routing: routerReducer,
  home,


})

export default rootReducer
