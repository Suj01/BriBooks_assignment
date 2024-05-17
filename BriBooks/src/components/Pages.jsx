
import '../App.css';
import React, { useState, useRef } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const fontFamilies = [
    'Impact', 'Garamond', 'Palatino Linotype', 'Avant Garde', 'Verdana',
    'Helvetica', 'Tahoma', 'Trebuchet MS', 'Comic Sans MS', 'Arial',
    'Lucida Sans Unicode', 'Calibri', 'Candara', 'Optima', 'Segoe UI', 'Roboto'
];

const Page = ({ pageIndex, story, pageImage, fontFamily, fontColor, position }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: position === 'left' ? 'flex-start' : 'flex-end',
        justifyContent: 'space-between',
        height: '80vh',
        width: '160vh',
        backgroundImage: `url(${pageImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '20px',
        color: fontColor,
        fontWeight: "600",
        margin: 'auto',
        fontFamily: fontFamily,
        border: '20px solid #c2e7ff',
        borderRadius: '5px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box'
    }}>
        <p style={{
            fontSize: '1.5em',
            fontFamily: fontFamily,
            maxWidth: '45%',
            margin: '20px',
            padding: '10px',
            borderRadius: '10px',
        }}>{story}</p>
    </div>
);

export const Pages = () => {
    const [pages, setPages] = useState(
        Array.from({ length: 4 }, () => ({
            story: '',
            pageImage: '',
            fontFamily: fontFamilies[0],
            fontColor: '#000000',
            isSubmitted: false,
            position: 'left'
        }))
    );
    const [currentPage, setCurrentPage] = useState(0);
    const [isBookView, setIsBookView] = useState(false);
    const pdfRef = useRef();

    const handleStoryChange = (pageIndex, value) => {
        const updatedPages = [...pages];
        updatedPages[pageIndex].story = value;
        setPages(updatedPages);
    };

    const handlePageImageUpload = (pageIndex, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                const updatedPages = [...pages];
                updatedPages[pageIndex].pageImage = reader.result;
                setPages(updatedPages);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFontFamilyChange = (pageIndex, value) => {
        const updatedPages = [...pages];
        updatedPages[pageIndex].fontFamily = value;
        setPages(updatedPages);
    };

    const handleFontColorChange = (pageIndex, value) => {
        const updatedPages = [...pages];
        updatedPages[pageIndex].fontColor = value;
        setPages(updatedPages);
    };

    const handleNextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            alert('You have reached the last page.');
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        } else {
            alert('You are on the first page.');
        }
    };

    return (
        <>
            {!isBookView && (
                <>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", borderBottom: "2px solid orangeRed", padding: "5px" }}>
                        <div style={{ width: "70%", display: "flex", alignItems: "center", justifyContent: "space-around", gap: "5px" }}>
                            <input
                                type="text"
                                placeholder="Write Your Story Part"
                                style={{ padding: "12px 40px", borderRadius: "10px" }}
                                value={pages[currentPage].story}
                                onChange={(e) => handleStoryChange(currentPage, e.target.value)}
                            />
                            <div style={{ display: 'flex', alignItems: 'center', gap: "10px" }} >
                                <AddPhotoAlternateIcon style={{ color: '#c2e7ff' }} />
                                <div>
                                    <p style={{ color: "grey", margin: 0 }}>Change the background image.</p>
                                    <label htmlFor="file-pages" style={{ color: "blue", borderBottom: "2px solid blue", cursor: 'pointer' }}>
                                        Select file
                                    </label>
                                    <input
                                        id="file-pages"
                                        type="file"
                                        style={{ display: 'none' }}
                                        onChange={(e) => handlePageImageUpload(currentPage, e)}
                                    />
                                </div>
                            </div>
                            <select
                                value={pages[currentPage].fontFamily}
                                onChange={(e) => handleFontFamilyChange(currentPage, e.target.value)}
                                style={{ padding: "12px", borderRadius: "10px" }}
                            >
                                {fontFamilies.map((font, index) => (
                                    <option key={index} value={font}>{font}</option>
                                ))}
                            </select>
                            <input
                                type="color"
                                value={pages[currentPage].fontColor}
                                onChange={(e) => handleFontColorChange(currentPage, e.target.value)}
                            />
                        </div>
                    </div>
                    <div id={`content-${currentPage}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                        <Page
                            pageIndex={currentPage}
                            story={pages[currentPage].story}
                            pageImage={pages[currentPage].pageImage}
                            fontFamily={pages[currentPage].fontFamily}
                            fontColor={pages[currentPage].fontColor}
                            position={pages[currentPage].position}
                        />
                    </div>
                    <button onClick={handlePreviousPage} style={{ marginTop: '20px', padding: '10px 20px' }}>
                        Previous  Page
                    </button>
                    <button onClick={handleNextPage} style={{ marginTop: '20px', padding: '10px 20px' }}>
                        Next Page
                    </button>
                    <button onClick={() => setIsBookView(true)} style={{ marginTop: '20px', padding: '10px 20px' }}>
                        Finish and View Book
                    </button>
                </>
            )}
            {isBookView && (
                <>
                    <div ref={pdfRef}>
                        {pages.map((page, index) => (
                            <div key={index} id={`content-${index}`} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%',marginTop:"10px" }}>
                                <Page
                                    pageIndex={index}
                                    story={page.story}
                                    pageImage={page.pageImage}
                                    fontFamily={page.fontFamily}
                                    fontColor={page.fontColor}
                                    position={page.position}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}
        </>
    );
};



