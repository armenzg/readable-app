// Reducer file
import { combineReducers } from 'redux';

import {
  LOAD_POSTS,
  SUBMIT_POST,
} from '../actions';

function posts(state = {}, action) {
  switch (action.type) {
    case SUBMIT_POST :
      // XXX: Do something useful
      return {
        ...state,
      };
    case LOAD_POSTS : {
      // Return state without modifying it if already have data
      if (!state) {
        return state;
      }
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
}

export default combineReducers({
  posts,
});
