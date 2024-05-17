



import React, { useState } from 'react';
import { PDFDownloadLink, PDFViewer, Document, Page as PDFPage, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import './App.css';
import { BackPage } from './components/BackPage';
import { FrontPage } from './components/FrontPage';
import { Pages } from './components/Pages';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
});

const PDFDocument = ({ frontPageData, pagesData, backPageData }) => (
  <Document>
    <PDFPage size="A4" style={styles.page}>
      <View style={styles.section}>
        {frontPageData.image && <Image src={frontPageData.image} style={styles.image} />}
        <Text style={styles.text}>{frontPageData.title}</Text>
        <Text style={styles.text}>Written by: {frontPageData.author}</Text>
      </View>
    </PDFPage>
    {pagesData.map((page, index) => (
      <PDFPage key={index} size="A4" style={styles.page}>
        <View style={styles.section}>
          {page.image && <Image src={page.image} style={styles.image} />}
          <Text style={styles.text}>{page.story}</Text>
        </View>
      </PDFPage>
    ))}
    <PDFPage size="A4" style={styles.page}>
      <View style={styles.section}>
        {backPageData.image && <Image src={backPageData.image} style={styles.image} />}
        <Text style={styles.text}>Written by: {backPageData.author}</Text>
        <Text style={styles.text}>{backPageData.message}</Text>
      </View>
    </PDFPage>
  </Document>
);

function App() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [frontPageData, setFrontPageData] = useState({ title: '', author: '', image: '' });
  const [pagesData, setPagesData] = useState(
    Array.from({ length: 10 }, () => ({
      story: '',
      image: '',
    }))
  );
  const [backPageData, setBackPageData] = useState({ author: '', message: '', image: '' });

  const handleFinish = () => {
    setIsFormSubmitted(true);
  };

  return (
    <>
      {!isFormSubmitted ? (
        <>
          <hr />
          <br />
          <h1 style={{ textAlign: "center", backgroundColor: "Grey" }}>Front Page</h1>
          <br />
          <div id="front-page">
            <FrontPage setFrontPageData={setFrontPageData} />
          </div>
          <hr />
          <br />
          <h1 style={{ textAlign: "center", backgroundColor: "yellowgreen" }}>Content Pages</h1>
          <br />
          <div className="content-page">
            <Pages pagesData={pagesData} setPagesData={setPagesData} />
          </div>
          <hr />
          <br />
          <h1 style={{ textAlign: "center", backgroundColor: "goldenrod" }}>Back Page</h1>
          <br /><br /><br />
          <div id="back-page">
            <BackPage setBackPageData={setBackPageData} />
          </div>
          <div style={{ textAlign: "center", margin: "20px" }}>
            <button onClick={handleFinish} style={{ padding: '10px 20px', margin: '10px' }}>
              Finish and Preview PDF
            </button>
          </div>
        </>
      ) : (
        <>
          <PDFViewer style={{ width: '100%', height: '500px' }}>
            <PDFDocument frontPageData={frontPageData} pagesData={pagesData} backPageData={backPageData} />
          </PDFViewer>
          <div style={{ textAlign: "center", margin: "20px" }}>
            <PDFDownloadLink
              document={<PDFDocument frontPageData={frontPageData} pagesData={pagesData} backPageData={backPageData} />}
              fileName="book.pdf"
            >
              {({ loading }) => (loading ? 'Loading document...' : 'Download PDF')}
            </PDFDownloadLink>
          </div>
        </>
      )}
    </>
  );
}

export default App;
