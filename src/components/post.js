import React from 'react';
import PropTypes from 'prop-types';

const Post = ({ post }) => (
  <div>{post.title}</div>
);

Post.propTypes = {
  post: PropTypes.shape({
    author: PropTypes.string,
    body: PropTypes.string,
    category: PropTypes.string,
    deleted: PropTypes.boolean,
    id: PropTypes.string,
    timestamp: PropTypes.number,
    title: PropTypes.string,
    voteScore: PropTypes.number,
  }).isRequired,
};

export default Post;
