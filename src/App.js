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
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/poem' element={<PoemPage />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
