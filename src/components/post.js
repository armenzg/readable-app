import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';

const Post = ({ post, onEdit, onDelete }) => {
  const { id, title } = post;
  return (
    <div>
      <span>{title} </span>
      <button
        onClick={onEdit}
        value={post}
      >Edit</button>
      <button
        onClick={onDelete}
        value={id}
      >Delete</button>
    </div>
  );
};

const postType = {
  author: PropTypes.string,
  body: PropTypes.string,
  category: PropTypes.string,
  deleted: PropTypes.bool,
  id: PropTypes.string,
  timestamp: PropTypes.number,
  title: PropTypes.string,
  voteScore: PropTypes.number,
};

Post.propTypes = {
  post: PropTypes.shape({
    ...postType,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

/* eslint react/prop-types: 0 */
const PostModal = ({ postModalOpen, post, handleInputChange, onClose, onSubmit }) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={postModalOpen}
    onRequestClose={onClose}
    contentLabel="Modal"
  >
    <div>
      <h3>Enter/edit your post</h3>
      <form onSubmit={onSubmit}>
        Title:
        <input
          className="title"
          name="title"
          type="text"
          value={post.title}
          onChange={event => handleInputChange(event)}
        />
        Author:
        <input
          className="author"
          name="author"
          type="text"
          value={post.author}
          onChange={event => handleInputChange(event)}
        />
        Body:
        <textarea
          className="body"
          name="body"
          type="text"
          value={post.body}
          onChange={event => handleInputChange(event)}
        />
        Category:
        <input
          className="category"
          name="category"
          type="text"
          value={post.category}
          onChange={event => handleInputChange(event)}
        />
        <input type="submit" value="Submit" />
        <button
          className="icon-btn"
          onClick={onClose}
        >Close</button>
      </form>
    </div>
  </Modal>
);

PostModal.propTypes = {
  postModalOpen: PropTypes.bool.isRequired,
  post: PropTypes.shape({
    ...postType,
  }),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

PostModal.defaultProps = {
  post: {},
};

export { Post, PostModal };
