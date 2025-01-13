import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Movies } from './pages/Movies';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="header">
        <div className="app-title">action!</div>
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;