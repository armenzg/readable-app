import FaThumbsDown from 'react-icons/lib/fa/thumbs-down';
import FaThumbsUp from 'react-icons/lib/fa/thumbs-up';
import React from 'react';
import PropTypes from 'prop-types';

const Voting = ({ id, score }) => (
  <div>
    <span>{score}</span>
    <FaThumbsUp size={15} />
    <FaThumbsDown size={15} />
  </div>
);

Voting.propTypes = {
  id: PropTypes.string,
  score: PropTypes.number,
};

Voting.defaultProps = {
  id: undefined,
  score: undefined,
};

export default Voting;
