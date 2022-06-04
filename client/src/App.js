import './App.css';
import  { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Contactus from './pages/contactus';
import Offres from './pages/offres';
import JobDetails from './pages/JobDetails';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/offres" element={<Offres />} />
          <Route path="/offres/:id" element={<JobDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
