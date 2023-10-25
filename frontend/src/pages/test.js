import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './test.css';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

function Test() {
  const navigate = useNavigate(); // Initialize navigate
  const [file, setFile] = useState(null);
  const [showAboutContent, setShowAboutContent] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShowAboutContent(true);
    },800);
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  // Updated function to navigate to the Start page
  const handleNavigateToStart = () => {
    navigate('/start'); // Navigate to the Start page
  };

  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await fetch('http://localhost:4000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('File uploaded successfully.');
        handleNavigateToStart(); // Navigate to the Start page after successful upload
      } else {
        alert('Error uploading the file.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="App">
      <div className={`about-section ${showAboutContent ? 'show-content' : ''}`}>
        <div className="instructions-box">
          <Typography variant="h4" gutterBottom>
            About
          </Typography>
          {showAboutContent && (
            <Typography variant="body1">
              This app captures the nutrient contents from the back label of the packaged food item and recommends whether it is consumable based on the age group and health condition of an individual.
            </Typography>
          )}
        </div>
      </div>

      <div className="image-upload-section">
        <Typography variant="h4" align="center" gutterBottom>
          Image Upload
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleUpload}>
              Upload
            </Button>
          </Grid>
        </Grid>
      </div>

      <Container className="start-button">
        {/* Updated button to trigger the navigation */}
        <Button variant="contained" color="secondary" size="large" onClick={handleNavigateToStart}>
          Let's Start
        </Button>
      </Container>
    </div>
  );
}

export default Test;
