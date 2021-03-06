// Actions file
export const DELETE_POST = 'DELETE_POST';
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_COMMENTS = 'LOAD_COMMENTS';
export const LOAD_POSTS = 'LOAD_POSTS';
export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
export const SUBMIT_POST = 'SUBMIT_POST';


export const deletePost = id => (
  {
    type: DELETE_POST,
    id,
  }
);

export const storeCategories = data => (
  {
    type: LOAD_CATEGORIES,
    data,
  }
);
export const storeComments = data => (
  {
    type: LOAD_COMMENTS,
    data,
  }
);

export const storePosts = data => (
  {
    type: LOAD_POSTS,
    data,
  }
);

export const submitComment = data => (
  {
    type: SUBMIT_COMMENT,
    data,
  }
);

export const submitPost = data => (
  {
    type: SUBMIT_POST,
    data,
  }
);
