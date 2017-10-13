import React from 'react';
import PropTypes from 'prop-types';

const Category = ({ name }) => (
  <span>&nbsp;{name}</span>
);

Category.propTypes = {
  name: PropTypes.string.isRequired,
};

const ListCategories = ({ categories }) => (
  <div className="list-categories">
    <b>Categories:</b>
    {(categories
      .map(c => (
        <Category
          key={c}
          name={c}
        />
      )))}
  </div>
);

ListCategories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ListCategories;
