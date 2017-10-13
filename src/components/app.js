import { connect } from 'react-redux';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import PostModal, { Post, postType } from './post';
import * as q from '../utils/fetch_data';
import * as a from '../actions';

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

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostModal: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.onPostEdit = this.onPostEdit.bind(this);
  }

  async componentDidMount() {
    const fetchComments = async (posts) => {
      const comments = {};
      posts.forEach(async (p) => {
        if (p.id) {
          comments[p.id] = await (await q.getComments(p.id)).json();
        }
      });
      return comments;
    };
    const { loadCategories, loadComments, loadPosts } = this.props;

    const fetchedPosts = await (await q.getPosts()).json();
    loadPosts(fetchedPosts);

    const fetchedCategories = await (await q.getCategories()).json();
    loadCategories(fetchedCategories);

    const comments = await fetchComments(fetchedPosts);
    loadComments(comments);
  }

  onPostEdit(p) {
    this.toggleModal(p);
  }

  toggleModal(p) {
    const { showPostModal } = this.state;
    if (showPostModal) {
      this.setState(() => ({
        showPostModal: false,
        post: {},
      }));
    } else {
      this.setState(() => ({
        showPostModal: true,
        post: p,
      }));
    }
  }

  render() {
    const { post, showPostModal } = this.state;
    const { posts, addPost, erasePost } = this.props;

    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <div className="Posts">
              <ListPosts
                posts={posts}
                toggleModal={this.toggleModal}
                onPostEdit={this.onPostEdit}
                erasePost={erasePost}
              />
              <PostModal
                addPost={addPost}
                toggleModal={this.toggleModal}
                showPostModal={showPostModal}
                post={post}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

AppContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  addPost: PropTypes.func.isRequired,
  erasePost: PropTypes.func.isRequired,
};

function mapStateToProps({ posts, categories, comments }) {
  return {
    categories: Object.values(categories),
    comments: Object.values(comments),
    posts: Object.values(posts),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(a.submitPost(data)),
    erasePost: id => dispatch(a.deletePost(id)),
    loadCategories: data => dispatch(a.storeCategories(data)),
    loadComments: data => dispatch(a.storeComments(data)),
    loadPosts: data => dispatch(a.storePosts(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppContainer);
