import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const createShop = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/shops`,
    data,
    config
  );
  return response.data;
};

const getShop = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/shops/${id}`,
    config
  );
  return response.data;
};

const updateShop = async (id, data) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_API}/shops/${id}`,
    data,
    config
  );
  return response.data;
};

export { createShop, getShop, updateShop };
