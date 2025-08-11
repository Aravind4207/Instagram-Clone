import React from 'react'
import { useState, useEffect } from 'react';

function Posts() {
    const [posts, setPosts] = useState([]);

    // Fetch posts from an API or a local source
    useEffect(() => {
        fetch("http://localhost:3000/posts")
            .then((data)=>data.json())
            .then((data => setPosts(data)))
            .catch((err=> console.log(err)))

    },[]);


  return (
    <div className="d-flex justify-content-center" style={{cursor:"default"}}>
        {posts.length> 0 ? ( 
            <div >
                {posts.map((post)=>(
                    <div className="my-10" key={post.id}>
                          <div className="d-flex">
                            <img className="dp rounded-circle" src={post.user.profilePic} alt={"profile pic"} style={{}} />
                            <h5 className="username">{post.user.username}</h5>
                          </div>
                          <img className="image" src={post.postImage} alt="" />
                          <div>
                            <i className="bi bi-heart"></i>
                            <i className="bi bi-chat"></i>
                            <i className="bi bi-send"></i>
                          </div>
                          <div>
                            <b>
                                {post.likes} likes
                            </b>
                          </div>
                          <p>{post.caption}</p>
                    </div>
                ))}
            </div>
        ) :(
            <div>
                Loading posts ...
            </div>
        )
        }
    </div>
  )
}

export default Posts  