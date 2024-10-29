import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Slider from "@mui/material/Slider";
import Tooltip from "@mui/material/Tooltip";
import PropTypes from "prop-types";
import { styled } from "@mui/system";
import proteinImage from "./Images/protein.jpg";
import fatImage from "./Images/fats.jpg";
import fibreImage from "./Images/fiber.jpg";
import carbsImage from "./Images/carbs.jpg";
import { useEffect, useState } from "react";
import pregaNews from "./Images/pregaNews.svg";
import cardiacNews from "./Images/cardiac.svg";
import diabetic from "./Images/Diabetic.svg";
import child from "./Images/child.svg";
import foodImage from './Images/food.jpg';
import Macro from "./Images/Macro.jpg";
import Navbar_Album from "../components/Navbar_Album";
import Chooser from '../components/Chooser'; 

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
  
  "& .MuiSlider-thumb, & .MuiSlider-track": {
    transition: theme.transitions.create(["left", "transform"], {
      duration: theme.transitions.duration.shortest, 
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

const defaultTheme = createTheme();

const new_cards = [
  { type: "protein", image: proteinImage },
  { type: "fats", image: fatImage },
  { type: "fiber", image: fibreImage },
  { type: "carbs", image: carbsImage },
];
const StyledImg = styled("img")({
  width: "100%", 
  height: "auto", 
  display: "block",
});
function CustomIcon({ src, alt, ...props }) {
  return <StyledImg src={src} alt={alt} {...props} />;
}

function Album() {
  const [cards, setCards] = useState([]);

  const [loading, setLoading] = useState(true);

  const [loadingTopNutrients, setLoadingTopNutrients] = useState(true);

  const [conditionStatus, setConditionStatus] = useState({
    pregnant: {
      count: 0,
      ingredients: [],
      recommended: true,
    },
    diabetic: {
      count: 0,
      ingredients: [],
      recommended: true,
    },
    child: {
      count: 0,
      ingredients: [],
      recommended: true,
    },
    cardiac: {
      count: 0,
      ingredients: [],
      recommended: true,
    },
  });
  
  const [view, setView] = useState('album'); 

  const handleChooseView = (chosenView) => {
    setView(chosenView);
  };
  

  const [topNutrients, setTopNutrients] = useState({
    protein: 0,
    fats: 0,
    fiber: 0,
    carbs: 0,
  });
  const flag = 0;

  const conditions = [
    {
      key: 'pregnant',
      name: 'Pregnancy',
      image: pregaNews,
    },
    {
      key: 'cardiac',
      name: 'Cardiac',
      image: cardiacNews,
    },
    {
      key: 'diabetic',
      name: 'Diabetic',
      image: diabetic,
    },
    {
      key: 'child',
      name: 'Child',
      image: child,
    },
  ];

  useEffect(() => {
    const fetchConditionStatus = async () => {
      try {
        // Fetch Pregnant status
        const responsePregnant = await fetch("/api/home/is-rec-pregnant");
        const dataPregnant = await responsePregnant.json();
        setConditionStatus((prevStatus) => ({
          ...prevStatus,
          pregnant: {
            count: dataPregnant.count || 0,
            ingredients: dataPregnant.ingredients || [],
            recommended: (dataPregnant.count || 0) === 0,
          },
        }));

        // Fetch Diabetic status
        const responseDiabetic = await fetch("/api/home/is-rec-diabetic");
        const dataDiabetic = await responseDiabetic.json();
        setConditionStatus((prevStatus) => ({
          ...prevStatus,
          diabetic: {
            count: dataDiabetic.count || 0,
            ingredients: dataDiabetic.ingredients || [],
            recommended: (dataDiabetic.count || 0) === 0,
          },
        }));

        // Fetch Child status
        const responseChild = await fetch("/api/home/is-rec-child");
        const dataChild = await responseChild.json();
        setConditionStatus((prevStatus) => ({
          ...prevStatus,
          child: {
            count: dataChild.count || 0,
            ingredients: dataChild.ingredients || [],
            recommended: (dataChild.count || 0) === 0,
          },
        }));

        // Fetch Cardiac status
        const responseCardiac = await fetch("/api/home/is-rec-cardiac");
        const dataCardiac = await responseCardiac.json();
        setConditionStatus((prevStatus) => ({
          ...prevStatus,
          cardiac: {
            count: dataCardiac.count || 0,
            ingredients: dataCardiac.ingredients || [],
            recommended: (dataCardiac.count || 0) === 0,
          },
        }));
      } catch (error) {
        console.error("Error checking condition status:", error);
        // If there's an error conditionStatus remains defined
        setConditionStatus((prevStatus) => ({
          ...prevStatus,
          pregnant: {
            ...prevStatus.pregnant,
            ingredients: prevStatus.pregnant.ingredients || [],
          },
          diabetic: {
            ...prevStatus.diabetic,
            ingredients: prevStatus.diabetic.ingredients || [],
          },
          child: {
            ...prevStatus.child,
            ingredients: prevStatus.child.ingredients || [],
          },
          cardiac: {
            ...prevStatus.cardiac,
            ingredients: prevStatus.cardiac.ingredients || [],
          },
        }));
      }
    };

    fetchConditionStatus();
  }, []);

  useEffect(() => {
    const fetchTopNutrients = async () => {
      try {
        const response = await fetch("/api/home/get-top4-nutrients");
        const data = await response.json();
        setTopNutrients(data || {});
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
        await fetch("/api/home/run-python-script");
        const nutrientResponse = await fetch("/api/home/get-nutrients");
        const nutrientData = await nutrientResponse.json();
        const mergedData = [...(nutrientData || [])];

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

  function renderConditionSection(conditionKey, conditionName, conditionImage, index) {
    const condition = conditionStatus[conditionKey] || {};

    const isEven = index % 2 === 0;

    return (
      <Box
        sx={{ bgcolor: "#f5f5f5", p: 6 }}
        component="section"
        key={conditionKey}
      >
        <Container maxWidth="md">
          <Grid container spacing={2}>
            {isEven ? (
              <>
                {/* Text on the left */}
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: condition.recommended ? "green" : "red",
                      fontSize: "35px",
                      padding: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    {condition.recommended ? "Recommended" : "Not Recommended"}
                  </Typography>
                  {condition.recommended ? (
                    <Typography variant="body1">
                      This item is recommended for {conditionName.toLowerCase()}.
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="body1">
                        The following ingredients are not recommended for {conditionName.toLowerCase()}:
                      </Typography>
                      {Array.isArray(condition.ingredients) && condition.ingredients.length > 0 ? (
                        <ul>
                          {condition.ingredients.map((ingredient, index) => (
                            <li key={index}>
                              <Typography variant="body1">{ingredient}</Typography>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="body1">No specific ingredients found.</Typography>
                      )}
                    </>
                  )}
                </Grid>
                {/* Image on the right */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <CustomIcon src={conditionImage} alt={conditionName} />
                </Grid>
              </>
            ) : (
              <>
                {/* Image on the left */}
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <CustomIcon src={conditionImage} alt={conditionName} />
                </Grid>
                {/* Text on the right */}
                <Grid item xs={12} sm={6}>
                  <Typography
                    variant="h5"
                    component="h2"
                    gutterBottom
                    sx={{
                      color: condition.recommended ? "green" : "red",
                      fontSize: "35px",
                      padding: "25px",
                      fontWeight: "bold",
                    }}
                  >
                    {condition.recommended ? "Recommended" : "Not Recommended"}
                  </Typography>
                  {condition.recommended ? (
                    <Typography variant="body1">
                      This item is recommended for {conditionName.toLowerCase()}.
                    </Typography>
                  ) : (
                    <>
                      <Typography variant="body1">
                        The following ingredients are not recommended for {conditionName.toLowerCase()}:
                        
                      </Typography>
                      {Array.isArray(condition.ingredients) && condition.ingredients.length > 0 ? (
                        <ul>
                          {condition.ingredients.map((ingredient, index) => (
                            <li key={index}>
                              <Typography variant="body1">{ingredient}</Typography>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Typography variant="body1">No specific ingredients found.</Typography>
                      )}
                    </>
                  )}
                </Grid>
              </>
            )}
          </Grid>
        </Container>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar_Album sx={{ zIndex: 100 }} />
      <br />
      <br />
      <br />
      <Chooser onChoose={handleChooseView} />
      {view === 'album' && (
        <p></p>
      )}
      {view === 'table' && (
        <p></p>
      )} 
      
      <CssBaseline />
      <AppBar id="Ing" sx={{
        position: 'relative', backgroundColor: 'white',
        height: '350px',
        marginTop: '20px',
        backgroundImage: `url(${foodImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        zIndex: 2
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          }}
        />

        <Typography variant="h4" sx={{
          color: 'white',
          marginTop: '35px',
          border: '2px solid white',
          padding: '10px',
          fontSize: '60px',
          fontWeight:'500',
          fontFamily:"Roboto, Sans-serif",
          paddingLeft:'30px',
          paddingRight:'30px',
          zIndex: 1
        }}>
          INGREDIENTS
        </Typography>

      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {Array.isArray(cards) && cards.length > 0 ? (
              
              cards.map((card, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h2">
                        <strong>
                          {!card ? "Un-identified" : card.name[0]}{" "}
                        </strong>
                      </Typography>
                      <Typography>
                        {generateDescription(card)}{" "}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Grid item xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
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
        <AppBar id="Mac" position="relative" style={{ position: 'relative', backgroundColor: 'white',
        height: '350px',
        marginTop: '20px',
        backgroundImage: `url(${Macro})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        zIndex: 2}}>
          <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          }}
        />
          
              <Typography variant="h4" sx={{ color: 'white',
          marginTop: '35px',
          border: '2px solid white',
          padding: '10px',
          fontSize: '60px',
          fontWeight:'500',
          fontFamily:"Roboto, Sans-serif",
          paddingLeft:'30px',
          paddingRight:'30px',
          zIndex: 1}}>
                MACRO-NUTRIENTS
              </Typography>
           
        </AppBar>
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
                <PrettoSlider
                  valueLabelDisplay="auto"
                  aria-label="pretto slider"
                  value={topNutrients[new_card.type] || 0}
                  ValueLabelComponent={ValueLabelComponent}
                />
              </CardContent>
            </Card>
          ))}
        </Container>

        {/* Recommendations Section */}
        {conditions.map((cond, index) =>
          renderConditionSection(cond.key, cond.name, cond.image, index)
        )}
      </main>

    </ThemeProvider>
  );
}

function generateDescription(nutrient) {
  const sortedKeys = Object.keys(nutrient || {})
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
