import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import * as a from '../actions';

const Comment = ({ author, body }) => (
  <div>
    {`${author} wrote: "${body}"`}
  </div>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
};

const CommentsContainer = ({ comments, submitComment }) => (
  <div>
    {comments.map(c => (
      <Comment
        key={c.id}
        author={c.author}
        body={c.body}
      />),
    )}
    <form onSubmit={() => submitComment()}>
      <input type="submit" value="Submit" />
    </form>
  </div>
);

CommentsContainer.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  submitComment: PropTypes.func.isRequired,
};

function mapStateToProps({ comments }) {
  return {
    comments: Object.values(comments),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    submitComment: () => dispatch(a.submitComment()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CommentsContainer);
