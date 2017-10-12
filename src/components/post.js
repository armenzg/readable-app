import PropTypes from 'prop-types';
import React from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

import CommentsContainer from './comments';
import Voting from './votes';

const Post = ({ post, onEdit, onDelete }) => {
  const { id, title } = post;
  return (
    <div>
      <button onClick={onEdit} value={post}>Edit</button>
      <button onClick={onDelete} value={id}>Delete</button>
      <span> {title}</span>
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
          <table>
            <tbody>
              <tr>
                <td>Title</td>
                <td>
                  <input
                    className="title"
                    name="title"
                    type="text"
                    value={this.state.title}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Author</td>
                <td>
                  <input
                    className="author"
                    name="author"
                    type="text"
                    value={this.state.author}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Category</td>
                <td>
                  <input
                    className="category"
                    name="category"
                    type="text"
                    value={this.state.category}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
              <tr>
                <td>Body</td>
                <td>
                  <textarea
                    className="body"
                    name="body"
                    type="text"
                    value={this.state.body}
                    onChange={this.handleInputChange}
                  />
                </td>
              </tr>
            </tbody>
          </table>
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
    <Voting id={post.id} score={post.voteScore} />
    <CommentsContainer postId={post.id} />
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

export { Post };

function mapStateToProps({ posts }) {
  return {
    posts: Object.values(posts),
  };
}

function mapDispatchToProps() {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostModal);
