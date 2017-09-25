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

const PostModal = ({ postModalOpen, onClose, onSubmit }) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={postModalOpen}
    onRequestClose={onClose}
    contentLabel="Modal"
  >
    <div>
      <h3>Enter your post</h3>
      <input
        className="title"
        type="text"
        placeholder="Title of post"
      />
      <input
        className="body"
        type="text"
      />
      <button
        className="icon-btn"
        onClick={onSubmit}
      >Submit post</button>
      <button
        className="icon-btn"
        onClick={onClose}
      >Close</button>
    </div>
  </Modal>
);

PostModal.propTypes = {
  postModalOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export { Post, PostModal };
