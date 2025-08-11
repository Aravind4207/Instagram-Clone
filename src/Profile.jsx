import React from 'react'
import axios from 'axios';
import { useState, useEffect } from 'react';

function Profile() {

    const [profile, setProfile]= useState(null);

    const [followers , setFollowers] = useState([])

    const [unfollowed,setUnfollowed] = useState(0);

     

    useEffect(() =>{
        axios.get('http://localhost:3000/profile')
        .then(data => {setProfile(data.data) ; console.log(data)})
        .catch(err => console.log(err))

        axios.get('http://localhost:3000/followers')
        .then(data => {setFollowers(data.data)})
        .catch(err => console.log(err))


    },[unfollowed] )



    // onChange Concept with spread operator:
    // function HandleOnChange(e){
    //      setProfile((prev)=>({
    //          ...prev, 
    //      [e.target.name]:e.target.value
    //  }))}
    
    const handleUpdate = async () => {
        axios.put('http://localhost:3000/profile', profile)
        .then (console.log("Updated Profile"))
        .catch(err => console.log(err))
    }

    const handleUnFollow = async (id) => {
        axios.delete(`http://localhost:3000/followers/${id}`)
        .then(alert("Unfollowed"))
        .then(setUnfollowed(!unfollowed ))
        .catch(err => console.log(err))
    }



  return (
    <div className = "m-5" style={{cursor:"default"}}>
        {profile ? (
            <div>
                <img src={profile.profilePic} className="profile rounded-circle" />
                <h5>{profile.username}</h5> 
                <input type="text" 
                    value={profile.username}
                    name='username'
                    className="form-control m-4" 
                    placeholder="Update Username" 
                    onChange={(e) => setProfile({...profile, username: e.target.value})} 
                />

                <input type="text"
                    value={profile.profilePic}
                    name='profilePic' 
                    className="form-control m-4" 
                    placeholder="Update Profile Pic URL" 
                    onChange={(e) => setProfile({...profile, profilePic: e.target.value})} 
                />

                <button className="btn btn-primary mt-4 mx-4"
                    onClick={handleUpdate} 
                >   
                    Update
                </button>

            </div>


        ) :(
            <div>
                Loading Profile...
            </div> 
        )}
        {followers.length > 0 ? (
            followers.map(followers => (
                <div key={followers.id} className="d-flex my-2">
                    {followers.username}
                    <button className="btn btn-primary ms-auto" onClick={() => {handleUnFollow (followers.id)}}>Unfollow</button>
                </div>
            ))
        ):( 
            <div>Loading Followers.....</div>
        )}
    </div>
  )
}

export default Profile