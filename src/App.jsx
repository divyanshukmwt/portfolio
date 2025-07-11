import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import './index.css';

// ✅ Lazy load route components
const Page = lazy(() => import('./components/Page'));
const About = lazy(() => import('./components/About'));
const Work = lazy(() => import('./components/Work'));
const Contact = lazy(() => import('./components/Contact'));
const Nav = lazy(() => import('./components/nav'))

const App = () => {
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return () => {
    lenis.destroy();
  };
}, []);


  return (
    <Router>
      <Nav />

      {/* ✅ Suspense fallback shown while lazy components load */}
      <Suspense fallback={<div className="text-white w-full h-full flex items-center justify-center p-10">Loading...</div>}>
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
