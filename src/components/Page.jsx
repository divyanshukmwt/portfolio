import React, { lazy, Suspense } from 'react';

// ✅ Lazy load the Spline component
const Spline = lazy(() => import('@splinetool/react-spline'));

const Page = () => {
  return (
    <div className="w-full h-screen flex items-center bg-[#101010] relative">
      <Suspense fallback={<div className="text-gray-700 text-xl">Loading 3D Scene...</div>}>
        <Spline scene="https://prod.spline.design/lrlv9L-GgETbzd1i/scene.splinecode" />
      </Suspense>
    </div>
  );
};

export default React.memo(Page);