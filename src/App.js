
import './App.css';
import Home from './screens/Home';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/react-bootstrap/dist/react-bootstrap.js';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';

const App=()=> {
    return (
      <CartProvider>
        <Router>
          <Routes>
           <Route exact path="/" element={<Home/>}/>
           <Route exact path="/login" element={<Login/>}/>
           <Route exact path="/createuser" element={<Signup/>}/>
          </Routes>
        </Router>
        </CartProvider>  
    );
  }

export default App;
