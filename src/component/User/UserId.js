import "../UserProfile/profile.css"
import React, { useEffect, useState } from 'react'
import { Avatar, Button } from '@mui/material'
 import { useDispatch, useSelector } from "react-redux"
 import { useParams } from 'react-router-dom'
 import { getUsersProfile } from '../../Redux/Actions/User'
 import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
 import CommentIcon from '@mui/icons-material/Comment'
const UserAccount = () => {

const [myProfile, setMyProfile] = useState()
  const dispatch = useDispatch()
  let {id}  = useParams();

useEffect(() => {
  dispatch(getUsersProfile(id))

}, [dispatch, id])
  const  {loading,user} = useSelector((state) => state.User)





  return (
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
                // style={{ background: following ? "red" : "" }}
                // onClick={followHandler}
                // disabled={followLoading}
              >
                {/* {following ?
                 "Unfollow" :
                  "Follow"
                  }  */}
                  Follow  
              </Button>
            )}

</div>
</div>

<div className="postContainer">
{user?.posts?.map((item, i) => (
<div className="post" key={i}>
  <div className="postHeader">
    <Avatar
      src={user?.avatar?.url}
      alt={user?.avatar?.public_id}
      className="avatar"
      sx={{
        width: '10vh',
        height: '10vh',
        marginLeft: '1vmax',
        marginRight: '1vmax',
        zIndex: 1,
      }}
    />
    <h3>{item?.owner?.name}</h3>
  </div>
  <div className="postBody">
    {/* Caption */} <p>{item?.caption}</p>
    {item?.Filetype === "image" ?<img src={item?.files?.url} alt={item?.files?.public_id} />:
    <video controls controlsList="nodownload">
    <source src={item?.files?.url} />
  </video>}
 
  </div>
  <div className="postFooter">
    <p>{item?.likes?.length}Likes</p>
    <p>{item?.comments?.length}Comments</p>
    <hr className="new" />
    <ThumbUpOutlinedIcon />
    <CommentIcon />
  </div>
</div>
))}
</div> 


</div>
</div>
  )
}

export default UserAccount



// import { Avatar, Button } from '@mui/material'
// import React from 'react'
// import { useDispatch, useSelector } from "react-redux"
// import { useParams } from 'react-router-dom'
// import { GetUsersProfile } from '../../Redux/Actions/User'


// const UserAccount = () => {
// const dispatch = useDispatch()

// const {id} = useParams()

//   dispatch(GetUsersProfile(id))

//   const  {loading,user} = useSelector(state => state.User)

  
//   return (
//     <div>
//     {loading ? (
//       <div className="loaderContainer">
//         <div className="loader"> Loading ....</div>
//       </div>
//     ) : (
//       <div className="Background">
//         <div className="UserProfile">
         
// <Avatar src={user?.avatar?.url} />

//         </div>
//       </div>
//     )}
//   </div>  )
// }

// export default UserAccount



