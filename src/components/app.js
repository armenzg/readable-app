import React, { Component } from 'react';

import { Post, PostModal } from './post';
import { getPosts } from '../utils/fetch_data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postModalOpen: true,
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
