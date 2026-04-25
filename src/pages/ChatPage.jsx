import { useEffect, useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "../styles/ChatPage.css";

function ChatPage() {

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // ✅ Theme state (you can later make this global)
  const [darkMode, setDarkMode] = useState(true);

  if (!currentUser) return <Navigate to="/" />;

  const [users,setUsers]=useState([]);
  const [selectedUser,setSelectedUser]=useState(null);
  const [messages,setMessages]=useState([]);
  const [text,setText]=useState("");

  const bottomRef = useRef();

  // ✅ Fetch users
  const fetchUsers = async ()=>{
    const res = await fetch("http://localhost:5000/users");
    const data = await res.json();
    setUsers(data.filter(u=>u.id!==currentUser.id));
  }

  // ✅ Fetch messages
  const fetchMessages = async ()=>{
    if(!selectedUser) return;

    const res = await fetch("http://localhost:5000/messages");
    const data = await res.json();

    const filtered = data.filter(msg =>
      (msg.senderId===currentUser.id && msg.receiverId===selectedUser.id) ||
      (msg.senderId===selectedUser.id && msg.receiverId===currentUser.id)
    );

    setMessages(filtered);
  }

  // ✅ Send message
  const sendMessage = async ()=>{
    if(!text.trim()) return;

    await fetch("http://localhost:5000/messages",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body: JSON.stringify({
        senderId:currentUser.id,
        receiverId:selectedUser.id,
        text,
        timestamp:new Date().toISOString()
      })
    });

    setText("");
    fetchMessages();
  }

  // ✅ Logout with API update
  const handleLogout = async ()=>{
    try {
      await fetch(`http://localhost:5000/users/${currentUser.id}`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          online:false,
          lastSeen:new Date().toISOString()
        })
      });
    } catch(err){
      console.log("Logout update failed");
    }

    localStorage.removeItem("user");
    navigate("/");
  }

  // ✅ Effects
  useEffect(()=>{fetchUsers()},[]);

  useEffect(()=>{
    fetchMessages();
    const interval=setInterval(fetchMessages,2000);
    return ()=>clearInterval(interval);
  },[selectedUser]);

  useEffect(()=>{
    bottomRef.current?.scrollIntoView({behavior:"smooth"});
  },[messages]);

  return(
    <div className={`chat-container ${darkMode ? "dark" : "light"}`}>

      {/* 🔹 SIDEBAR */}
      <div className={`sidebar ${selectedUser ? "hide-mobile" : ""}`}>

        <div className="sidebar-header">
          <img 
            src={currentUser.avatar} 
            alt="profile"
            onClick={()=>navigate("/profile")} 
          />

          <div style={{display:"flex", gap:"10px"}}>
            {/* 🌙 Theme Toggle */}
            <button onClick={()=>setDarkMode(!darkMode)}>
              {darkMode ? "☀️" : "🌙"}
            </button>

            {/* 🚪 Logout */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>

        {/* 👥 USERS */}
        {users.map(user=>(
          <div 
            key={user.id} 
            className={`user-item ${selectedUser?.id === user.id ? "active" : ""}`}
            onClick={()=>setSelectedUser(user)}
          >
            <img src={user.avatar} alt="user" />

            <div>
              <h4>
                {user.name} {user.online ? "🟢":"⚫"}
              </h4>

              {/*  Last seen */}
              {!user.online && user.lastSeen && (
                <p style={{fontSize:"12px"}}>
                  Last seen: {new Date(user.lastSeen).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 CHAT AREA */}
      <div className={`chat-box ${!selectedUser ? "hide-mobile" : ""}`}>

        {!selectedUser ? (
          <h3 style={{padding:"20px"}}>Select user 💬</h3>
        ) : (
          <>
            {/* HEADER */}
            <div className="chat-header">
              <button className="back-btn" onClick={()=>setSelectedUser(null)}>⬅</button>
              <img src={selectedUser.avatar} alt="user" />
              <div>
                <span>{selectedUser.name}</span>
                <p style={{fontSize:"12px"}}>
                  {selectedUser.online 
                    ? "Online 🟢" 
                    : `Last seen ${new Date(selectedUser.lastSeen).toLocaleTimeString()}`
                  }
                </p>
              </div>
            </div>

            {/* MESSAGES */}
            <div className="messages">
              {messages.map(msg=>(
                <div 
                  key={msg.id}
                  className={`message ${msg.senderId===currentUser.id ? "sent":"received"}`}
                >
                  <p>{msg.text}</p>
                  <small>{new Date(msg.timestamp).toLocaleTimeString()}</small>
                </div>
              ))}
              <div ref={bottomRef}></div>
            </div>

            {/* INPUT */}
            <div className="input-box">
              <input 
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder="Type message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </>
        )}

      </div>

    </div>
  )
}

export default ChatPage;