import React, { lazy, Suspense, useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

const Spline = lazy(() => import('@splinetool/react-spline'));

const Page = () => {
  const navigate = useNavigate();
  const splineWrapperRef = useRef(null);
  const buttonRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [loadingDone, setLoadingDone] = useState(false);

  const loaderRef = useRef(null);
  const progressBarRef = useRef(null);
  const loadingIntervalRef = useRef(null);

  useEffect(() => {
    let current = 0;
    loadingIntervalRef.current = setInterval(() => {
      if (current < 100) {
        current += 1;
        setProgress(current);
        gsap.to(progressBarRef.current, {
          width: `${current}%`,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (current >= 100) {
        clearInterval(loadingIntervalRef.current);
      }
    }, 40);
  }, []);

  const handleSplineLoad = () => {
    setSplineLoaded(true);
    gsap.to(splineWrapperRef.current, {
      opacity: 1,
      duration: 1.5,
      ease: 'power2.out',
    });
  };

  useEffect(() => {
    if (progress === 100 && splineLoaded) {
      gsap.to(loaderRef.current, {
        y: -850,
        duration: 1,
        ease: 'power2.inOut',
        onComplete: () => setLoadingDone(true),
      });

    }
  }, [progress, splineLoaded]);

  useEffect(() => {
    gsap.to(buttonRef.current, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out',
      delay: 1,
    });
  }, []);

  return (
    <div className="w-full h-screen bg-[#101010] relative overflow-hidden">

      {!loadingDone && (
        <div
          ref={loaderRef}
          className="absolute inset-0 z-[9999] bg-[#101010] flex items-end justify-center pointer-events-none"
        >
          <div className="w-full flex items-center justify-between p-4 md:px-10 pb-6 gap-4">
            <div className="w-full h-[2px] bg-zinc-800 relative overflow-hidden rounded-full">
              <div
                ref={progressBarRef}
                className="absolute top-0 left-0 h-full bg-white transition-all"
                style={{ width: '0%' }}
              />
            </div>
            <div className="text-white font-[font7] text-sm md:text-base font-medium min-w-[50px] text-right">
              {progress}%
            </div>
          </div>
        </div>
      )}

      <Suspense fallback={<></>}>
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

      <div className="absolute bottom-5 right-5 z-5 opacity-0" ref={buttonRef}>
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
