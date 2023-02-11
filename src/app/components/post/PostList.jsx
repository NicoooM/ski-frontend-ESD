import {
  Grid,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
} from "@mui/material";
import PostCardMain from "./card/PostCardMain";
import { getAllPosts } from "../../../setup/services/post.service";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  weightOptions,
  styleOptions,
  sizeOptions,
} from "../../constants/postFilters";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);
  const [style, setStyle] = useState("All");
  const [size, setSize] = useState(0);
  const [onlyAvailable, setOnlyAvailable] = useState(false);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleWeight = (e) => {
    setSelectedWeightIndex(e.target.value);
  };

  const handleStyle = (e) => {
    setStyle(e.target.value);
  };

  const handleSize = (e) => {
    setSize(e.target.value);
  };

  const handleOnlyAvailable = (e) => {
    setOnlyAvailable(e.target.checked);
  };

  useEffect(() => {
    const filter = {
      search,
      minWeight: weightOptions[selectedWeightIndex].minWeight,
      maxWeight: weightOptions[selectedWeightIndex].maxWeight,
      style,
      size,
      onlyAvailable,
    };
    getAllPosts(filter)
      .then((posts) => {
        setPosts([...posts]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [search, selectedWeightIndex, style, size, onlyAvailable]);

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: "flex", mb: 4, overflowX: "auto", pt: 1 }}>
        <TextField
          type="text"
          onChange={handleSearch}
          placeholder="Rechercher par nom"
          label="Rechercher"
          size="small"
          sx={{ minWidth: 300 }}
        />
        <FormControl size="small" sx={{ marginX: 2, minWidth: 170 }}>
          <InputLabel id="weight">Poids</InputLabel>
          <Select
            labelId="weight"
            id="weight"
            label="Age"
            size="small"
            value={selectedWeightIndex}
            onChange={handleWeight}
          >
            <MenuItem value={0}>Tous les poids</MenuItem>
            <MenuItem value={1}>Moins de 45kg</MenuItem>
            <MenuItem value={2}>Entre 45 et 65kg</MenuItem>
            <MenuItem value={3}>Plus de 65kg</MenuItem>
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="styles">Styles</InputLabel>
          <Select
            labelId="styles"
            id="styles"
            label="Styles"
            size="small"
            value={style}
            onChange={handleStyle}
          >
            <MenuItem value={"All"}>Tous les styles</MenuItem>
            {styleOptions.map((style, index) => (
              <MenuItem key={index} value={style}>
                {style}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl size="small" sx={{ marginX: 2, minWidth: 170 }}>
          <InputLabel id="sizes">Tailles</InputLabel>
          <Select
            labelId="sizes"
            id="sizes"
            label="Tailles"
            size="small"
            value={size}
            onChange={handleSize}
          >
            <MenuItem value={0}>Toutes les tailles</MenuItem>
            {sizeOptions.map((size, index) => (
              <MenuItem key={index} value={size}>
                {size}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={onlyAvailable}
                onChange={handleOnlyAvailable}
              />
            }
            label="Uniquement disponible"
          />
        </FormGroup>
      </Box>
      <Grid container spacing={2}>
        {posts?.map((post) => (
          <Grid key={post._id} item xs={12} sm={6} md={4}>
            <Link to={`/${post?._id}`} style={{ textDecoration: "none" }}>
              <PostCardMain data={post} />
            </Link>
          </Grid>
        ))}
        {posts?.length === 0 && (
          <Typography variant="p" sx={{ textAlign: "center" }}>
            Aucun résultat
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default PostList;
