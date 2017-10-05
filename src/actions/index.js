// Actions file
export const SUBMIT_POST = 'SUBMIT_POST';
export const LOAD_POSTS = 'LOAD_POSTS';

export const submitPost = data => (
  {
    type: SUBMIT_POST,
    data,
  }
);

export const storePosts = data => (
  {
    type: LOAD_POSTS,
    data,
  }
);
