import React from 'react';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import PropTypes from 'prop-types';

import { postType } from './post';

const Post = ({ post, onEdit, onDelete }) => {
  const { id, title, voteScore, timestamp } = post;
  const newDate = new Date(timestamp);
  return (
    <tr>
      <td>
        <button onClick={onEdit} value={post}>Edit</button>
        <button onClick={onDelete} value={id}>Delete</button>
      </td>
      <td>{title}</td>
      <td className="score">{voteScore}</td>
      <td>{`${newDate.toLocaleString()}`}</td>
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

const ListPosts = ({ posts, toggleModal, onPostEdit, erasePost }) => (
  <div className="ListPosts">
    <button
      onClick={toggleModal}
      className="icon-btn"
    >
      <FaPlusSquare size={30} />
    </button>
    <table className="list-posts">
      <tbody>
        <tr>
          <th>&nbsp;</th>
          <th>Title</th>
          <th>Score</th>
          <th>Creation time</th>
        </tr>
        {(posts
          .filter(p => (p.deleted === false) && (p.id))
          .map(p => (
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
  toggleModal: PropTypes.func.isRequired,
  onPostEdit: PropTypes.func.isRequired,
  erasePost: PropTypes.func.isRequired,
};

export default ListPosts;
