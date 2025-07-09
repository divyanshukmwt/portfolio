import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const Work = () => {
  const containerRef = useRef(null)

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll('.fade-in')

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)',
      },
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.2, // Link appears slightly after heading
      }
    )
  }, [])

  return (
    <div
      ref={containerRef}
      className='bg-[#101010] flex flex-col items-center justify-center text-white h-screen w-full px-4 text-center'
    >
      <h1 className='fade-in text-[2.5rem] md:text-[3rem] max-w-3xl font-bold leading-tight tracking-wide glow-text'>
        Still cooking the code — <br />
        real projects coming soon!
      </h1>

      <a
        href='https://github.com/divyanshukmwt'
        target='_blank'
        rel='noopener noreferrer'
        className='fade-in mt-6 text-[#fdfffe] hover:underline text-lg tracking-wide'
      >
        Check out my progress on GitHub
      </a>
    </div>
  )
}

export default Work
