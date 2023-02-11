import { Button, TextField, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createShop, updateShop } from "../../../setup/services/shop.service";

const CreateShop = ({ data, edit, setEditShop }) => {
  const navigate = useNavigate();
  const [shop, setShop] = useState({
    name: data?.name || "",
    address: data?.address || "",
    logo: data?.logo || "",
    password: data?.password || "",
  });

  const onChangeShop = (e) => {
    setShop({ ...shop, [e.target.name]: e.target.value });
  };

  const handleCreateShop = (e) => {
    e.preventDefault();
    if (edit) {
      updateShop(data._id, shop)
        .then((data) => {
          setEditShop(true);
          console.log(shop);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      createShop(shop)
        .then((data) => {
          navigate(`/boutique/${data._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Box component={"form"} onSubmit={handleCreateShop}>
      <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
        <TextField
          label="Nom de la boutique"
          sx={{ width: "50%" }}
          onChange={onChangeShop}
          value={shop.name}
          name="name"
        />
        <TextField
          label="Adresse de la boutique"
          sx={{ width: "50%" }}
          onChange={onChangeShop}
          value={shop.address}
          name="address"
        />
      </Box>
      <Box sx={{ display: "flex", gap: 2, width: "100%", my: 2 }}>
        <TextField
          label="Url du logo"
          sx={{ width: "50%" }}
          onChange={onChangeShop}
          value={shop.logo}
          name="logo"
        />
        <TextField
          label="Mot de passe"
          sx={{ width: "50%" }}
          onChange={onChangeShop}
          value={shop.password}
          name="password"
        />
      </Box>
      <Button type="submit" variant="contained">
        {edit ? "Modifier la boutique" : "Créer la boutique"}
      </Button>
    </Box>
  );
};

export default CreateShop;
