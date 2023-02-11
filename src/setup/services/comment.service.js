import axios from "axios";

const createComment = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/comments`,
    data
  );
  return response.data;
};

export { createComment };
