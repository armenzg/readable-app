// Reducer file
import { combineReducers } from 'redux';

import * as a from '../actions';
import guid from '../utils/uuid';
import * as q from '../utils/fetch_data';

const posts = (state = {}, action) => {
  switch (action.type) {
    case a.SUBMIT_POST : {
      const newPost = {
        ...action.data,
        id: guid(),
        timestamp: Date.now(),
      };
      q.submitPost(newPost);
      console.log(newPost);
      return {
        ...state,
        [newPost.id]: newPost,
      };
    }
    case a.DELETE_POST : {
      const newState = Object.assign({}, state);
      delete newState[action.id];
      q.deletePost(action.id);
      return newState;
    }
    case a.LOAD_POSTS : {
      // Normalize posts by id as the key
      const newState = {};
      Object.values(action.data).map(post => (
        newState[post.id] = post
      ));
      // Add the data to the store
      return newState;
    }
    default :
      return state;
  }
};

const categories = (state = {}, action) => {
  switch (action.type) {
    case a.LOAD_CATEGORIES : {
      const newState = {};
      Object.values(action.data.categories).map(category => (
        (newState[category.name] = category.path)
      ));
      // Add the data to the store
      return newState;
    }
    default :
      return state;
  }
};

const comments = (state = {}, action) => {
  switch (action.type) {
    case a.LOAD_COMMENTS : {
      const newState = {};
      Object.values(action.data).map(comment => (
        (newState[comment] = comment)
      ));
      // Add the data to the store
      return newState;
    }
    case a.SUBMIT_COMMENT : {
      const newComment = {
        id: guid(),
        timestamp: Date.now(),
        author: 'Me',
        body: 'body',
        parentId: '8xf0y6ziyjabvozdd253nd',
      };
      const res = q.postComment(newComment);
      console.log(res);
      console.log(newComment);
      return {
        ...state,
        [newComment.id]: newComment,
      };
    }
    default :
      return state;
  }
};

export default combineReducers({
  categories,
  comments,
  posts,
});
