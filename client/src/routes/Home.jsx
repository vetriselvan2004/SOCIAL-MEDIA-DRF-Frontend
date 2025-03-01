import { useEffect, useState } from "react";
import { get_posts } from "../api/endpoints";
import Post from "../components/post";
import './Home.css'
import '../routes/Home.css'
const Home = () => {

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [nextPage, setNextPage] = useState(1)

    const fetchData = async () => {
        const data = await get_posts(nextPage)
        setPosts([...posts, ...data.results])
        setNextPage(data.next ? nextPage+1 : null)
    }

    useEffect(() => {
        try {
            fetchData()
        } catch {
            alert('error getting posts')
        } finally {
            setLoading(false)
        }
    }, [])

    const loadMorePosts = () => {
        if (nextPage) {
            fetchData()
        }
    }

    return (
        <div className='Home_cont'>
        <div className='post-container'>
                {
                    loading ?
                        <h2>Loading...</h2>
                     :
                         posts ?
  
                             posts.map((post) => {
                                 return <Post key={post.id} id={post.id} post_img={post.post_image} username={post.username} description={post.description} formatted_date={post.formatted_date} liked={post.liked} like_count={post.like_count} img={post.user_profile_image}/>
                             })
                             
                         :

                         <></>
                    
                 }

                {
                     nextPage && !loading && (
                         <button onClick={loadMorePosts} w='100%'>Load More</button>
                     )
                 }
        
        </div>
        </div>

        // <div>
        //     <div>
        //         <h1>Posts</h1>
        //         {
        //             loading ?
        //                 <h2>Loading...</h2>
        //             :
        //                 posts ?
  
        //                     posts.map((post) => {
        //                         return <Post key={post.id} id={post.id} username={post.username} description={post.description} formatted_date={post.formatted_date} liked={post.liked} like_count={post.like_count} />
        //                     })
                             
        //                 :

        //                 <></>
                    
        //         }

        //         {
        //             nextPage && !loading && (
        //                 <button onClick={loadMorePosts} w='100%'>Load More</button>
        //             )
        //         }

        //     </div>
        // </div>
    )
}

export default Home;