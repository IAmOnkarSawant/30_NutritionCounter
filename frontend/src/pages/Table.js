import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// Add these imports
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';

// Replace the Slider import with PrettoSlider
import Slider from '@mui/material/Slider';

// Define your theme or use an existing one
const defaultTheme = createTheme();

const data = {
  Calorie: 'medium',
  Fats: 'low',
  Protein: 'high',
  Sodium: 'medium',
  Carbohydrate: 'low',
};

// Use styled(PrettoSlider) instead of Slider
const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: '#52af77',
  height: 8,
  // ... (other styles)
}));

export default function Table() {
  const handleChange = (key, value) => {
    console.log(`Setting ${key} to ${value}`);
  };

  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    // Delay the slider movement on initial load
    const delay = setTimeout(() => {
      setInitialLoad(false);
    }, 80000); // Increased the delay to make it more visible

    return () => clearTimeout(delay);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          {/* Add any app bar content if needed */}
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {Object.entries(data).map(([key, value]) => (
              <Grid item key={key} xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {key}
                    </Typography>
                    {/* Use the styled PrettoSlider component here */}
                    <PrettoSliderCard
                      value={value}
                      onChange={(newValue) => handleChange(key, newValue)}
                      initialLoad={initialLoad}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

function PrettoSliderCard({ value, onChange, initialLoad }) {
  const [sliderValue, setSliderValue] = useState(value === 'low' ? 0 : value === 'medium' ? 50 : 100);

  useEffect(() => {
    // Move the slider to its respective position after a delay
    if (!initialLoad) {
      const delay = setTimeout(() => {
        setSliderValue(value === 'low' ? 0 : value === 'medium' ? 50 : 100);
      }, 2000); // Increased the delay to make it more visible

      return () => clearTimeout(delay);
    }
  }, [initialLoad, value]);

  return (
    <div>
      {/* Use the styled PrettoSlider component here */}
      <PrettoSlider
        value={sliderValue}
        onChange={(event, newValue) => {
          setSliderValue(newValue);
          onChange(newValue);
        }}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={50}
        marks={[
          { value: 0, label: 'Low' },
          { value: 50, label: 'Medium' },
          { value: 100, label: 'High' },
        ]}
        min={0}
        max={100}
        sx={{
          transition: 'all 1s ease-in-out', // Add a transition for smoother movement
        }}
      />
    </div>
  );
}
