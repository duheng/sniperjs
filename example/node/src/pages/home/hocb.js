import React, { Component } from 'react';
const hocb = title => WrappedComponent => {
  return class HOCB extends Component {
    componentDidMount() {
      // super.componentDidMount();
      console.log('hoc---2', title);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export default hocb;
