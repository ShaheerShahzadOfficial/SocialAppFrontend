import { Avatar, Button, IconButton } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './profile.css'
import '../Home/home.css'
import { Logout } from '../../Redux/Actions/Auth'
import { useDispatch, useSelector } from 'react-redux'
import { DeleteProfile } from '../../Redux/Actions/User'
import { MyPost } from '../../Redux/Actions/Post'
import MyPosts from '../Post/MyPosts'
const UserProfile = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state?.Auth)
  const {post} = useSelector((state) => state?.myPost)


  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
    if (isAuthenticated) {
      dispatch(MyPost())
    }

  }, [dispatch, isAuthenticated, navigate])

  const deleteProfile = () => {
    dispatch(DeleteProfile())
  }

  return (
    <Fragment>
      {loading ? (
        <div className="loaderContainer">
          <div className="loader"> Loading ....</div>
        </div>
      ) : (
        <div className="Background">
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

                <div className="Link">
                  <Link to={'/updateProfile'} className="editProfile">
                    Edit Profile
                  </Link>
                  <Link to={'/UpdatePassword'}>Change Password</Link>
                </div>
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

              <div className="logout">
                <Button
                  variant="contained"
                  onClick={() => {
                    dispatch(Logout())
                  }}
                >
                  LogOut
                </Button>
                <br />
                <Button color="error" onClick={deleteProfile}>
                  DELETE MY PROFILE
                </Button>
              </div>
            </div>

            <div className="postContainer">
              {post?.posts?.map((item, i) => (
<MyPosts
key={i}
item={item}
/>
              ))}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  )
}

export default UserProfile
