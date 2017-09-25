import { SUBMIT_POST } from '../actions';

function posts(state = {}, action) {
  switch (action.type) {
    case SUBMIT_POST :
      // const { recipe } = action

      // XXX: Do something useful
      return {
        ...state,
      };
    default :
      return state;
  }
}

export default posts;
