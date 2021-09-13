import React, { Component } from "react";

export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }

    async componentDidMount() {
      if(this.hasLoadedComponent()){
          return;
      }
      const { default: component } = await importComponent();
      this.setState({
        component: component
      });
    }

    hasLoadedComponent() {
        return this.state.component !== null;
    }
    componentWillUnmount(){
      this.setState = (state,callback)=>{
        return
      }
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
