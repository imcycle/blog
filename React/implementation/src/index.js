import React from './react';

class A extends React.Component {
  render() {
    return (
      <div >
        <div>A: {this.props.num}</div>
        <button onClick={this.props.onAdd}>A: +</button>
      </div>
    )
  }
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    }
  }

  handleButtonClick = () => {
    this.setState({ num: ++this.state.num });
  }

  render() {
    return (
      <div>
        <A num={this.state.num} onAdd={this.handleButtonClick} />
        <div>Root: {this.state.num}</div>
        <button onClick={this.handleButtonClick}>Root: +</button>
      </div>
    )
  }
};

React.render(<Root />, document.getElementById('root'));