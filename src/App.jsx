import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import Nav from './components/nav';
import './index.css';

// ✅ Lazy load route components
const Page = lazy(() => import('./components/Page'));
const About = lazy(() => import('./components/About'));
const Work = lazy(() => import('./components/Work'));
const Contact = lazy(() => import('./components/Contact'));

const App = () => {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <Router>
      <Nav />

      {/* ✅ Suspense fallback shown while lazy components load */}
      <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
