import React, { useEffect, useState } from 'react'
import axios from 'axios';

function Suggestion() {

  const [profile,setProfile] = useState(null);
  const [suggestions,setSuggestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/profile")
      .then(data => data.json())
      .then(data => setProfile(data))
      .catch(err => console.log(err))

      fetch("http://localhost:3000/suggestions")
      .then(data => data.json())
      .then(data => setSuggestions(data))
      .catch(err => console.log(err))
  },[]);

  const handleFollow = async (id,username) => {
    axios.post('http://localhost:3000/followers',{"id":id,"username":username})
    .then(alert('followed'))
    .catch(err => console.log(err))
  }
  return (
    <div className=" d-flex m-4" style={{cursor:"default"}}>
      <div className="suggestions justify-content-center ">
        {profile ?
        <div className="d-flex">
            <img className="dp rounded-circle" src={profile.profilePic} alt={"profile pic"} style={{}} />
            <h5 className="username">{profile.username}</h5>
            <small className=" switch  text-primary ms-auto">Switch</small>
        </div>
        : <p>Loading....</p>}

        <div className= " d-flex color-secondary">
          <p >Suggested for you</p>
          <b className=" seeall ">See All</b>
        </div>
        <div>
          {suggestions.length >0 ?(
            <div>  
              {suggestions.map((suggestion)=> (
                <div className="my-10" key={suggestion.id}>
                  <div className= "d-flex">
                    <img className= "dp rounded-circle" src={suggestion.profilePic} alt="profilePic" />
                    <h5 className="username">{suggestion.username}</h5>
                    <a className="follow text-primary ms-auto " style={{cursor:'default'}} onClick={()=>{handleFollow(suggestion.id,suggestion.username)}}>Follow</a>
                  </div>
                </div>

              ))}
            </div>  
        ):(
          <div>
            Loading...
          </div>
        )}
        </div> 
       
      </div>
    </div>
  )
}

export default Suggestion;