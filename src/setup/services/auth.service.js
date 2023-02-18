import axios from "axios";
import config from "../config/axios.config";

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

const forgotPassword = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/forgot-password`,
    data
  );
  return response.data;
};

const resetPassword = async (id, data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/auth/reset-password/${id}`,
    data
  );
  return response.data;
};

const getMe = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API}/auth/me`,
    config()
  );
  return response.data;
};

export { login, register, forgotPassword, resetPassword, getMe };
