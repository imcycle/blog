import React from './react';

class A extends React.Component {
  render() {
    return (
      <div>Hello world!</div>
    )
  }
};

React.render(<A />, document.getElementById('root'));