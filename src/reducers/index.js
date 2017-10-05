// Reducer file
import { combineReducers } from 'redux';
import { submitPost } from '../utils/fetch_data';
import guid from '../utils/uuid';

import {
  LOAD_POSTS,
  SUBMIT_POST,
} from '../actions';

const posts = (state = {}, action) => {
  switch (action.type) {
    case SUBMIT_POST : {
      // const { author, title, body, category } = action.data;
      const newPost = {
        ...action.data,
        id: guid(),
        timestamp: Date.now(),
      };
      submitPost(newPost);
      console.log(newPost);
      return {
        ...state,
        [newPost.id]: newPost,
      };
    }
    case LOAD_POSTS : {
      // Normalize posts by id as the key
      const newState = {};
      Object.values(action.data).map(post => (
        (newState[post.id] = post)
      ));
      // Add the data to the store
      return newState;
    }
    default :
      return state;
  }
};

export default combineReducers({
  posts,
});
