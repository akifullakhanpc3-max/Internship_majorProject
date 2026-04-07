import './App.css';
import Navbar from './Component/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Packages from './Component/Packages';
import Home from './Component/Home';
import Orders from './Component/Orders';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    <div >
      <Router>
      <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='orders' element={<Orders/>}></Route>
          <Route path='cart' element={<h1>this is cart component</h1>}></Route>
          <Route path='/packages' element={<Packages></Packages>}></Route>
          <Route path='/packages/:id' element={<h1>this is inner component </h1>}></Route>
          <Route path='*' element={<h1> 404 not found</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
