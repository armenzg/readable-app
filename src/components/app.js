import React, { Component } from 'react';
import FaPlusSquare from 'react-icons/lib/fa/plus-square';

import { Post, PostModal } from './post';
import { getPosts } from '../utils/fetch_data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postModalOpen: false,
      posts: [],
    };
  }

  async componentDidMount() {
    const res = await getPosts();
    const fetchedPosts = await res.json();
    this.onMount(fetchedPosts);
  }

  onMount(fetchedPosts) {
    this.setState({
      posts: fetchedPosts,
    });
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

  render() {
    const { postModalOpen, posts } = this.state;

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
          onClose={() => this.closePostModal()}
          onSubmit={() => 'XXX'}
        />
      </div>
    );
  }
}

export default App;
