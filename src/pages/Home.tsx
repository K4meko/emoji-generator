import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
  Select,
  MenuItem,
  CircularProgress,
  FormControl,
  InputLabel,
  Paper,
} from "@mui/material";
import Emoji from "../components/Emoji";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import {useState} from "react";
import MenuIcon from "@mui/icons-material/Menu";
import {useGetEmojisCategory} from "../queries/getEmoji";
import {Favorite} from "@mui/icons-material";
import FavouriteBar from "../components/Sidebar";

function Home() {
  const theme = useTheme();
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [category, setCategory] = React.useState("random");
  const getEmojisCategory = useGetEmojisCategory(category);
  // if (!getEmojisCategory.data) {
  //   return <CircularProgress />;
  // }
  return (
    <Box sx={{position: "relative"}}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
          marginLeft: "2vw",
        }}
      >
        {isSideBarOpen ? (
          <Box
            sx={{
              "&::after": {
                content: '""',
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                width: "20px", // Adjust the width as needed
                background: "linear-gradient(to left, white, transparent)", // Adjust the colors as needed
                pointerEvents: "none", // Ensure it doesn't block interactions
              },
            }}
          >
            <FavouriteBar />
          </Box>
        ) : (
          <MenuIcon
            sx={{fontSize: 40}}
            onClick={() => setIsSideBarOpen(true)}
          />
        )}
      </Box>
      <Container
        sx={{
          bgcolor: "white",
          paddingBottom: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          flexDirection: "column",
          height: "98vh",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: {xs: "column", md: "row", xl: "row"},
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}
        >
          {getEmojisCategory.isLoading ? (
            <Paper
              elevation={4}
              sx={{
                p: 1,
                width: "160px",
                height: "190px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Paper>
          ) : (
            <Emoji
              htmlTag={getEmojisCategory.data.htmlCode}
              category={getEmojisCategory.data.category}
            />
          )}

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              height: "20%",
              alignItems: "start",
            }}
          >
            {" "}
            <Typography variant={isSmallScreen ? "h5" : "h4"}>
              {getEmojisCategory.data
                ? "Category: " +
                  getEmojisCategory.data.category.charAt(0).toUpperCase() +
                  getEmojisCategory.data.category.slice(1)
                : "Loading..."}
            </Typography>
            <Typography variant={isSmallScreen ? "h5" : "h4"}>
              {getEmojisCategory.data
                ? "Group: " +
                  getEmojisCategory.data.group.charAt(0).toUpperCase() +
                  getEmojisCategory.data.group.slice(1)
                : "Loading..."}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <FormControl>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Category"
              value={category}
              placeholder="Select category"
              onChange={e => setCategory(e.target.value)}
            >
              <MenuItem value={"random"}>All categories</MenuItem>
              <MenuItem value={"animals-and-nature"}>
                Animals and nature
              </MenuItem>
              <MenuItem value={"symbols"}>Symbols</MenuItem>
              <MenuItem value={"smileys-and-people"}>
                Smileys and people
              </MenuItem>
              <MenuItem value={"food-and-drink"}>Food and drink</MenuItem>
              <MenuItem value={"travel-and-places"}>Travel and places</MenuItem>
              <MenuItem value={"activities"}>Activities</MenuItem>
              <MenuItem value={"objects"}>Objects</MenuItem>
              <MenuItem value={"flags"}>Flags</MenuItem>
            </Select>
          </FormControl>
          {/* <TextField label="group"></TextField> */}
        </Box>
        <Button
          variant="contained"
          color="primary"
          sx={{m: 3, width: "160px"}}
          onClick={() => {
            getEmojisCategory.refetch();
          }}
        >
          Generate new
        </Button>
      </Container>
    </Box>
  );
}

export default Home;
