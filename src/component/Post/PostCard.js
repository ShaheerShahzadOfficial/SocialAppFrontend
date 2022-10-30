import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { getPostOfFollowing, Like } from '../../Redux/Actions/Post'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { LIKE_AND_UNLIKE_POST_RESET } from '../../Redux/Constant'

const PostCard = ({ item, user,post }) => {
  const dispatch = useDispatch()

  const [LikedPost, setLikedPost] = useState(false)

  const { user: me } = useSelector(state => state.Auth)
  const { message } = useSelector(state => state.like)

  useEffect(() => {
    item?.likes?.forEach(itemS => {
      if (itemS._id === me?._id) {
        setLikedPost(true)
      }
    })
  }, [item?.likes, me?._id])

  useEffect(() => {

    if (message === 'Post Unliked') {
      setLikedPost(false)
    }

    if (message) {
      dispatch(getPostOfFollowing())
      dispatch({
        type: LIKE_AND_UNLIKE_POST_RESET
      })
    }

  }, [dispatch, item?.likes, message])


  useEffect(() => {
    post?.likes?.forEach(items => {
      if (items?._id === me?._id) {
        setLikedPost(true)
      }
      console.log(items?._id === me?._id)
    })

    
  }, [me?._id, post?.likes])
  

  return (
    <div className='post'>
      <div className='postHeader'>
        <Link to={`/user/${item?.owner?._id ? item?.owner?._id : user?._id}`}>
          <Avatar
            src={
              item?.owner?.avatar?.url
                ? item?.owner?.avatar?.url
                : user?.avatar?.url
            }
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
          <h3>{item?.owner?.name ? item?.owner?.name : user?.name}</h3>
        </Link>
      </div>
      <div className='postBody'>
        {/* Caption */} <p>{item ? item?.caption : post?.caption }</p>
        <img src={item ?  item?.files?.url : post?.files?.url} alt={item ? item?.files?.public_id : post?.files?.url} />
      </div>
      <div className='postFooter'>
        <p>{item? item?.likes?.length :  post?.likes?.length} Likes</p>
        <p>{item? item?.comments?.length :  post?.comments?.length} Comments</p>
        <hr className='new' />

        <IconButton onClick={() => dispatch(Like(item? item?._id : post?._id))}>
          {LikedPost === true ? (
            <FavoriteIcon />
          ) : (
            <FavoriteBorderOutlinedIcon />
          )}
        </IconButton>

        <IconButton>
          <ChatBubbleOutlineOutlinedIcon />
        </IconButton>
      </div>
    </div>
  )
}

export default PostCard
