import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import { ThemeProvider } from "@material-ui/core";
import { theme } from "./theme";
import Navbar from "./components/layouts/Navbar";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
