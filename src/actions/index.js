// Actions file
export const SUBMIT_POST = 'SUBMIT_POST';
export const LOAD_POSTS = 'LOAD_POSTS';

export const submitPost = ({ title, body }) => (
  {
    type: SUBMIT_POST,
    title,
    body,
  }
);

export const storePosts = data => (
  {
    type: LOAD_POSTS,
    data,
  }
);
