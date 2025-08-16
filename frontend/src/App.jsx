import { useState, useEffect, useRef } from 'react'
import './App.css' 
import { gsap } from 'gsap';
import logo from './assets/logo.png';
import Nav from './components/Navbar.jsx';
import AnimButton from './components/AnimButton.jsx';
import Footer from './components/Footer.jsx';
import LandingPage from './components/LandingPage.jsx';
import Lenis from '@studio-freight/lenis';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Dashboard from './components/Dashboard.jsx';
import Enterprise from './components/Enterprise.jsx';
import DownloadPage from './components/DownloadPage.jsx';
import NotFound from './components/NotFound.jsx';

function App() {
    useEffect(() => {
    const lenis = new Lenis();

    const animate = (time) => {
      lenis.raf(time);
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => lenis.destroy();
  }, []);

  return (
  <>
  <Nav />
  <Routes>
    <Route path='/' element={<LandingPage/>} />
    <Route path='/temp' element={<p className='mt-[60px] text-white'>check</p>} />
    <Route path='/authentication' element={<Auth />} />
    <Route path='/user/dashboard' element={<Dashboard />}/>
    <Route path='/pricing' element={<Enterprise />} />
    <Route path='/download/:id' element={<DownloadPage/>} />
    <Route path='*' element={<NotFound/>}/>
  </Routes>
  <Footer />
  </>
  )
}

export default App
