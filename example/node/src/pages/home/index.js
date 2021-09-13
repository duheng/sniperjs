
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import TopNav from './components/TopNav';
import Panel from './components/Panel';
import Special from './components/Special';

import connect from 'app/store/connect';
import style from './style';
import HomeSelector from 'app/selectors/home';
import * as HomeActions from 'app/actions/home';
import hocb from './hocb'; //高阶函数的两种封装方式



@connect(HomeSelector, HomeActions)
export default class Home extends Component {
  constructor(...args) {
    super(...args);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   //会在初始化和update时触发，用于替换componentWillReceiveProps，
  //   //可以用来控制 props 更新 state 的过程；它返回一个对象表示新的 state；
  //   //如果不需要更新，返回 null 即可
  //   return null
  // }
  // shouldComponentUpdate(nextProps, nextState) {
  //   return false
  // }
  // getSnapshotBeforeUpdate() {
  //   // 组件即将销毁
  //  // 可以在此处移除订阅，定时器等等
  // }
  componentDidMount() {
    const { actions } = this.props;
    actions.fetchHomeData();
   
    //console.log('a--',asadf)
  }
  goAbout = () => {
    this.props.history.push('/about')
  }
  render() {
    const { homeData } = this.props.home
    const { indexTop, indexMain, special } = homeData
    return (
      <div className="Home" onClick={_=>this.goAbout()}>
        {
          indexTop && <TopNav data={indexTop}/>
        }
        {
          indexMain && <Panel data={indexMain} />
        }
        {
          special && <Special data={special} />
        }
      </div>
    );
  }
}
