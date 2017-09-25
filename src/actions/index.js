export const SUBMIT_POST = 'SUBMIT_POST';

const submitPost = ({ title }) => (
  {
    type: SUBMIT_POST,
    title,
  }
);

export default submitPost;
