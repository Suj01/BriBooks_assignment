

import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const fontFamilies = [
    'Arial',
    'Courier New',
    'Georgia',
    'Times New Roman',
    'Verdana',
    'Helvetica',
    'Tahoma',
    'Trebuchet MS',
    'Impact',
    'Comic Sans MS',
    'Lucida Sans Unicode',
    'Palatino Linotype',
    'Garamond',
    'Bookman',
    'Avant Garde',
    'Calibri',
    'Candara',
    'Optima',
    'Segoe UI',
    'Roboto'
];

export const FrontPage = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [selectedImage, setSelectedImage] = useState("");
    const [fontFamily, setFontFamily] = useState(fontFamilies[0]);
    const [fontColor, setFontColor] = useState("#000000");

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid orangeRed", padding: "5px" }}>
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
                            <p style={{ color: "grey", margin: 0 }}>Change the background image.</p>
                            <label htmlFor="file" style={{ color: "blue", borderBottom: "2px solid blue", cursor: 'pointer' }}>
                                Select file
                            </label>
                            <input
                                id="file"
                                type="file"
                                style={{ display: 'none' }}
                                onChange={handleImageUpload}
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
                    <select
                        value={fontFamily}
                        onChange={(e) => setFontFamily(e.target.value)}
                        style={{ padding: "12px", borderRadius: "10px" }}
                    >
                        {fontFamilies.map((font, index) => (
                            <option key={index} value={font}>{font}</option>
                        ))}
                    </select>

                    <input
                        type="color"
                        value={fontColor}
                        onChange={(e) => setFontColor(e.target.value)}
                        placeholder='select font colour'

                    />

                </div>
            </div>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '80vh',
                width: '60vh',
                backgroundImage: `url(${selectedImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                padding: '20px',
                marginTop: "10px",
                color: fontColor,
                textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
                margin: 'auto',
                border: '20px solid #c2e7ff',
                borderRadius: '5px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                fontFamily: fontFamily
            }}>
                <h1 style={{ fontSize: '4.5em', fontFamily: fontFamily, textAlign: "center" }}>{title}</h1>
                <h3 style={{ fontFamily: fontFamily, marginLeft: "10rem" }}>Written By: {author}</h3>
            </div>
        </>
    )
}

