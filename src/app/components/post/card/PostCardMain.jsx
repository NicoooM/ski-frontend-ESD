import {
  Box,
  Button,
  Card,
  CardMedia,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  deletePost,
  updatePost,
} from "../../../../setup/services/post.service";

const PostCardMain = ({ data, edit, setEditingShop }) => {
  const [editable, setEditable] = useState(false);
  const [post, setPost] = useState(
    data
      ? {
          imageUrl: data.imageUrl,
          title: data.title,
          price: data.price,
          weight: data.weight,
          size: data.size,
          style: data.style,
        }
      : null
  );

  const readableDate = new Date(data?.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const renderAverageStars = useMemo(() => {
    return (
      data?.comments.reduce((acc, comment) => {
        return acc + comment.stars;
      }, 0) / data?.comments.length
    );
  }, [data?.comments]);

  const onPostChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onDeletePost = () => {
    deletePost(data._id)
      .then(() => {
        setEditingShop(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSubmitPost = (e) => {
    e.preventDefault();
    updatePost(data._id, post)
      .then(() => {
        setEditable(false);
        setEditingShop(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderEdit = () => {
    if (!edit || !data) return;
    return (
      <Box sx={{ mt: 1, display: "flex", gap: 2 }}>
        {!editable && (
          <Button component={Link} variant="outlined" to={`/${data._id}`}>
            Voir le post
          </Button>
        )}
        <Box component="form" onSubmit={onSubmitPost}>
          {editable && (
            <>
              <TextField
                fullWidth
                label="Titre"
                variant="outlined"
                sx={{ my: 1 }}
                value={post.title}
                onChange={onPostChange}
                name="title"
              />
              <TextField
                fullWidth
                label="Prix"
                variant="outlined"
                sx={{ my: 1 }}
                value={Number(post.price)}
                onChange={onPostChange}
                type="number"
                name="price"
              />
              <TextField
                fullWidth
                label="Image URL"
                variant="outlined"
                sx={{ my: 1 }}
                value={post.imageUrl}
                onChange={onPostChange}
                name="imageUrl"
              />
              <TextField
                fullWidth
                label="Poids"
                variant="outlined"
                sx={{ my: 1 }}
                value={Number(post.weight)}
                onChange={onPostChange}
                type="number"
                name="weight"
              />
              <TextField
                fullWidth
                label="Taille"
                variant="outlined"
                sx={{ my: 1 }}
                value={Number(post.size)}
                type="number"
                onChange={onPostChange}
                name="size"
              />
              <TextField
                fullWidth
                label="Style"
                variant="outlined"
                sx={{ my: 1 }}
                value={post.style}
                onChange={onPostChange}
                name="style"
              />
            </>
          )}
          <Button
            type="button"
            variant={editable ? "outlined" : "contained"}
            onClick={() => setEditable(!editable)}
          >
            {editable ? "Annuler" : "Modifier"}
          </Button>
          {editable && (
            <Button type="submit" sx={{ ml: 1 }} variant="contained">
              Sauvegarder
            </Button>
          )}
        </Box>
        {!editable && (
          <Button onClick={onDeletePost} variant="contained" color="error">
            Supprimer
          </Button>
        )}
      </Box>
    );
  };

  return (
    <>
      <Card
        sx={{
          border: "1px solid #eeeeee",
          overflow: "hidden",
          p: 1,
          boxShadow: "none",
          position: "relative",
          borderRadius: 2,
          zIndex: 2,
          "&::after": {
            content: '""',
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0)",
            width: "102%",
            height: "102%",
            backgroundColor: "transparent",
            transition: "all 0.2s ease",
            borderRadius: 2,
            zIndex: -1,
          },
          "&:hover": {
            "&::after": {
              backgroundColor: "#eeeeee",
              transform: "translate(-50%, -50%) scale(1)",
            },
          },
        }}
      >
        <CardMedia
          component="img"
          alt=""
          height="200"
          sx={{ borderRadius: 2 }}
          image={data?.imageUrl}
        />
        <Box>
          <Box sx={{ display: "flex", mt: 1 }}>
            <Rating
              disabled
              value={renderAverageStars}
              sx={{ mr: 1, color: "#3f51b5", "&.Mui-disabled": { opacity: 1 } }}
              precision={0.5}
            />
            <Typography sx={{ color: "#3f51b5" }}>
              ({data?.comments.length} avis)
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              fontWeight: "500",
              color: data?.isAvailable ? "#07d100" : "#e53d1f",
              my: 1,
              px: 1,
              py: 0.5,
              border: data?.isAvailable
                ? "1px solid #07d100"
                : "1px solid #e53d1f",
              borderRadius: 20,
              backgroundColor: data?.isAvailable ? "#07d10010" : "#e53d1f10",
              width: "fit-content",
            }}
          >
            {data?.isAvailable ? "Disponible" : "Réservé"}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            {data?.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.price}€
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Mis en ligne le {readableDate}
          </Typography>
        </Box>
      </Card>
      {renderEdit()}
    </>
  );
};

export default PostCardMain;
