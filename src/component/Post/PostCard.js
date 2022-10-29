import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { getPostOfFollowing, Like } from '../../Redux/Actions/Post'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { LIKE_AND_UNLIKE_POST_RESET } from '../../Redux/Constant';

const PostCard = ({ item }) => {
  const dispatch = useDispatch()

  const [LikedPost, setLikedPost] = useState(false)

  const { user } = useSelector(state => state?.Auth)
  const {message} = useSelector(state => state.like)

  useEffect(() => {
    item?.likes.forEach(itemS => {
      if (itemS._id === user._id) {
        setLikedPost(true)
      }
    })

  }, [item?.likes, user._id])


  useEffect(() => {
    if (message) {
        dispatch(getPostOfFollowing())
        dispatch({
            type:LIKE_AND_UNLIKE_POST_RESET
        })
    
        // item?.likes.forEach(item => {
        //     if (item._id !== user._id) {
        //       setLikedPost(false)
        //     }
        //   })
    }

    if (message === "Post Unliked") {
        setLikedPost(false)
    }

  }, [dispatch, item?.likes, message, user._id])
  

  return (
    <div className='post'>
      <div className='postHeader'>
        <Link to={`/user/${item?.owner?._id}`}>
          <Avatar
            src={item?.owner?.avatar?.url}
            alt='User'
            className='avatar'
            sx={{
              width: '10vh',
              height: '10vh',
              marginLeft: '1vmax',
              marginRight: '1vmax',
              zIndex: 1
            }}
          />
          <h3>{item?.owner?.name}</h3>
        </Link>
      </div>
      <div className='postBody'>
        {/* Caption */} <p>{item?.caption}</p>
        <img src={item?.files?.url} alt={item?.files?.public_id} />
      </div>
      <div className='postFooter'>
        <p>{item?.likes?.length} Likes</p>
        <p>{item?.comments?.length} Comments</p>
        <hr className='new' />

        <IconButton onClick={() => dispatch(Like(item?._id))}>
        {LikedPost===true ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon  /> }  
        </IconButton>

        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default PostCard
