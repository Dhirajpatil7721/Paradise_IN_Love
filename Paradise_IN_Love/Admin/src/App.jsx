import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Dashboard from './Components/Dashboard';
import Orders from './Components/Orders';
import AddProduct from './Components/AddProduct';
import Customers from './Components/Customers';

import HelpCenter from './Components/HelpCenter';
import Logout from './Components/Logout';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/logout" element={<Logout/>} />
        <Route path="/help-center" element={<HelpCenter/>} />
        {/* <Route path="/filter" element={<FilterPage/>} /> */}
       
      </Routes>
    </Router>
  );
};

export default App;
