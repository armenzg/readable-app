import { connect } from 'react-redux';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import { Post, PostModal } from './post';
import * as q from '../utils/fetch_data';
import * as a from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postModalOpen: false,
    };
  }

  async componentDidMount() {
    const fetchComments = async (posts) => {
      const comments = {};
      posts.forEach(async (p) => {
        comments[p.id] = await (await q.getComments(p.id)).json();
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

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      post: {
        [name]: value,
      },
    });
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
                postModalOpen={postModalOpen}
                post={post}
                handleInputChange={event => this.handleInputChange(event)}
                onClose={() => this.closePostModal()}
                onSubmit={(event) => {
                  event.preventDefault();
                  if (!post.id) {
                    addPost({
                      title: event.target.title.value,
                      body: event.target.body.value,
                      author: event.target.author.value,
                      category: event.target.category.value,
                    });
                  } else {
                    console.log('XXX: Let us edit!');
                  }
                  this.closePostModal();
                }}
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
