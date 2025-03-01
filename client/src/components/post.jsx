import React from 'react'
import { useState } from "react";
import { toggleLike } from "../api/endpoints";
import { FaHeart } from "react-icons/fa";
import Prof from '../assets/person.svg'
import Trash from '../assets/trash.svg'
import Test from '../assets/test.jpeg'
import { delete_post } from "../api/endpoints";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { SERVER_URL } from '../constants/constants';
const post = ({id, username, description, post_img,formatted_date, liked, like_count,img}) => {
    
    const handleDelete = async (post_id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await delete_post(post_id);
                alert("Post deleted successfully!");
                // Refresh posts after deletion
            } catch (error) {
                alert("Error deleting post");
            }
        }
    };

    const [clientLiked, setClientLiked] = useState(liked)
    const [clientLikeCount, setClientLikeCount] = useState(like_count)

    const handleToggleLike = async () => {
        const data = await toggleLike(id);
        if (data.now_liked) {
            setClientLiked(true)
            setClientLikeCount(clientLikeCount+1)
        } else {
            setClientLiked(false)
            setClientLikeCount(clientLikeCount-1)
        }
    }
    return (
           <div className='post'>
            <div className='post-head'>
               <img src={`${SERVER_URL}${img}`} className='profile_img'/>
               <Link  style={{ textDecoration: "none" }} to={`${username}`}>
               <p>@{username}</p>
               </Link>
               <p>{formatted_date}</p>
               <div onClick={() => handleDelete(id)} className='trash'><img src={Trash} /></div>
            </div>
            <div className='post-body'>
              <img src={`${SERVER_URL}${post_img}`} className='post_img'/>
              <p>{description} </p>
            </div>
            <div className='post-bottom'>
            {
                clientLiked ? 
                    // <Box color='red'>
                        <FaHeart onClick={handleToggleLike} />

                    // </Box>
                :
                    <FaRegHeart onClick={handleToggleLike} />
            }
               {/* <img src={Heart}/> */}
               <p>{clientLikeCount} likes</p>
            </div>
          </div> 
  )
}

export default post

