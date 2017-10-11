import { connect } from 'react-redux';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PostModal, { Post } from './post';
import * as q from '../utils/fetch_data';
import * as a from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postModalOpen: false,
    };
    this.openPostModal = this.openPostModal.bind(this);
    this.closePostModal = this.closePostModal.bind(this);
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

  openPostModal() {
    this.setState(() => ({
      postModalOpen: true,
    }));
  }

  closePostModal() {
    this.setState(() => ({
      postModalOpen: false,
      post: {},
    }));
  }

  render() {
    const { postModalOpen, post } = this.state;
    /* eslint react/prop-types: 0 */
    const { posts, addPost, erasePost } = this.props;

    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={() => (
            <div className="Posts">
              <button
                onClick={() => this.openPostModal()}
                className="icon-btn"
              >
                <FaPlusSquare size={30} />
              </button>
              {(posts.map(p => (
                p.id &&
                <Post
                  key={p.id}
                  post={p}
                  onEdit={() => {
                    this.openPostModal();
                    this.setState({
                      post: p,
                    });
                  }}
                  onDelete={event => erasePost(event.target.value)}
                />
              )))}
              <PostModal
                addPost={addPost}
                closeModal={this.closePostModal}
                postModalOpen={postModalOpen}
                post={post}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

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
)(App);
