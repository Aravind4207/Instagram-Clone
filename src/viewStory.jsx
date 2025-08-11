import React, { useState, useEffect } from 'react';
import { useParams,Link,useNavigate } from 'react-router-dom';



function ViewStory() {
  const { id , tot } = useParams();
  const [story, setStory] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3000/story/${id}`)
      .then(data => data.json())
      .then(data => setStory(data))
      .catch(err => console.log(err))
  }, [id]);


  if (id > tot || id<=0){
    navigate('/');

  }

  return (
    <div style={{cursor:"default"}}>
      {story ? (<div className="d-flex justify-content-center align-items-center ">
          <Link to={`http://localhost:5173/story/${Number(id)-1}/${tot}`}><i class="arrow bi-arrow-left-circle" style={{fontSize:"4rem"}}></i></Link>
          <img className="vh-100" src={story.postImage} alt="story" />
          <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i class="arrow bi-arrow-right-circle" style={{fontSize:"4rem"}}></i></Link>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ViewStory;
