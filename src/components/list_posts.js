import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { postType } from './post';

const Post = ({ post, onEdit, onDelete }) => {
  const { id, title, voteScore, timestamp } = post;
  const newDate = new Date(timestamp);
  return (
    <tr>
      <td>{title}</td>
      <td className="score">{voteScore}</td>
      <td>{`${newDate.toLocaleString()}`}</td>
      <td>
        <button onClick={onEdit} value={post}>Edit</button>
        <button onClick={onDelete} value={id}>Delete</button>
      </td>
    </tr>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    ...postType,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

const ListPosts = ({ posts, onPostEdit, erasePost, onSort }) => (
  <div className="ListPosts">
    <table className="list-posts">
      <tbody>
        <tr>
          <th onClick={() => onSort('title')}>Title</th>
          <th onClick={() => onSort('voteScore')}>Score</th>
          <th onClick={() => onSort('timestamp')}>Creation time</th>
          <th>&nbsp;</th>
        </tr>
        {(posts.map(p => (
          <Post
            key={p.id}
            post={p}
            onEdit={() => onPostEdit(p)}
            onDelete={event => erasePost(event.target.value)}
          />
        )))}
      </tbody>
    </table>
  </div>
);

ListPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    ...postType,
  })).isRequired,
  onPostEdit: PropTypes.func.isRequired,
  erasePost: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
};

class ListPostsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortCol: 'voteScore',
      reversed: false,
    };
    this.sortColumn = this.sortColumn.bind(this);
  }

  sortColumn(requestedSorting) {
    const { sortCol, reversed } = this.state;
    if (requestedSorting === sortCol) {
      this.setState({ reversed: !reversed });
    } else {
      this.setState({ sortCol: requestedSorting });
    }
  }

  render() {
    const { category, posts, onPostEdit, erasePost } = this.props;
    const { reversed } = this.state;

    const sortBy = (a, b) => {
      const { sortCol } = this.state;
      if (a[sortCol] > b[sortCol]) {
        return 1;
      } else if (a[sortCol] === b[sortCol]) {
        return 0;
      }
      return -1;
    };

    const newPosts = posts.filter(p => (
      (p.deleted === false) && (p.id) &&
      ((category) ? p.category === category : true)
    ));

    if (newPosts.length === 0) {
      return (
        <div className="ListPosts">
          No posts were found for this category.
        </div>
      );
    }

    newPosts.sort(sortBy);
    if (reversed) {
      newPosts.reverse();
    }

    return (
      <ListPosts
        posts={newPosts}
        onPostEdit={onPostEdit}
        erasePost={erasePost}
        onSort={this.sortColumn}
      />
    );
  }
}

ListPostsContainer.propTypes = {
  category: PropTypes.string,
  posts: PropTypes.arrayOf(PropTypes.shape({
    ...postType,
  })).isRequired,
  onPostEdit: PropTypes.func.isRequired,
  erasePost: PropTypes.func.isRequired,
};

ListPostsContainer.defaultProps = {
  category: undefined,
};

export default ListPostsContainer;
