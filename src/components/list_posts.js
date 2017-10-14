import React from 'react';
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

const ListPosts = ({ posts, onPostEdit, erasePost, category, sortCol, invertSorting }) => {
  const sortBy = (val, a, b) => {
    if (a && b) {
      if (a[val] > b[val]) {
        return a;
      }
      return b;
    }
    return a;
  };

  const newPosts = posts.filter(p => (
    (p.deleted === false) && (p.id) &&
    ((category) ? p.category === category : true)
  ));
  if (sortCol) {
    newPosts.sort(sortBy(sortCol));
  }
  if (invertSorting) {
    newPosts.reverse();
  }

  if (newPosts.length === 0) {
    return (
      <div className="ListPosts">
        No posts were found for this category.
      </div>
    );
  }

  return (
    <div className="ListPosts">
      <table className="list-posts">
        <tbody>
          <tr>
            <th>Title</th>
            <th>Score</th>
            <th>Creation time</th>
            <th>&nbsp;</th>
          </tr>
          {(newPosts.map(p => (
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
};

ListPosts.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    ...postType,
  })).isRequired,
  onPostEdit: PropTypes.func.isRequired,
  erasePost: PropTypes.func.isRequired,
  category: PropTypes.string,
  sortCol: PropTypes.string,
  invertSorting: PropTypes.bool,
};

ListPosts.defaultProps = {
  category: undefined,
  sortCol: undefined,
  invertSorting: false,
};

export default ListPosts;
