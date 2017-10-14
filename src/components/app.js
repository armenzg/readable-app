import PropTypes from 'prop-types';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route,
} from 'react-router-dom';

import PostModal from './post';
import ListPosts from './list_posts';
import ListCategories from './list_categories';
import * as q from '../utils/fetch_data';
import * as a from '../actions';

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPostModal: false,
      invertSorting: true,
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
    const { post, showPostModal, invertSorting } = this.state;
    const { posts, categories, addPost, erasePost } = this.props;

    return (
      <Router>
        <div className="App">
          <Route
            exact
            path="/"
            render={() => (
              <div className="Posts">
                <button
                  onClick={this.toggleModal}
                  className="icon-btn"
                >
                  <FaPlusSquare size={30} />
                </button>
                <ListCategories categories={categories} />
                <ListPosts
                  posts={posts}
                  toggleModal={this.toggleModal}
                  onPostEdit={this.onPostEdit}
                  erasePost={erasePost}
                  sortCol="timestamp"
                  invertSorting={invertSorting}
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
          <Route
            path="/category/:id"
            render={({ match }) => (
              <div>
                {'< '}<Link to="/">{'Back to main view'}</Link>
                <h2>{match.params.id} category</h2>
                <ListPosts
                  posts={posts}
                  toggleModal={this.toggleModal}
                  onPostEdit={this.onPostEdit}
                  erasePost={erasePost}
                  category={match.params.id}
                />
              </div>
            )}
          />
        </div>
      </Router>
    );
  }
}

AppContainer.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
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
