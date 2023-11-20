import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import proteinImage from "./protein.jpg";
import fatImage from "./fats.jpg";
import fibreImage from "./fiber.jpg";
import carbsImage from "./carbs.jpg";
import { useEffect, useState } from "react";
import SvgIcon from '@mui/material/SvgIcon';
import pregaNews from './pregaNews.svg';
import cardiacNews from './cardiac.svg';
import diabetic from './Diabetic.svg';
import child from './child.svg';

const recommendedArray = [
  'Include a variety of fruits and vegetables in your diet.',
  'Drink plenty of water throughout the day.',
  'Get regular exercise to maintain a healthy lifestyle.',
];

const notRecommendedArray = [
  'Limit the intake of sugary snacks and beverages.',
  'Avoid excessive consumption of processed foods.',
  'Reduce the intake of saturated fats and cholesterol.',
];

const PrettoSlider = styled(Slider)(({ theme }) => ({
  color: "#52af77",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
  // Custom transition duration
  "& .MuiSlider-thumb, & .MuiSlider-track": {
    transition: theme.transitions.create(["left", "transform"], {
      duration: theme.transitions.duration.shortest, // Adjust the duration as needed
    }),
  },
}));

function ValueLabelComponent(props) {
  const { children, value } = props;

  return (
    <Tooltip enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  value: PropTypes.number.isRequired,
};

function CustomizedSlider() {
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    const targetValue = 20; // Set your desired default value
    const duration = 2000; // Set the duration of the transition in milliseconds

    const startTime = Date.now();
    const updateSlider = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      if (elapsed < duration) {
        const progress = elapsed / duration;
        const easedProgress = 0.5 - 0.5 * Math.cos(progress * Math.PI); // Apply easing if needed
        const newValue = Math.round(targetValue * easedProgress);
        setSliderValue(newValue);
        requestAnimationFrame(updateSlider);
      } else {
        setSliderValue(targetValue);
      }
    };

    updateSlider();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  return (
    <Box sx={{ m: 1 }}>
      <Typography gutterBottom></Typography>
      <PrettoSlider
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        value={sliderValue}
        ValueLabelComponent={ValueLabelComponent}
        marks={marks}
      />
    </Box>
  );
}

const marks = [
  {
    value: 0,
  },
  {
    value: 20,
  },
  {
    value: 37,
  },
  {
    value: 100,
  },
];

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const cards = [{ N1: "Nutrient1" }, { N2: "Nutrient2" }, { N3: "Nutrient3" }];
const new_cards = [
  { type: "protein", image: proteinImage },
  { type: "fats", image: fatImage },
  { type: "fiber", image: fibreImage },
  { type: "carbs", image: carbsImage },
];
const StyledImg = styled('img')({
  width: '100%', // Adjust the width as needed
  height: 'auto', // Adjust the height as needed
  display: 'block',
});
function CustomIcon({ src, alt, ...props }) {
  return <StyledImg src={src} alt={alt} {...props} />;
}

