import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jwtDecode from "jwt-decode";

const NavbarMain = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUser(decodedToken);
    }
  }, []);

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
      <Typography variant="p" to="/creation-boutique" component={Link}>
        Créer une boutique
      </Typography>
      <Typography variant="p" to="/" component={Link}>
        Home
      </Typography>
      <Typography variant="p" to="/auth/signin" component={Link}>
        Signin
      </Typography>
      <Typography variant="p" to="/auth/register" component={Link}>
        Register
      </Typography>
      {user && user.shop && (
        <Typography variant="p" to={`/boutique/${user.shop}`} component={Link}>
          Ma boutique
        </Typography>
      )}
    </Box>
  );
};

export default NavbarMain;
