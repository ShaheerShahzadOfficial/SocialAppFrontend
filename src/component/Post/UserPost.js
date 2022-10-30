import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { Like } from '../../Redux/Actions/Post'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { LIKE_AND_UNLIKE_POST_RESET } from '../../Redux/Constant'
import { getUsersProfile } from '../../Redux/Actions/User'
import { useParams } from 'react-router-dom'

const UserPost = ({item,User}) => {
    const dispatch = useDispatch()

const {id} = useParams()

    const [LikedPost, setLikedPost] = useState(false)
  
    const { user } = useSelector(state => state.Auth)
    const { message } = useSelector(state => state.like)
  
  
    useEffect(() => {
  
      if (message === 'Post Unliked') {
        setLikedPost(false)
      }
  
      if (message !== null) {
       dispatch(getUsersProfile(id))
        dispatch({
          type: LIKE_AND_UNLIKE_POST_RESET
        })
      }
  
    }, [dispatch, id, message])
  
  
    useEffect(() => {
        item?.likes.forEach(items => {
        if (items === user?._id) {
          setLikedPost(true)
        }
      })
      
    }, [user?._id, item?.likes, item])
    
  
    return (
      <div className='post'>
        <div className='postHeader'>
          <Link to={`/user/${User?._id}`}>
            <Avatar
              src={User?.avatar?.url}
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
            <h3>{User?.name}</h3>
          </Link>
        </div>
        <div className='postBody'>
          {/* Caption */} <p>{item?.caption }</p>
          <img src={item?.files?.url} alt={item?.files?.url} />
        </div>
        <div className='postFooter'>
          <p>{item?.likes?.length} Likes</p>
          <p>{item?.comments?.length} Comments</p>
          <hr className='new' />
  
          <IconButton onClick={() => dispatch(Like(item?._id))}>
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
  

export default UserPost