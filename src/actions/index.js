// Actions file
export const SUBMIT_POST = 'SUBMIT_POST';
export const LOAD_POSTS = 'LOAD_POSTS';
export const DELETE_POST = 'DELETE_POST';

export const submitPost = data => (
  {
    type: SUBMIT_POST,
    data,
  }
);

export const deletePost = id => (
  {
    type: DELETE_POST,
    id,
  }
);

export const storePosts = data => (
  {
    type: LOAD_POSTS,
    data,
  }
);
