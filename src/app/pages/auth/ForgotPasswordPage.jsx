import { Box, Button, FormGroup, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { forgotPassword } from "../../../setup/services/auth.service";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState({ type: "", message: "" });

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email });
      setEmail("");
      setResult({ type: "success", message: "Un email vous a été envoyé." });
    } catch (error) {
      setResult({ type: "error", message: error.response.data.message });
    }
  };

  return (
    <Box>
      <Typography variant="h1">Mot de passe oublié</Typography>
      <Box component={"form"} onSubmit={onSubmitForm}>
        <FormGroup>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={email}
            onChange={onChangeEmail}
          />
        </FormGroup>
        {result.type === "success" && (
          <Typography variant="p" color="success">
            {result.message}
          </Typography>
        )}
        {result.type === "error" && (
          <Typography variant="p" color="error">
            {result.message}
          </Typography>
        )}
        <Button type="submit" variant="contained">
          Confirmer
        </Button>
        <Typography variant="p" to="/auth/signin" component={Link}>
          Annuler
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
