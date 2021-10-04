
import { BrowserRouter as Router } from "react-router-dom";

import './App.css';
import Navbar from './components/Navbar';
import Footer from "./components/Footer";
import Main from "./components/Main/Main";


function App() {
  return (
    <Router>
      <Navbar />
      <Main />
      <Footer />
    </Router>
  );
}

export default App;
