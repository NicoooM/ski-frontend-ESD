import { Box, Rating, Typography } from "@mui/material";

const Comment = ({ data }) => {
  console.log(data);
  return (
    <>
      <Box sx={{ width: "80%", mb: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 1,
          }}
        >
          <Typography variant="p" sx={{ fontSize: 18, fontWeight: "medium" }}>
            {data?.username}
          </Typography>
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
              value={data?.stars}
              sx={{
                color: "#fff",
                "&.Mui-disabled": { opacity: 1 },
              }}
              precision={0.5}
            />
          </Box>
        </Box>
        <Typography variant="p" sx={{ fontSize: 16 }}>
          {data.description}
        </Typography>
      </Box>
    </>
  );
};

export default Comment;
