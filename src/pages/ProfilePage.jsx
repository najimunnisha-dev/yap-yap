import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import "../styles/ProfilePage.css";

function ProfilePage() {

  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(true);

  if (!storedUser) return <Navigate to="/" />;

  const [name, setName] = useState(storedUser.name);
  const [avatar, setAvatar] = useState(storedUser.avatar);
  const [password, setPassword] = useState("");

  // 📸 Image upload preview
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  // 💾 Save profile
  const handleSave = async () => {
    try {
      const updatedData = { name, avatar };

      if (password) {
        updatedData.password = password;
      }

      const res = await fetch(`http://localhost:5000/users/${storedUser.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData)
      });

      const updatedUser = await res.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated ✅");

    } catch {
      alert("Update failed ❌");
    }
  };

  return (
    <div className={`profile-container ${darkMode ? "dark" : "light"}`}>

      {/* HEADER */}
      <div className="profile-header">
        <button className="back-btn" onClick={()=>navigate("/chat")}>⬅</button>

        <h2>Profile</h2>

        <button 
          className="theme-btn"
          onClick={()=>setDarkMode(!darkMode)}
        >
          {darkMode ? "☀" : "🌙"}
        </button>
      </div>

      {/* CARD */}
      <div className="profile-card">

        <img src={avatar} alt="profile" className="profile-img" />

        <input type="file" onChange={handleImageUpload} />

        <input
          type="text"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          placeholder="Your name"
        />

        <input
          type="email"
          value={storedUser.email}
          disabled
        />

        <input
          type="password"
          placeholder="New Password"
          onChange={(e)=>setPassword(e.target.value)}
        />

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>

      </div>

    </div>
  );
}

export default ProfilePage;