function Album() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const flag = 0;

  const [topNutrients, setTopNutrients] = useState({
    protein: 0,
    fats: 0,
    fiber: 0,
    carbs: 0,
  });

  const [loadingTopNutrients, setLoadingTopNutrients] = useState(true);

  useEffect(() => {
    const fetchTopNutrients = async () => {
      try {
        const response = await fetch("/api/home/get-top4-nutrients");
        const data = await response.json();
        setTopNutrients(data);
        // console.log(data.carbs);
        setLoadingTopNutrients(false);
      } catch (error) {
        console.error("Error fetching top nutrients:", error);
        setLoadingTopNutrients(false);
      }
    };

    fetchTopNutrients();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const scriptResponse = await fetch("/api/home/run-python-script");
        const nutrientResponse = await fetch("/api/home/get-nutrients");
        const nutrientData = await nutrientResponse.json();
        // console.log("Nutrient data:", nutrientData);
        const mergedData = [...nutrientData];

        setCards(mergedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar></Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Nutrients
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            ></Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {/* <Button variant="contained">Main call to action</Button>
              <Button variant="outlined">Secondary action</Button> */}
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {Array.isArray(cards) && cards.length > 0 ? (
              // Render cards for each nutrient
              cards.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      image="https://source.unsplash.com/random?wallpapers"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2">
                        <strong>
                          {!card ? "Un-identified" : card.name[0]}{" "}
                        </strong>
                        {/* Display the first nutrient name */}
                      </Typography>
                      <Typography>
                        {generateDescription(card)}{" "}
                        {/* Generate and display description */}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={6} md={4}>
                {/* Display a placeholder image or message for no ingredients */}
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: "56.25%",
                    }}
                    image="https://source.unsplash.com/random?no-ingredients"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h5" component="h2" align="center">
                      No Ingredients
                    </Typography>
                    <Typography align="center">
                      No nutrient data available
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Container>

        <Container
          sx={{ py: 8, display: "flex", justifyContent: "space-between" }}
          maxWidth="md"
        >
          {new_cards.map((new_card, index) => (
            <Card
              key={index}
              sx={{
                height: "100%",
                width: "23%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardMedia
                component="div"
                sx={{
                  pt: "50%",
                }}
                image={new_card.image}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                {/* Use the state values for the Slider */}
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  value={topNutrients[new_card.type]}
                  ValueLabelComponent={ValueLabelComponent}
                />
              </CardContent>
            </Card>
          ))}
        </Container>
      </main>

      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      </Box>
      <Box sx={{ bgcolor: '#f5f5f5', p: 6, transition: 'background-color 1s' }} component="section">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {/* Text on the left */}
            <Grid item xs={12} sm={6}>
  <Typography variant="h5" component="h2" gutterBottom sx={{ color: flag === 1 ? 'green' : 'red', fontSize: '35px', padding: '25px', transition: 'color 10s, font-size 1s', fontWeight: 'bold' }}>
    {flag === 1 ? 'Recommended' : 'Not Recommended'} 
  </Typography>
  <ul>
    {flag === 1 ? (
      recommendedArray.map((item, index) => (
        <li key={index}>
          <Typography variant="body1">{item}</Typography>
        </li>
      ))
    ) : (
      notRecommendedArray.map((item, index) => (
        <li key={index}>
          <Typography variant="body1">{item}</Typography>
        </li>
      ))
    )}
  </ul>
</Grid>

            {/* Image on the right */}
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CustomIcon src={pregaNews} alt="Pregnant Lady" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section 2 */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 6, transition: 'background-color 1s' }} component="section">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {/* Image on the right */}
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CustomIcon src={cardiacNews} alt="New Protein Image" />
            </Grid>
            {/* Text on the left */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'blue', fontSize: '24px', transition: 'color 1s, font-size 1s' }}>
                Recommended
              </Typography>
              <Typography variant="body1">
                Add your recommended text or content here.
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'orange', fontSize: '24px', transition: 'color 1s, font-size 1s' }}>
                Not Recommended
              </Typography>
              <Typography variant="body1">
                Add your not recommended text or content here.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section 3 */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 6, transition: 'background-color 1s' }} component="section">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {/* Text on the left */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'purple', fontSize: '24px', transition: 'color 1s, font-size 1s' }}>
                Recommended
              </Typography>
              <Typography variant="body1">
                Add your recommended text or content here.
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'brown', fontSize: '24px', transition: 'color 1s, font-size 1s' }}>
                Not Recommended
              </Typography>
              <Typography variant="body1">
                Add your not recommended text or content here.
              </Typography>
            </Grid>

            {/* Image on the right */}
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CustomIcon src={diabetic} alt="Diabetic" />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Section 4 */}
      <Box sx={{ bgcolor: '#f5f5f5', p: 6, transition: 'background-color 1s' }} component="section">
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {/* Image on the right */}
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <CustomIcon src={child} alt="Diabetic" />
            </Grid>
            {/* Text on the left */}
            <Grid item xs={12} sm={6}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'teal', fontSize: '24px', transition: 'color 1s, font-size 1s' }}>
                Recommended
              </Typography>
              <Typography variant="body1">
                Add your recommended text or content here.
              </Typography>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'gray', fontSize: '24px', transition: 'color 1s, font-size 1s' }}>
                Not Recommended
              </Typography>
              <Typography variant="body1">
                Add your not recommended text or content here.
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

function generateDescription(nutrient) {
  const sortedKeys = Object.keys(nutrient)
    .filter(
      (key) =>
        key !== "_id" &&
        key !== "name" &&
        key !== "serving_size" &&
        key !== "__v"
    )
    .sort((a, b) => parseFloat(nutrient[b]) - parseFloat(nutrient[a]))
    .slice(0, 5);

  return (
    <div>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Nutrient Details - per 100g:
      </Typography>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {sortedKeys.map((key) => (
          <li key={key}>
            <Typography variant="body2" color="text.secondary">
              <strong>{key}:</strong> {nutrient[key]}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Album;
