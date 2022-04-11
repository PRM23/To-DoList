import React from "react";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import Note from "./../images/img.jpg.jpg";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    maxWidth: 245,
    marginLeft: 500,
  },
  media: {
    height: 280,
  },
  button: {
    textAlign: "center",
  },
});

const Home = (props) => {
  const classes = useStyles();

  return (
    <Card
      style={{ width: "1000px", display: "inline-block" }}
      className={classes.root}
    >
      <CardActionArea>
        <CardMedia
          style={{ width: "97%" }}
          className={classes.media}
          image={Note}
        />
        <CardContent>
          <Typography>
            "You don't have to be great to start, but you have to start great"
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.button}>
        <Link to="/add">
          <Button size="small" color="primary">
            Start your First Note
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default Home;
