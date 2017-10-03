import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';

const Post = ({ post }) => (
  <div>{post.title}</div>
);

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    deleted: PropTypes.boolean,
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    voteScore: PropTypes.number,
  }).isRequired,
};

/* eslint react/prop-types: 0 */
const PostModal = ({ postModalOpen, handleInputChange, onClose, onSubmit }) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={postModalOpen}
    onRequestClose={onClose}
    contentLabel="Modal"
  >
    <div>
      <h3>Enter your post</h3>
      <form onSubmit={onSubmit}>
        <input
          className="title"
          name="title"
          type="text"
          placeholder="Title of post"
          onChange={event => handleInputChange(event)}
        />
        <textarea
          className="body"
          name="body"
          type="text"
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
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export { Post, PostModal };
