import React, { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';

const Spline = lazy(() => import('@splinetool/react-spline'));

const Page = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-[#101010] relative overflow-hidden">
      <Suspense fallback={<div className="text-gray-500 text-xl p-4">Loading 3D Scene...</div>}>
        <Spline scene="https://prod.spline.design/lrlv9L-GgETbzd1i/scene.splinecode" />
      </Suspense>

      {/* Redirect Button */}
      <div className="absolute bottom-5 right-5 z-5">
        <button
          onClick={() => navigate('/about')}
          className="bg-[#101010] text-zinc-200 font-bold text-sm px-8 border-2 border-zinc-500 rounded-xl py-2 shadow-md hover:scale-105 transition"
        >
          About Me ?
        </button>
      </div>
    </div>
  );
};

export default React.memo(Page);
