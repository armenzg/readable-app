import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CategoryLink = ({ name }) => (
  <span>&nbsp;
    <Link to={`/category/${name}`}>{name}</Link>
  </span>
);

CategoryLink.propTypes = {
  name: PropTypes.string.isRequired,
};

const ListCategories = ({ categories }) => (
  <div className="list-categories">
    <b>Categories:</b>
    {(categories
      .map(c => (
        <CategoryLink
          key={c}
          name={c}
        />
      )))}
  </div>
);

ListCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ListCategories;
