import { Box, FormGroup, TextField, Typography } from "@mui/material";

const SigninPage = () => {
  return (
    <Box>
      <Typography variant="h1">Signin</Typography>
      <Box component={"form"}>
        <FormGroup>
          <TextField variant="outlined" label="Email" />
        </FormGroup>
        <FormGroup>
          <TextField variant="outlined" label="Password" />
        </FormGroup>
      </Box>
    </Box>
  );
};

export default SigninPage;
