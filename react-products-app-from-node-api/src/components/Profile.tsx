import React, { useEffect, useState, useRef } from "react";
// import { useAppSelector } from "../rtk/hooks";
import { useInitProfile } from "../hooks/profileHooks";
import "../assets/css/profile.css";

// interface ProfileFormProps {
//   profileData: { name: string; email: string } | null;
//   onSave: (data: { name: string; email: string; password?: string }) => void;
// }

const Profile: React.FC = (
//   {
//   profileData,
//   onSave,
// }
) => {

  const { dispatchUpdateProfile, loading, error, profile } = useInitProfile()

  // const { loading, error, profile } = useAppSelector((state) => state.profile )
  // const [name, setName] = useState(profile?.name);
  // const [email, setEmail] = useState(profile?.email);
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  
  // console.log('profileData: ', profileData)


  
  console.log('loading: ', loading)
  console.log('error: ', error)

  console.log('profile from store ', profile)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const name = nameRef.current?.value;
    const email = emailRef.current?.value;

    if (!name || !email) {
      return;
    }

    dispatchUpdateProfile({ name, email })

    setEditing(false);
    setPassword("");
  };

  useEffect(() => {
    console.log('loading after process: ', loading)
    if(!loading && error) {
        setEditing(true) // let the user edit if there is an error
        return
    }

    setEditing(loading) // block user from editing if loading
    
  }, [loading, error]);



  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Edit Profile</h2>
        {!editing && (
          <button className="profile-edit-btn" onClick={() => setEditing(true)}>
            Edit
          </button>
        )}
      </div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="profile-avatar">
          <img
            src="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png"
            alt="Avatar"
          />
        </div>
        <div className="profile-fields">
          <label>
            Name
            <input 
              // name="name"
              type="text"
              defaultValue={profile?.name} 
              disabled={!editing}
              // onChange={handleDefaltFieldBehavior} // setName(e.target.value}
              ref={nameRef}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              // name="email"
              defaultValue={profile?.email} 
              disabled={!editing}
              // onChange={handleDefaltFieldBehavior}
              ref={emailRef}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              disabled
              // placeholder="Coming soon..."
              // onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label>
            Preferences
            <input
              type="text"
              disabled
              placeholder="Coming soon..."
              style={{ color: "#aaa" }}
            />
          </label>
        </div>
        {editing && (
          <div className="profile-actions">
            <button type="submit" className={'profile-save-btn'} disabled={loading}>
                            {!loading && error && (<span>Re-Try...</span>)}
                            {loading && (<span>Saving...</span>)}
                            {!loading && !error && (<span>Save</span>)}
                            </button>
            <button
              type="button"
              className="profile-cancel-btn"
              onClick={() => {
                // setName(profile?.name || "");
                // setEmail(profile?.email || "");
                setPassword("");
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
      </form>
      {error && <p className='profile-error'>{error}</p>}
    </div>
  );
};

export default Profile;