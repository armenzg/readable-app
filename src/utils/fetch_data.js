
const HOST = 'http://localhost:3001';
const HEADER = {
  headers: {
    Authorization: 'whatever-you-want',
  },
};

export const getCategories = () =>
  fetch(`${HOST}/categories`, HEADER);

export const getCategoryPosts = category =>
  fetch(`${HOST}/${category}/posts`, HEADER);

export const getPosts = () =>
  fetch(`${HOST}/posts`, HEADER);

// XXX: Review docs
export const submitPost = async (post) => {
  // XXX: add id and timestamp
  const header = {
    ...HEADER,
    method: 'POST',
    body: post,
  };
  const ret = await fetch(`${HOST}/posts`, header);
  const text = await ret.text();
  console.log('Reply from submitting post.');
  console.log(text);
};

export const getPost = id =>
  fetch(`${HOST}/posts/${id}`, HEADER);

export const createVote = (vote, id) =>
  fetch(`${HOST}/posts/${id}`, {
    ...HEADER,
    method: 'POST',
    body: vote,
  });

export const editPost = (post, id) =>
  fetch(`${HOST}/posts/${id}`, {
    ...HEADER,
    method: 'PUT',
    body: post,
  });

export const deletePost = id =>
  fetch(`${HOST}/posts/${id}`, {
    ...HEADER,
    method: 'DELETE',
  });

export const getComments = id =>
  fetch(`${HOST}/posts/${id}/comments`, HEADER);

export const postComment = comment =>
  fetch(`${HOST}/comments`, {
    ...HEADER,
    method: 'POST',
    body: comment,
  });

export const getComment = id =>
  fetch(`${HOST}/comments/${id}`, HEADER);

export const voteComment = (comment, id) =>
  fetch(`${HOST}/comments/${id}`, {
    ...HEADER,
    method: 'POST',
    body: comment,
  });

export const editComment = (comment, id) =>
  fetch(`${HOST}/comments/${id}`, {
    ...HEADER,
    method: 'PUT',
    body: comment,
  });

export const deleteComment = id =>
  fetch(`${HOST}/comments/${id}`, {
    ...HEADER,
    method: 'DELETE',
  });
