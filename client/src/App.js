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
import SizePicker from './admin/components/SizePicker.js';
import ColorPicker from './admin/components/ColorPicker.js';
import Header from './admin/components/Header.js';
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
                    <Route path="/admin/Header" element={
                    <ProtectedRoute>
                        <Header/>
                    </ProtectedRoute>} />
                <Route path="/admin/marquee" element={
                    <ProtectedRoute>
                        <Marquee />
                    </ProtectedRoute>} />
                <Route path="/admin/shopcategories" element={
                    <ProtectedRoute>
                        <ShopCategories />
                    </ProtectedRoute>} /> 
                <Route path="/admin/bestseller" element={
                    <ProtectedRoute>
                        <BestSeller />
                    </ProtectedRoute>} />  
                    <Route path="/admin/size-picker" element={
                    <ProtectedRoute>
                        <SizePicker />
                    </ProtectedRoute>} /> 
                    <Route path="/admin/color-picker" element={
                    <ProtectedRoute>
                        <ColorPicker />
                    </ProtectedRoute>} />
                    <Route path="/admin/header" element={
                    <ProtectedRoute>
                        <Header />
                    </ProtectedRoute>} />
                <Route path="/admin" element={<Login />} />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </Router>

    );
}

export default App;