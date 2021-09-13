const hoc = title => ComponentClass => {
  return class HOC extends ComponentClass {
    componentDidMount() {
      super.componentDidMount();
      console.log('hoc---2');
    }
    render() {
      if (this.state.success) {
        return (
          <div>
            <div>{title}</div>
            {super.render()}
          </div>
        );
      }
      return <div>Loading...</div>;
    }
  };
};

export default hoc;
