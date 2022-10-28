import {Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
const User = ({ userId, name, avatar }) => {
  console.log(avatar?.url)
  return (
    <Link to={`/user/${userId}`} className="homeUser">
      <img src={avatar?.url} alt={name} />
      <Typography variant="h6">{name}</Typography>
    </Link>
  );
};

export default User;