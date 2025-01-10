import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import ProtectedRoute from './ProtectedRoute.js';
import Admin from './admin/pages/Dashboard.js';
import Login from './admin/pages/Login.js';
import Banner from './admin/components/Banner.js';
import Marquee from './admin/components/Marquee.js';
import ShopCategories from './admin/components/ShopCategories.js';
import BestSeller from './admin/components/BestSeller.js';
import ManageProducts from './admin/components/ManageProducts.js';

function App() {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/admin/dashboard" element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>} />
                <Route path="/admin/banner" element={
                    <ProtectedRoute>
                        <Banner />
                    </ProtectedRoute>} />
                <Route path="/admin/marquee" element={
                    <ProtectedRoute>
                        <Marquee />
                    </ProtectedRoute>} />
                <Route path="/admin/shopcategories" element={
                    <ProtectedRoute>
                        <ShopCategories />
                    </ProtectedRoute>} /> 
                <Route path="/admin/manageproducts" element={
                    <ProtectedRoute>
                        <ManageProducts />
                    </ProtectedRoute>} /> 
                              
                <Route path="/admin" element={<Login />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>

    );
}

export default App;