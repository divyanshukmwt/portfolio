import React, { lazy, Suspense, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Spline = lazy(() => import('@splinetool/react-spline'));

const Page = () => {
  const navigate = useNavigate();
  const splineWrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const handleSplineLoad = () => {

    gsap.to(splineWrapperRef.current, {
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    gsap.to(buttonRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  }, []);

  return (
    <div className="w-full h-screen bg-[#101010] relative overflow-hidden">
      <Suspense fallback={<div className="text-gray-500 text-xl w-full h-full flex items-center justify-center p-4">Loading 3D Scene...</div>}>
        <div
          ref={splineWrapperRef}
          className="w-full h-full opacity-0 transition-opacity duration-1000"
        >
          <Spline
            scene="https://prod.spline.design/lrlv9L-GgETbzd1i/scene.splinecode"
            onLoad={handleSplineLoad}
          />
        </div>
      </Suspense>

      <div className="absolute bottom-5 right-5 z-6 opacity-0" ref={buttonRef}>
        <button
          onClick={() => navigate('/about')}
          className="bg-[#101010] text-zinc-300 font-bold text-sm px-8 border-2 border-zinc-700 rounded-xl py-2 shadow-md transition hover:bg-white hover:text-black hover:scale-105 duration-500"
        >
          About Me ?
        </button>
      </div>
    </div>
  );
};

export default React.memo(Page);


