import axios from "axios";

const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
};

const login = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/login`,
    data
  );
  return response.data;
};

const register = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/register`,
    data
  );
  return response.data;
};

const userMe = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/auth/me`,
    config
  );
  return response.data;
};

export { login, register, userMe };
