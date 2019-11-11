import Bottom from './Button';
class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return (
      <div>
        <Bottom />
        <button onClick={() => this.setState({ liked: true })}>Like</button>
      </div>

    );
  }
}

ReactDOM.render(<LikeButton />, document.getElementById('like_button_container'));