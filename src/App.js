import './App.css';
import Navbar from './NavBar/navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing/Landing';
// import Footer from './Footer/Fotter';
import PoemPage from './Poem/PoemPage';
import Edit from './Edit/edit';
import Admin from './admin';
import { Context } from './Context';
import { API } from './api';
import { useEffect, useState } from 'react';

function App() {
  const [Data, setData] = useState([]); 

  useEffect(() => {
      fetch(API, { method: "Get" })
      .then(res => res.json())
      .then(res => setData(res));        
  }, []);
  

  return (
    <Context.Provider value={Data}>
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
