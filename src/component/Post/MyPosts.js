import { Avatar, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined'
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import { useDispatch, useSelector } from 'react-redux'
import { Like, MyPost } from '../../Redux/Actions/Post'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { LIKE_AND_UNLIKE_POST_RESET } from '../../Redux/Constant'
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MyPosts = ({item}) => {
    const dispatch = useDispatch()
 
        const [LikedPost, setLikedPost] = useState(false)
      
        const { user } = useSelector(state => state.Auth)
        const { message } = useSelector(state => state.like)
      
      
        useEffect(() => {
      
          if (message === 'Post Unliked') {
            setLikedPost(false)
          }
      
          if (message !== null) {
           dispatch(MyPost())
            dispatch({
              type: LIKE_AND_UNLIKE_POST_RESET
            })
          }
      
        }, [dispatch, message, user._id])
      
      
        useEffect(() => {
            item?.likes?.forEach(items => {
            if (items._id === user?._id) {
              setLikedPost(true)
            }
              })
          
        }, [user?._id, item?.likes, item])
        
      
        return (
          <div className='post'>
            <div className='postHeader'>
              <Link to={`/user/${user?._id}`}>
                <Avatar
                  src={user?.avatar?.url}
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
                <h3>{user?.name}</h3>
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
      
                {LikedPost === true ? (
                  <FavoriteIcon  onClick={() => dispatch(Like(item?._id))}/>  
                ) : (
                  <FavoriteBorderOutlinedIcon  onClick={() => dispatch(Like(item?._id))}/>
                )}
      
                <QuestionAnswerOutlinedIcon />
            </div>
          </div>
        )
      }

export default MyPosts