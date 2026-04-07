import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Booking from './Components/Booking';
import AdminNav from './Components/AdminNav';
import Dashboard from './Components/Dashboard';
import Package from './Components/Package';
import PackageItem from './Components/PackageItem';
import Customization from './Components/Customization';
import CreatePackage from './Components/CreatePackage';
import Login from './Components/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Payment from './Components/Payment';
function Layout() {
  return (
    <div>
      <ProtectedRoute>
      <AdminNav />
      <Routes>
        {/* Login WITHOUT navbar */}
        <Route path='/' element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/package" element={<Package />} />
        <Route path="/package/:id" element={<PackageItem />} />
        <Route path="/customization" element={<Customization />} />
        <Route path="/create-package" element={<CreatePackage />} />
        <Route path='/payment' element={<Payment/>}></Route>
      </Routes>
    </ProtectedRoute>
    </div>
    
  );
}
function App() {
  //const isLoggedIn = false; // Replace with actual authentication logic

  return (
    <Router>
      <Routes>
        
        <Route path="/login" element={<Login />} />

        {/* All other pages WITH navbar */}
        <Route path="/*" element={<Layout />} />

        {/* fallback */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;