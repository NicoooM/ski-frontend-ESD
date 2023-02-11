import axios from "axios";

const createBooking = async (data) => {
  const response = await axios.post(
    `${process.env.REACT_APP_API}/bookings`,
    data
  );
  return response.data;
};

export { createBooking };
