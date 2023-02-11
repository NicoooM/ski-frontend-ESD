import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NavbarMain = () => {
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
    </Box>
  );
};

export default NavbarMain;
