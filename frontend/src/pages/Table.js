import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// Add these imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

// Replace the Slider import with PrettoSlider
import Slider from '@mui/material/Slider';

// Add Dialog imports
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

// Define your theme or use an existing one
const defaultTheme = createTheme();

const data = {
  Calorie: 10,
  Fats: 10,
  Protein: 20,
  Sodium: 15,
  Carbohydrate: 45,
};

// Use styled(PrettoSlider) instead of Slider
const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: '#52af77',
  height: 8,
  // ... (other styles)
}));

export default function Table() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [userInfo, setUserInfo] = useState({
    age: '',
    weight: '',
    height: '',
    gender: '',
  });
  const [openDialog, setOpenDialog] = useState(true);
  const [bmi, setBMI] = useState(null);

  useEffect(() => {
    // Display the pop-up on initial load
    setOpenDialog(true);

    // Delay the slider movement on initial load
    const delay = setTimeout(() => {
      setInitialLoad(false);
    }, 8000); // Adjust the delay as needed

    return () => clearTimeout(delay);
  }, []);

  const handleDialogSubmit = () => {
    // Perform BMI calculation here based on userInfo
    const calculatedBMI = calculateBMI(userInfo.weight, userInfo.height);

    // Set the BMI to be displayed
    setBMI(calculatedBMI);

    // Send BMI to the backend or perform other actions as needed
    sendBMItoBackend(calculatedBMI);

    // Reset the user info
    setUserInfo({
      age: '',
      weight: '',
      height: '',
      gender: '',
    });

    // Close the pop-up
    setOpenDialog(false);
  };

  const calculateBMI = (weight, height) => {
    // Formula: BMI = weight (kg) / (height (m))^2
    const weightInKg = parseFloat(weight);
    const heightInM = parseFloat(height) / 100; // Convert height to meters
    return weightInKg / (heightInM * heightInM); // Multiply by 100 to get a percentage
  };

  const sendBMItoBackend = async (userInfo, bmi) => {  
    // const response = await fetch('/api/home/post-user-bmi', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     age: userInfo.age,
    //     weight: userInfo.weight,
    //     height: userInfo.height,
    //     gender: userInfo.gender,
    //     bmi: bmi,
    //   })
    // });
    // if (!response.ok) {
    //   throw new Error(`Request failed with status: ${response.status}`);
    // }
  };
  
  const handleChange = (key, value) => {
    console.log(`Setting ${key} to ${value}`);
    // You can add logic here to handle the changes in nutrient values
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* Add any app bar content if needed */}
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8, background: 'none' }} maxWidth="md">
          {/* Display small-sized BMI */}
          {bmi !== null && (
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              {bmi !== undefined && (
                <CircularProgressbar
                  value={bmi}
                  text={`${bmi.toFixed(2)}`}
                  styles={buildStyles({
                    rotation: 0.25,
                    strokeLinecap: 'butt',
                    textSize: '16px',
                    pathTransitionDuration: 0.5,
                    pathColor: `rgba(30, 140, 100, ${bmi / 100})`,
                    textColor: '#f88',
                    trailColor: 'orange',
                    backgroundColor: 'orange',
                  })}
                />
              )}
              <Typography variant="body2" color="textSecondary">
                {`BMI`}
              </Typography>
            </Box>
          )}

          {!openDialog && (
            <div style={{ background: 'white', padding: '16px', borderRadius: '5px', boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)' }}>
              <Grid container spacing={0}>
                {Object.entries(data).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="h6" component="div" >
                        {key}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ marginLeft: '150px' }} >
                      <PrettoSliderCard
                        value={value}
                        onChange={(newValue) => handleChange(key, newValue)}
                        initialLoad={initialLoad}
                      />
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </div>
          )}
        </Container>
      </main>

      {/* Dialog for entering user information */}
      <Dialog open={openDialog} fullWidth maxWidth="xs">
        <DialogTitle>Enter User Information</DialogTitle>
        <DialogContent>
          <TextField
            label="Age"
            type="number"
            value={userInfo.age}
            onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Weight (kg)"
            type="number"
            value={userInfo.weight}
            onChange={(e) => setUserInfo({ ...userInfo, weight: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Height (cm)"
            type="number"
            value={userInfo.height}
            onChange={(e) => setUserInfo({ ...userInfo, height: e.target.value })}
            fullWidth
            margin="normal"
          />
          {/* Updated InputLabel and Select for Gender */}
          <TextField
            label="Gender"
            fullWidth
            margin="normal"
          ></TextField>
            <Select
              value={userInfo.gender}
              onChange={(e) => setUserInfo({ ...userInfo, gender: e.target.value })}
            >
              <MenuItem value="">Select Gender</MenuItem>
              <MenuItem value="male">Male</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          

        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogSubmit}
            color="primary"
            disabled={
              !(
                userInfo.age !== '' &&
                userInfo.weight !== '' &&
                userInfo.height !== '' &&
                userInfo.gender !== ''
              )
            }
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

function PrettoSliderCard({ value, onChange, initialLoad }) {
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    // Move the slider to its respective position after a delay
    if (!initialLoad) {
      const delay = setTimeout(() => {
        setSliderValue(value);
      }, 1000); // Adjust the delay as needed

      return () => {
        clearTimeout(delay);
      };
    }
  }, [initialLoad, value]);

  const handleChange = (event, newValue) => {
    setSliderValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ width: '150%' }}>
      {/* Use the styled PrettoSlider component here */}
      <PrettoSlider
        value={sliderValue}
        onChange={handleChange}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1} // Adjust the step for smoother movement
        marks={[
          { value: 0, label: '0' },
          { value: 50, label: '50' },
          { value: 100, label: '100' },
        ]}
        min={0}
        max={100}
        sx={{
          transition: 'all 2s ease-in-out', // Add a transition for smoother movement
        }}
      />
    </div>
  );
}
