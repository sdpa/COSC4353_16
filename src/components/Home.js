import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "./Navbar";
import LogIn from "./LogIn";
import { TrendingUpOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  // app: {
  //   testAlign: "center",
  // },
}));

function Home({ loggedIn, setLoggedIn }) {
  const classes = useStyles();

  let history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      history.push("/dashboard");
    }
  }, []);

  return (
    <>
      {loggedIn ? null : (
        <LogIn loggedIn={loggedIn} setLoggedIn={setLoggedIn}></LogIn>
      )}
    </>
  );
  //return <div>test</div>;
}

export default Home;
