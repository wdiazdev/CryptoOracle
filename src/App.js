import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./styles.css";
import Header from "./components/Header";
import HomePage from "./Pages/HomePage";
import CoinPage from "./Pages/CoinPage";
import { makeStyles } from "@material-ui/core";

export default function App() {

  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: "#111",
      color: "#fff",
      minHeight: "100vh",
      fontFamily: "Montserrat",
    }
  }));

  const classes = useStyles()

  return (

    // BrowserRouter 
    <HashRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/coins/:id" element={<CoinPage />} />
        </Routes>
      </div >
    </HashRouter>
  );
}

