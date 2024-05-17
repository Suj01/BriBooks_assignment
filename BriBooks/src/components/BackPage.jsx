


import '../App.css';
import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

export const BackPage = () => {
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [author, setAuthor] = useState("");
    const [profile, setProfile] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("green");

    const handleProfileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setProfile(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", borderBottom: "2px solid orangeRed", padding: "5px" }}>
                <div style={{ width: "70%", display: "flex", alignItems: "center", justifyContent: "space-around", gap: "5px" }}>
                    <input
                        type="text"
                        placeholder="Write Your Book Title"
                        style={{ padding: "12px 40px", borderRadius: "10px" }}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }} >
                        <AddPhotoAlternateIcon style={{ color: '#c2e7ff' }} />
                        <div>
                            <p style={{ color: "grey", margin: 0 }}>Change the Profile image.</p>
                            <label htmlFor="file-back" style={{ color: "blue", borderBottom: "2px solid blue", cursor: 'pointer' }}>
                                Select file
                            </label>
                            <input
                                id="file-back"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleProfileUpload}
                            />
                        </div>
                    </div>
                    <input
                        type="text"
                        placeholder="Writer name"
                        style={{ padding: "12px 40px", borderRadius: "10px" }}
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Write your message here"
                        style={{ padding: "12px 40px", borderRadius: "10px" }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <input
                        type="color"
                        value={backgroundColor}
                        onChange={(e) => setBackgroundColor(e.target.value)}
                        placeholder='select background colour'
                    />
                </div>
            </div>

            <div style={{
                height: '80vh',
                width: '60vh',
                backgroundColor: backgroundColor,
                padding: '20px',
                color: '#fff',
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                margin: 'auto',
                marginTop: "10px",
                border: '20px solid #c2e7ff',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                fontFamily: 'sans-serif',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <h3 style={{ fontSize: '1.5em', fontFamily: 'serif', }}>{title}</h3>
                <h5 style={{ fontFamily: 'serif' }}>Written by {author}</h5>
                <hr style={{ width: "95%" }} />
                <div style={{ display: "flex", alignItems: "center", width: '100%', justifyContent: 'space-around' }}>
                    <div style={{ textAlign: 'center' }}>
                        <div style={{
                            height: "20vh",
                            width: "20vh",
                            backgroundImage: profile ? `url(${profile})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            border: "2px solid",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {!profile && <p style={{ color: 'grey' }}>Profile Image</p>}
                        </div>
                        <h3 style={{ fontFamily: 'serif' }}>{author}</h3>
                    </div>
                    <div style={{ width: "50%", padding: "10px", textAlign: 'center', overflow: 'hidden' }}>
                        <h3 style={{ fontFamily: 'serif', fontSize: message.length > 100 ? '0.8em' : '1.5em' }}>{message}</h3>
                    </div>
                </div>
                <hr style={{ width: "95%" }} />
                <div>
                    <h2>Published by BriBooks</h2>
                    <p style={{ fontSize: "12px" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nihil non porro, dolore eligendi repellendus totam repellat numquam odit quibusdam consequuntur earum suscipit? Perspiciatis atque id eveniet rem quam .</p>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "5rem" }}>
                    <div>
                        <img src="https://www.bribooks.com/assets/images/BriBooks.svg" alt="logo" style={{ width: "6rem" }} />
                        <p style={{ fontSize: "12px" }}>https://www.bribooks.com/</p>
                        <p style={{ fontSize: "12px" }}>Preview copy for limited distribution</p>
                    </div>
                    <div>
                        <img src="https://imgs.search.brave.com/eeXQqmJBU8HLP4PAk2MfhbgoMo7_0FUquL8G_P7IpwU/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTM5/ODE1MjIwMy9waG90/by9kYXRhLWxhYmVs/aW5nLXF1aWNrLXJl/c3BvbnNlLWNvZGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PW9DeWhSYU9oYUpH/ZVJXeFJIblBvWm9Z/RVhkYzBaVGpaZk1U/aTRpMEJoN2c9" alt="qr code" style={{ width: "6rem" }} />
                    </div>
                </div>
            </div>
        </>
    );
}

