import { Navigate } from "react-router-dom";

function ProfilePage(){

  const user = JSON.parse(localStorage.getItem("user"));

  if(!user) return <Navigate to="/" />

  return(
    <div style={{padding:"20px"}}>
      <img src={user.avatar} width="100" />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  )
}

export default ProfilePage;