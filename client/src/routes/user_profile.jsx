import { useState, useEffect } from "react";
import { get_user_profile_data, get_users_posts, toggleFollow } from "../api/endpoints";
import { SERVER_URL } from "../constants/constants";
import test from '../assets/test.jpeg'
import'./user_profile.css'
import Post from "../components/post";

const UserProfile = () => {

    const get_username_from_url = () => {
        const url_split = window.location.pathname.split('/');
        return url_split[url_split.length-1]
    }

    const [username, setUsername] = useState(get_username_from_url())

    useEffect(() => {
        setUsername(get_username_from_url())
    }, [])
    return (
        <div>
            <div className="prof-cont">
                <div className="det-cont">
                    <UserDetails username={username} />
                </div>
                <div>
                    <UserPosts username={username} />
                </div>
            </div>
        </div>
    )
}

const UserDetails = ({username}) => {

    const [loading, setLoading] = useState(true)
    const [bio, setBio] = useState('')
    const [profileImage, setProfileImage] = useState('')
    const [followerCount, setFollowerCount] = useState(0)
    const [followingCount, setFollowingCount] = useState(0)

    const [isOurProfile, setIsOurProfile] = useState(false)
    const [following, setFollowing] = useState(false)

    const handleToggleFollow = async () => {
        const data = await toggleFollow(username);
        if (data.now_following) {
            setFollowerCount(followerCount+1)
            setFollowing(true)
        } else {
            setFollowerCount(followerCount-1)
            setFollowing(false)
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await get_user_profile_data(username);
                setBio(data.bio)
                setProfileImage(data.profile_image)
                setFollowerCount(data.follower_count)
                setFollowingCount(data.following_count)

                setIsOurProfile(data.is_our_profile)
                setFollowing(data.following)
            } catch {
                console.log('error')
            } finally {
                setLoading(false)
            }
        }
        fetchData()
        
    }, [])

    return (
        <div className="det-cont">
            <img src={loading ? '' : `${SERVER_URL}${profileImage}`} alt="User Profile" />
            <div>
                <div>
            <h3>@{username}</h3>
            
                    <div className="follow-cont">
                        <div>
                            <h3>Followers</h3>
                            <h4>{ loading ? '-' : followerCount}</h4>
                        </div>
                        <div>
                            <h3>Following</h3>
                            <h4>{ loading ? '-' : followingCount}</h4>
                        </div>
                        <div>
                            
                        </div>
                    </div>
                    <h5>Bio</h5>
                    <p>{ loading ? '-' : bio}</p>
                    {
                        loading ?
                        <h1>Loading. . .</h1>
                        // <Spacer />
                        :

                            isOurProfile ?
                                < ></>
                            :
                                <button onClick={handleToggleFollow}>{following ? 'Unfollow' : 'Follow'}</button>
                    }
                
                </div>
            </div>
        </div>
    )
}

const UserPosts = ({username}) => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchPosts = async () => {
            try {
                const posts = await get_users_posts(username)
                setPosts(posts)
            } catch {
                alert('error getting users posts')
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()

    }, [])

    return (
        <div>
            {loading ?
                <h2>Loading...</h2>
            :
                posts.map((post) => {
                    return <Post key={post.id} id={post.id} post_img={post.post_image} username={post.username} description={post.description} formatted_date={post.formatted_date} liked={post.liked} like_count={post.like_count} img={post.user_profile_image} />
                })
            }
        </div>
    )
}








export default UserProfile