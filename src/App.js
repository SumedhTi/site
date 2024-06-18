import './App.css';
import Navbar from './NavBar/navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing/Landing';
// import Footer from './Footer/Fotter';
import PoemPage from './Poem/PoemPage';
import Edit from './Edit/edit';
import Admin from './admin';
import { Context } from './Context';
import { useEffect, useState } from 'react';
import { getAllData, getToken } from './mongo';

function App() {
  const [PoemData, setPoemData] = useState([]); 
  const [WritingData, setWritingData] = useState([]);
  const [token, setToken] = useState("");
  
  async function Token(){
    return getToken().then((a) => {setToken(a.access_token); return a.access_token});
  }


  async function fetchData(token){
    getAllData(token, "poem").then((a) => {
      setPoemData(a.documents);
    })
    getAllData(token, "writing").then((a) => {
      setWritingData(a.documents);
    })
  }

  useEffect(() => {
      Token().then((t) => {
        fetchData(t);
      })
      console.log("fetcing");
  },[])
  

  return (
    <Context.Provider value={{PoemData, WritingData, token, setPoemData, setWritingData}}>
      <div className="App">
        <Navbar />
        <Routes basename="/site/">
          <Route path='/site' element={<Landing />} />
          <Route path='/site/poem' element={<PoemPage />} />
          <Route path='/site/add' element={<Edit />} />
          <Route path='/site/admin' element={<Admin />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Context.Provider>
  );
}

export default App;
