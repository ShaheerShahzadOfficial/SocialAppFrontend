import React, { useState } from 'react'
import "./navbar.css"
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { Link } from 'react-router-dom';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import OndemandVideoTwoToneIcon from '@mui/icons-material/OndemandVideoTwoTone';
import PersonSearchTwoToneIcon from '@mui/icons-material/PersonSearchTwoTone';
import PersonSearchOutlinedIcon from '@mui/icons-material/PersonSearchOutlined';
const Navbar = () => {
    const [tab, setTab] = useState(window.location.pathname);
  return (
    <div className="header">
    <Link to="/" onClick={() => setTab("/")}>
      {tab === "/" ? <HomeTwoToneIcon /> : <HomeOutlinedIcon />}
    </Link>


    <Link to="/search" onClick={() => setTab("/search")}>
      {tab === "/search" ? (
        <PersonSearchTwoToneIcon />
      ) : (
        <PersonSearchOutlinedIcon />
      )}
    </Link>
    

    <Link to="/watch" onClick={() => setTab("/watch")}>
      {tab === "/watch" ? (
        <OndemandVideoTwoToneIcon />
      ) : (
        <OndemandVideoIcon/>
      )}
    </Link>



    <Link to="/account" onClick={() => setTab("/account")}>
      {tab === "/account" ? (
        <AccountCircleTwoToneIcon />
      ) : (
        <AccountCircleOutlinedIcon />
      )}
    </Link>
  </div>
)
}

export default Navbar