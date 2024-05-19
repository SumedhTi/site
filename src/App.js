import './App.css';
import Navbar from './NavBar/navbar';
import { Route, Routes } from 'react-router-dom';
import Landing from './Landing/Landing';
// import Footer from './Footer/Fotter';
import PoemPage from './Poem/PoemPage';

function App() {


  return (
    <div className="App">
      <Navbar />
      <Routes basename="/site/">
        <Route path='/site' element={<Landing />} />
        <Route path='/site/poem' element={<PoemPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
