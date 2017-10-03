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
    case LOAD_POSTS :
      // Return state without modifying it if already have data
      if (!state) {
        return state;
      }
      // XXX: Normalize posts by id as the key
      // Add the data to the store
      return {
        ...action.data,
      };
    default :
      return state;
  }
}

export default combineReducers({
  posts,
});
