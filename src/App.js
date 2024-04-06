
import './App.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Movies from './components/Movies.js';
import HomePage from './pages/HomePage.jsx';
import MovieDetails from './pages/MovieDetails.jsx';
function App() {
  return (
    <BrowserRouter>
    
      <nav className = 'navbar'>
        <ul className='nav_list'>
            <li className='nav_items'>
              <Link to ="/"> Trang chu</Link>
            </li>
            <li className='nav_items'>
              <Link to ="/details"> Details</Link>
            </li>
        </ul>
        <ul className='nav_list'>
          <li className='nav_items'>
            <Link to ="/login"> Login</Link>
          </li>
          <li className='nav_items'>
            <Link to ="/register"> Register</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage>Home</HomePage>}/>
        <Route path="/details" element={<MovieDetails movieId={1011985}/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
