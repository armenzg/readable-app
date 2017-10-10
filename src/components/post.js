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
  onEdit: PropTypes.func.isRequired,
};

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    // eslint-disable-next-line
    if (this.props.postToEdit.id) {
      this.state = {
        ...this.props.postToEdit,
      };
    } else {
      this.state = {
        author: '',
        body: '',
        category: '',
        title: '',
      };
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(event) {
    event.preventDefault();
    if (!this.state.id) {
      this.props.addPost({
        title: event.target.title.value,
        body: event.target.body.value,
        author: event.target.author.value,
        category: event.target.category.value,
      });
    } else {
      console.log('XXX: Let us edit!');
    }
    this.props.onSubmit(event);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <h3>Enter/edit your post</h3>
        <form onSubmit={this.onSubmit}>
          Title:
          <input
            className="title"
            name="title"
            type="text"
            value={this.state.title}
            onChange={this.handleInputChange}
          />
          Author:
          <input
            className="author"
            name="author"
            type="text"
            value={this.state.author}
            onChange={this.handleInputChange}
          />
          Body:
          <textarea
            className="body"
            name="body"
            type="text"
            value={this.state.body}
            onChange={this.handleInputChange}
          />
          Category:
          <input
            className="category"
            name="category"
            type="text"
            value={this.state.category}
            onChange={this.handleInputChange}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  postToEdit: PropTypes.shape({
    ...postType,
  }),
  onSubmit: PropTypes.func.isRequired,
};

PostForm.defaultProps = {
  postToEdit: {},
};

const PostModal = ({ addPost, closeModal, post, postModalOpen }) => (
  <Modal
    className="modal"
    overlayClassName="overlay"
    isOpen={postModalOpen}
    onRequestClose={closeModal}
    contentLabel="Modal"
  >
    <button
      className="icon-btn"
      onClick={closeModal}
    >Close</button>
    <PostForm
      addPost={addPost}
      onSubmit={closeModal}
      postToEdit={post}
    />
  </Modal>
);

PostModal.propTypes = {
  addPost: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  post: PropTypes.shape({
    ...postType,
  }),
  postModalOpen: PropTypes.bool.isRequired,
};

PostModal.defaultProps = {
  post: {},
};

export { Post, PostModal };
