import React, { useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ProductPanel from "./pages/ProductPanel";
import Recap from "./pages/Recap";
import "./App.css";
import { ContextProvider } from "./context/AppContext";
function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <Routes>
          <Route path="/" element={<ProductPanel />} />
          <Route path="/Recap" element={<Recap />} />
        </Routes>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
