import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { register } from "../../../setup/services/auth.service";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await register(user);
      navigate("/auth/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Typography variant="h1">Register</Typography>
      <Box component={"form"} onSubmit={onSubmitForm}>
        <FormGroup>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={user.email}
            onChange={onChangeUser}
          />
        </FormGroup>
        <FormGroup>
          <TextField
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={user.password}
            onChange={onChangeUser}
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          S'inscrire
        </Button>
      </Box>
    </Box>
  );
};

export default RegisterPage;
