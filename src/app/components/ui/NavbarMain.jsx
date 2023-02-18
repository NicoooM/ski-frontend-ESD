import { Box, Button, Typography } from "@mui/material";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMe } from "../../../setup/services/auth.service";
import { updateUser } from "../../redux/userSlice";

const NavbarMain = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  useEffect(() => {
    if (localStorage.getItem("token") && !user.email) {
      getMe().then((user) => {
        dispatch(updateUser(user));
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(updateUser({}));
  };

  return (
    <Box
      component={"nav"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        gap: 2,
      }}
    >
      {!user.shop && (
        <Typography variant="p" to="/creation-boutique" component={Link}>
          Créer une boutique
        </Typography>
      )}
      <Typography variant="p" to="/" component={Link}>
        Home
      </Typography>
      {user.email ? (
        <Button variant="outlined" onClick={handleLogout}>
          Se déconnecter
        </Button>
      ) : (
        <>
          <Typography variant="p" to="/auth/signin" component={Link}>
            Signin
          </Typography>
          <Typography variant="p" to="/auth/register" component={Link}>
            Register
          </Typography>
        </>
      )}
      {user && user.shop && (
        <Typography variant="p" to={`/boutique/${user.shop}`} component={Link}>
          Ma boutique
        </Typography>
      )}
    </Box>
  );
};

export default NavbarMain;
