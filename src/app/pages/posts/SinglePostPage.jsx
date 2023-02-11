import {
  Button,
  Box,
  CardMedia,
  Rating,
  Typography,
  TextField,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOnePost, updatePost } from "../../../setup/services/post.service";
import Comment from "../../components/post/Comment";
import { createComment } from "../../../setup/services/comment.service";
import { createBooking } from "../../../setup/services/booking.service";

const SinglePostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [editPost, setEditPost] = useState(true);
  const [comment, setComment] = useState({
    stars: 0,
    username: "",
    description: "",
  });
  const [phone, setPhone] = useState();

  const onChangeComment = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value });
  };

  const onChangePhone = (e) => {
    setPhone(Number(e.target.value));
  };

  const renderAverageStars = useMemo(() => {
    return (
      post?.comments.reduce((acc, comment) => {
        return acc + comment.stars;
      }, 0) / post?.comments.length
    );
  }, [post?.comments]);

  const handleBook = (e) => {
    e.preventDefault();
    createBooking({ telephoneNumber: phone, post: id })
      .then(() => {
        updatePost(id, { isAvailable: false })
          .then(() => {
            setEditPost(true);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCreateComment = (e) => {
    e.preventDefault();
    const data = { ...comment, post: id };
    createComment(data)
      .then((res) => {
        setEditPost(true);
        setComment({ stars: 0, username: "", description: "" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (editPost) {
      getOnePost(id)
        .then((post) => {
          setPost(post);
          setEditPost(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, editPost]);

  return (
    <>
      <Button component={Link} to="/" variant="contained" sx={{ mb: 2 }}>
        Retour
      </Button>
      {post && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          <Box sx={{ width: "30%" }}>
            <Typography
              variant="p"
              sx={{ fontSize: 24, fontWeight: "bold", mb: 1, display: "block" }}
            >
              Ajouter un commentaire
            </Typography>
            <Box component={"form"} onSubmit={handleCreateComment}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  py: 1,
                  px: 2,
                  backgroundColor: "#3f51b5",
                  borderRadius: 1,
                  width: "fit-content",
                }}
              >
                <Rating
                  value={Number(comment.stars)}
                  name="stars"
                  onChange={onChangeComment}
                  sx={{
                    mr: 1,
                    color: "#fff",
                    "&.Mui-disabled": { opacity: 1 },
                  }}
                  precision={0.5}
                />
              </Box>
              <TextField
                sx={{ my: 2, width: "100%" }}
                label="Nom d'utilisateur"
                variant="outlined"
                name="username"
                value={comment.username}
                onChange={onChangeComment}
              />
              <TextField
                multiline
                minRows={4}
                label="Commentaire"
                variant="outlined"
                name="description"
                value={comment.description}
                onChange={onChangeComment}
                sx={{ width: "100%" }}
              />
              <Button sx={{ mt: 2 }} type="submit" variant="contained">
                Ajouter
              </Button>
            </Box>
            <Typography
              variant="p"
              sx={{ fontSize: 24, fontWeight: "bold", my: 2, display: "block" }}
            >
              Tous les commentaires ({post.comments.length})
            </Typography>
            {post.comments.map((comment) => (
              <Comment key={comment._id} data={comment} />
            ))}
          </Box>
          <Box sx={{ width: "70%" }}>
            <CardMedia
              component="img"
              height="400"
              sx={{ borderRadius: 2, mb: 2 }}
              image={post.imageUrl}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                py: 1,
                px: 2,
                backgroundColor: "#3f51b5",
                borderRadius: 1,
                width: "fit-content",
              }}
            >
              <Rating
                disabled
                value={renderAverageStars}
                sx={{ mr: 1, color: "#fff", "&.Mui-disabled": { opacity: 1 } }}
                precision={0.5}
              />
              <Typography sx={{ color: "#fff" }}>
                ({post.comments.length} avis)
              </Typography>
            </Box>
            <Typography variant="h1" sx={{ fontSize: 48, fontWeight: "bold" }}>
              {post.title}
            </Typography>
            <Typography variant="p" sx={{ fontSize: 32, fontWeight: "bold" }}>
              {post.price}€
            </Typography>
            <br />
            <Typography
              variant="p"
              sx={{ fontSize: 18, mb: 2, display: "block" }}
            >
              Poids: {post.weight}kg - Taille: {post.size}cm - Style:{" "}
              {post.style}
            </Typography>
            {post.isAvailable && (
              <Box
                component={"form"}
                sx={{ display: "flex", gap: 2 }}
                onSubmit={handleBook}
              >
                <TextField
                  id="phone"
                  label="Numéro de téléphone"
                  variant="filled"
                  type={"tel"}
                  sx={{ minWidth: 250 }}
                  value={phone}
                  onChange={onChangePhone}
                />
                <Button type="submit" variant="contained">
                  Réserver
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      )}
    </>
  );
};

export default SinglePostPage;
