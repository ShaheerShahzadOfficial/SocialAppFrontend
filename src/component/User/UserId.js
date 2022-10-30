import "../UserProfile/profile.css"
import React, { Fragment, useEffect, useState } from 'react'
import { Avatar, Button } from '@mui/material'
 import { useDispatch, useSelector } from "react-redux"
 import { useParams } from 'react-router-dom'
import { LoadUser } from "../../Redux/Actions/Auth"
import { followAndUnfollowUser, getUsersProfile } from "../../Redux/Actions/User"
import UserPost from "../Post/UserPost.js"

const UserAccount = () => {

  // const [LikedPost, setLikedPost] = useState(false)

const [myProfile, setMyProfile] = useState(false)
const [following, setFollowing] = useState(false);
  const dispatch = useDispatch()
  let {id}  = useParams();

useEffect(() => {
  dispatch(getUsersProfile(id))

}, [dispatch, id])
  const  {user,loading} = useSelector((state) => state.User)

  const  {user:me} = useSelector((state) => state.Auth)



useEffect(() => {

  if (me?._id === id) {
    setMyProfile(true)
  }else{
    setMyProfile(false)
  }

  if (user) {
    user?.followers?.forEach((item) => {
      if (item._id === me._id) {
        setFollowing(true);
      } else {
        setFollowing(false);
      }
    });
  }


}, [id, me._id, user])

const followHandler = async () => {
  setFollowing(!following);
  await dispatch(followAndUnfollowUser(user._id));
  await dispatch(getUsersProfile(id));
  await  dispatch(LoadUser())
};


  return (
<Fragment>

{
  loading ? <div className="loaderContainer">
    <div className="loader">Loading ...</div>
  </div> :
  <div className='Background'>
  <div className="UserProfile">
     
  <div className="ProfileContainer">
<div>
<Avatar
src={user?.avatar?.url}
alt="User"
className="avatar"
sx={{
height: '15vmax',
width: '15vmax',
marginLeft: '1vmax',
marginRight: '1vmax',
zIndex: 1,
}}
/>

<h2> {user?.name} </h2>


</div>

<div className="Details">
<div>
<h4>Followers</h4>
<p>{user?.followers?.length}</p>
</div>

<div>
<h4>Following</h4>
<p>{user?.following?.length}</p>
</div>

<div>
<h4>Posts</h4>
<p>{user?.posts?.length}</p>
</div>
</div>

<div className="follow">
{myProfile ? null : (
          <Button
            variant="contained"
            style={{ background: following===true ? "red" : "" }}
            onClick={followHandler}
            // disabled={followLoading}
          >
            {following===true ?
             "Unfollow" :
              "Follow"
              } 
          </Button>
        )}

</div>
</div>

<div className="postContainer">
{user?.posts?.map((item, i) => (
<UserPost
key={i}
item={item}
User={user}
/>
))}
</div> 


</div>
</div>
}

</Fragment>
  )
}

export default UserAccount