// import { useEffect } from "react";
import Profile from "./Profile.tsx";
import { useAuthContext } from "../contexts/AuthContext.tsx";
import Link from "./Link.tsx";
// import * as authHooks from '../hooks/authHooks'
// import { useInitProfile } from "../hooks/profileHooks.ts";
const ProfileRoute = () => {

  // const { profile, dispatchUpdateProfile } = useInitProfile()

  const { IsAuth } = useAuthContext();

  // // console.log('isAuth: ', IsAuth())
  

  // const initialName = profile?.name; // Replace with the actual initial name
  // const initialEmail = profile?.email; // Replace with the actual initial email
  // const onSave = (data: { name: string; email: string; password?: string }) => {
  //   dispatchUpdateProfile(data)
  // };

  console.log('isAuth: ', IsAuth())
  return IsAuth() ?<Profile 
  // profileData={profile} onSave={onSave} 
  /> : (
    <>
      <h2>Profile</h2>
      <p>Please log in to view your profile.</p>
      <Link to="/login">Login</Link>
    </>
  )
};

export default ProfileRoute;