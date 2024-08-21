import {useState} from "react";
import Home from "./pages/Home";
import Emoji from "./components/Emoji";
import {Container} from "@mui/material";

function App() {
  return (
    <>
      <Container>
        <Home></Home>
      </Container>
    </>
  );
}

export default App;
