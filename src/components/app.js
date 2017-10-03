import React, { Component } from 'react';
import { connect } from 'react-redux';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';

import { Post, PostModal } from './post';
import { getPosts } from '../utils/fetch_data';
import { submitPost, storePosts } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postModalOpen: false,
    };
  }

  async componentDidMount() {
    const res = await getPosts();
    const fetchedPosts = await res.json();
    const { loadPosts } = this.props;
    loadPosts(fetchedPosts);
  }

  openPostModal() {
    this.setState(() => ({
      postModalOpen: true,
    }));
  }

  closePostModal() {
    this.setState(() => ({
      postModalOpen: false,
    }));
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
    const { postModalOpen } = this.state;
    /* eslint react/prop-types: 0 */
    const { addPost, posts } = this.props;

    return (
      <div className="App">
        <button
          onClick={() => this.openPostModal()}
          className="icon-btn"
        >
          <FaPlusSquare size={30} />
        </button>
        {(posts.map(post => (
          <Post
            key={post.title}
            post={post}
          />
        )))}
        <PostModal
          postModalOpen={postModalOpen}
          handleInputChange={event => this.handleInputChange(event)}
          onClose={() => this.closePostModal()}
          onSubmit={(event) => {
            event.preventDefault();
            addPost({
              title: event.target.title.value,
              body: event.target.body.value,
            });
            this.closePostModal();
          }}
        />
      </div>
    );
  }
}

function mapStateToProps({ posts }) {
  return {
    posts: Object.values(posts),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addPost: data => dispatch(submitPost(data)),
    loadPosts: data => dispatch(storePosts(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
