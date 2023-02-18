import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getMe, login } from "../../../setup/services/auth.service";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/userSlice";

const SigninPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.value);
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
      const res = await login(user);
      localStorage.setItem("token", res.token);
      console.log(localStorage.getItem("token"));
      const me = await getMe();
      dispatch(updateUser(me));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  return (
    <Box>
      <Typography variant="h1">Signin</Typography>
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
          Connexion
        </Button>
        <Typography variant="p" to="/auth/mot-de-passe-oublie" component={Link}>
          Mot de passe oublié ?
        </Typography>
      </Box>
    </Box>
  );
};

export default SigninPage;
