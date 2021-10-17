import React, { useEffect } from "react";
import Footer from "./modules/basicsForPage/footer";
import Navbar from "./modules/basicsForPage/navbar";
import Routes from "./modules/routes/routes";

import "./app.css";
import { useAppDispatch } from "./data/hooks";

function App() {
  return (
    <>
      <Navbar />
      <Routes />
      <Footer />
    </>
  );
}

export default App;
