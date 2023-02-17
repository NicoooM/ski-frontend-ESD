import {
  Box,
  Button,
  CardMedia,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { createPost } from "../../../setup/services/post.service";
import { getShop } from "../../../setup/services/shop.service";
import PostCardMain from "../../components/post/card/PostCardMain";
import CreateShop from "../../components/shop/CreateShop";

const SingleShopPage = () => {
  const { id } = useParams();
  const [shop, setShop] = useState(null);
  const [editShop, setEditShop] = useState(true);
  const [post, setPost] = useState({
    title: "",
    price: 0,
    imageUrl: "",
    weight: 0,
    size: 0,
    style: "",
  });

  const onChangePost = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const onCreatePost = (e) => {
    e.preventDefault();
    const newPost = {
      ...post,
      shop: id,
    };
    createPost(newPost)
      .then(() => {
        setPost({
          title: "",
          price: 0,
          weight: 0,
          size: 0,
          style: "",
          imageUrl: "",
        });
        setEditShop(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (editShop) {
      getShop(id)
        .then((data) => {
          setShop(data);
          setEditShop(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id, editShop]);

  return (
    <>
      {shop && (
        <>
          <Typography variant="h1" sx={{ fontSize: 48, mb: 8 }}>
            {shop?.name}
          </Typography>
          <Typography variant="h2" sx={{ fontSize: 24, mb: 2 }}>
            Modifier la boutique
          </Typography>
          <CreateShop edit={true} data={shop} setEditShop={setEditShop} />
          <Typography variant="h2" sx={{ fontSize: 24, mb: 2, mt: 8 }}>
            Ajouter un post
          </Typography>
          <Box component="form" onSubmit={onCreatePost}>
            <TextField
              fullWidth
              label="Titre"
              variant="outlined"
              sx={{ my: 1 }}
              value={post.title}
              onChange={onChangePost}
              name="title"
            />
            <TextField
              fullWidth
              label="Prix"
              variant="outlined"
              sx={{ my: 1 }}
              value={Number(post.price)}
              onChange={onChangePost}
              type="number"
              name="price"
            />
            <TextField
              fullWidth
              label="Image URL"
              variant="outlined"
              sx={{ my: 1 }}
              value={post.imageUrl}
              onChange={onChangePost}
              name="imageUrl"
            />
            <TextField
              fullWidth
              label="Poids"
              variant="outlined"
              sx={{ my: 1 }}
              value={Number(post.weight)}
              onChange={onChangePost}
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
              onChange={onChangePost}
              name="size"
            />
            <TextField
              fullWidth
              label="Style"
              variant="outlined"
              sx={{ my: 1 }}
              value={post.style}
              onChange={onChangePost}
              name="style"
            />
            <Button type="submit" sx={{ ml: 1 }} variant="contained">
              Créer
            </Button>
          </Box>
          <Box sx={{ mt: 8 }}>
            <Typography variant="h2" sx={{ fontSize: 24, mb: 2 }}>
              Tous les posts ({shop.posts.length})
            </Typography>
            {shop.posts.map((post) => (
              <Box key={post._id} sx={{ mb: 8 }}>
                <Grid key={post._id} item xs={12} sm={6} md={4}>
                  <PostCardMain data={post} edit setEditingShop={setEditShop} />
                </Grid>
                <Typography sx={{ mt: 2, fontSize: 18, mb: 1 }} variant="h4">
                  Réservations pour {post.title} :
                </Typography>
                {post.bookings.length === 0 ? (
                  <Typography sx={{ mt: 2 }}>Aucune réservation</Typography>
                ) : (
                  <>
                    {post.bookings.map((booking) => {
                      return (
                        <Box key={booking._id}>
                          <Typography>{booking.telephoneNumber}</Typography>
                        </Box>
                      );
                    })}
                  </>
                )}
              </Box>
            ))}
          </Box>
        </>
      )}
    </>
  );
};

export default SingleShopPage;
