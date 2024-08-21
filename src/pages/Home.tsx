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
} from "@mui/material";
import Emoji from "../components/Emoji";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import React from "react";
import {useGetEmojis} from "../queries/getEmoji";

function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [category, setCategory] = React.useState("animals and nature");
  const getEmojis = useGetEmojis();
  if (!getEmojis.data) {
    return <CircularProgress />;
  }
  return (
    <Container
      sx={{
        bgcolor: "white",
        p: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {xs: "column", md: "column", xl: "row"},
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Emoji htmlTag={getEmojis.data.htmlCode} />
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
            Category: Animals and nature
          </Typography>
          <Typography variant={isSmallScreen ? "h5" : "h4"}>
            Group: Animal mammal
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
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="Category"
          onChange={e => setCategory(e.target.value)}
        >
          <MenuItem value={"animals and nature"}>Animals and nature</MenuItem>
          <MenuItem value={"symbols"}>Symbols</MenuItem>
          <MenuItem value={"smileys and people"}>Smileys and people</MenuItem>
          <MenuItem value={"food and drink"}>Food and drink</MenuItem>
          <MenuItem value={"travel and places"}>Travel and places</MenuItem>
          <MenuItem value={"activities"}>Activities</MenuItem>
          <MenuItem value={"objects"}>Objects</MenuItem>
          <MenuItem value={"flags"}>Flags</MenuItem>
          <MenuItem value={"people and body"}>People and body</MenuItem>
        </Select>
        {/* <TextField label="group"></TextField> */}
      </Box>
      <Button
        variant="contained"
        color="primary"
        sx={{m: 3}}
        onClick={() => {
          getEmojis.refetch();
        }}
      >
        Generate new
      </Button>
    </Container>
  );
}

export default Home;
