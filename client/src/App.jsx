import "./App.css";
import Navbar from "./Component/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Packages from "./Component/Packages";
import Home from "./Component/Home";
import Orders from "./Component/Orders";
import PackageDetails from "./Component/PackageDetails";
import Login from "./Component/Login";
import SignUp from "./Component/SignUp";
import Cart from "./Component/Cart";

function App() {
  return (
    <div>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="orders" element={<Orders />}></Route>
          <Route path="cart" element={<h1>this is cart component</h1>}></Route>
          <Route path="/packages" element={<Packages></Packages>}></Route>
          <Route path="/package/:id" element={<PackageDetails />}></Route>
          <Route path="*" element={<h1> 404 not found</h1>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
