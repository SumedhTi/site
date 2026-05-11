import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchData } from "./dataHandeler/dataHandeler";
import Index from "./pages/Index";
import Entry from "./pages/Entry";

function App() {
  return (
    <div className="App">
      <Routes basename="/site/">
        <Route path="/site" element={<Index />} />
        <Route path="/site/entry/:id" element={<Entry />} />
      </Routes>
    </div>
  );
}

export default App;
