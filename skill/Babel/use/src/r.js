class A {
  constructor() {
    this.state = {
      a: 1,
      b: 2,
    }
  }

  componentWillMount() {
    console.log('componentWillMount')
  }

  componentDidMount() {
    this.setState({
      a: 2,
    })
  }

  handleClick = () => {
    console.log('handleClick')
  }

  render() {
    return (
      <div style={{ width: '100px' }}>
        <h1>{this.state.a}</h1>
        <p onClick={this.handleClick}>123</p>
        <p>234</p>
      </div>
    )
  }
}

export default A;