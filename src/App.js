import "./App.css";
import Navbar from "./NavBar/navbar";
import { Route, Routes } from "react-router-dom";
import Landing from "./Landing/Landing";
// import Footer from './Footer/Fotter';
import PoemPage from "./Poem/PoemPage";
import Edit from "./Edit/edit";
import Admin from "./admin";
import { Context } from "./Context";
import { useEffect, useState } from "react";
import { API } from "./mongo";

function App() {
  const [PoemData, setPoemData] = useState([]);
  const [WritingData, setWritingData] = useState([]);

  async function fetchData() {
    fetch(API + "getAll", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if(res.ok){
          return res.json()
        } 
      })
      .then((res) => {
        setPoemData(res.poems);
        setWritingData(res.writings)
      });
  }

  useEffect(() => {
    fetchData();
    console.log("fetcing");
  }, []);

  return (
    <Context.Provider
      value={{ PoemData, WritingData, setPoemData, setWritingData }}
    >
      <div className="App">
        <Navbar />
        <Routes basename="/site/">
          <Route path="/site" element={<Landing />} />
          <Route path="/site/poem" element={<PoemPage />} />
          <Route path="/site/add" element={<Edit />} />
          <Route path="/site/admin" element={<Admin />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Context.Provider>
  );
}

export default App;
