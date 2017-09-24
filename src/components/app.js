import React, { Component } from 'react';

import Post from './post';
import { getPosts } from '../utils/fetch_data';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() {
    const { posts } = this.state;

    return (
      <div className="App">
        {(posts.map(post => <Post post={post} />))}
      </div>
    );
  }
}

export default App;
