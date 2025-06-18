import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/hooks";
import "../assets/css/profile.css";

interface ProfileFormProps {
  profileData: { name: string; email: string } | null;
  onSave: (data: { name: string; email: string; password?: string }) => void;
}

const Profile: React.FC<ProfileFormProps> = ({
  profileData,
  onSave,
}) => {
  const [name, setName] = useState(profileData?.name || "");
  const [email, setEmail] = useState(profileData?.email || "");
  const [password, setPassword] = useState("");
  const [editing, setEditing] = useState(false);


  const { loading, error } = useAppSelector((state) => state.profile)
  console.log('loading: ', loading)
  console.log('error: ', error)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, email, password: password || undefined });
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
              type="text"
              value={name}
              disabled={!editing}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={email}
              disabled={!editing}
              onChange={(e) => setEmail(e.target.value)}
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
                setName(profileData?.name || "");
                setEmail(profileData?.email || "");
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