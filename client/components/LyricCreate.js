import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricCreate extends Component {
  constructor(props) {
    super(props)
    this.state = {
      content: ''
    }
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        songId: this.props.songId,
        content: this.state.content
      }
    });
    this.setState({ content: '' });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>New Lyric</label>
          <input
            onChange={event => this.setState({ content: event.target.value })}
            value={this.state.content}
          />
        </form>
      </div>
    )
  }
}

const mutation = gql`
  mutation AddLyric($songId: ID, $content: String) {
    addLyricToSong(songId: $songId, content: $content) {
      id
      title
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(mutation)(LyricCreate);
