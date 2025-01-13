import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";

const MovieCard = () => {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    axios
      .get(
        "https://ghibliapi.vercel.app/films/58611129-2dbc-4a81-a72f-77ddfc1b1b49"
      )
      .then((response) => response.data)
      .then((movieData) => setMovie(movieData));
  }, []);
  return (
    <Card sx={{ maxWidth: 500 }} variant="outlined">
      <CardMedia
        component="img"
        height="auto"
        image={movie.image}
        alt="movie img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {movie.title}
        </Typography>
        <Typography variant="overline" gutterBottom sx={{ display: "block" }}>
          {`${movie.director} / ${movie.release_date} / ${movie.running_time} minutes`}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {movie.description}
        </Typography>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export { MovieCard };
