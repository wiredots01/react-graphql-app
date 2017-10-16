import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

class LyricList extends Component {
  onLike(id, likes) {
    this.props.mutate({
      variables: { id },
      optimisticResponse: {
        __type: 'Mutation',
        likeLyric: {
          id,
          __typename: 'LyricType',
          likes: likes + 1
        }
      }
    })
  }

  renderLyrics() {
    return this.props.lyrics.map(({id, content, likes}) => {
      return (
        <li key={id} className="collection-item">
          {content}
          <i
            className="material-icons right"
            onClick={() => this.onLike(id, likes)}
          >
            thumb_up
          </i>
          <span className="badge">{likes}</span>
        </li>
      )
    })
  }
  render() {
    return (
      <ul className="collection">
        {this.renderLyrics()}
      </ul>
    )
  }
}

const mutation = gql`
  mutation AddLikes($id: ID) {
    likeLyric(id: $id){
      id
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
