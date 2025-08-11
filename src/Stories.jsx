import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Stories() { 

  const [stories,setStories] = useState([]);

  const navigate = useNavigate();

  let tot = 0;

  useEffect(() => {
    fetch("http://localhost:3000/story")
      .then(data => data.json())
      .then(data => setStories(data))
      .catch(err => console.log(err))
  },[]);

  return (
    <div className="story d-flex flex overflow-x-auto no-scrollbar space-x-4 p-4" style={{cursor:"default"}}>  
          <div className="d-none">
            { tot = stories.length}
          </div>
          {stories.length > 0 ?(
            stories.map((story)=>(
              <div key={story.id} className="mx-2" onClick={() =>{ navigate(`/story/${story.id}/${tot}`)}}>
                <div className="gradient-border">
                  <img src={story.user.profilePic} alt="dp" className="story-dp rounded-circle " />
                </div>
                <p className="username1 text-truncate" style={{width:"80px"}}>{story.user.username}</p>
              </div>
            ))

          ):(
            <p>Loding...</p>
          )}
    </div>
  )
}

export default Stories;