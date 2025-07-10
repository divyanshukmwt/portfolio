import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
useEffect(() => {
  gsap.utils.toArray(".section").forEach((section) => {
    const children = section.querySelectorAll(".fade-child");
    gsap.from(children, {
      opacity: 0,
      y: 40,
      duration: 0.5,
      ease: "power2.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });
  });

  const cursor = document.getElementById("custom-cursor");
  let timeout;

  const moveCursor = (e) => {
    if (!cursor) return;

    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      scale: 3,
      duration: 0.2,
      ease: "power3.out",
    });

    clearTimeout(timeout);

    timeout = setTimeout(() => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }, 400);
  };

  window.addEventListener("mousemove", moveCursor);

  return () => {
    window.removeEventListener("mousemove", moveCursor);
    clearTimeout(timeout);
  };
}, []);


  const skills = [
    { label: 'HTML', icon: '/icons/html.png' },
    { label: 'CSS', icon: '/icons/css.png' },
    { label: 'JavaScript', icon: '/icons/js.png' },
    { label: 'React', icon: '/icons/react.png' },
    { label: 'Tailwind CSS', icon: '/icons/tailwind.png' },
    { label: 'Node.js', icon: '/icons/node.png' },
    { label: 'SCSS', icon: '/icons/sass.png' },
    { label: 'C', icon: '/icons/Gsap.png' },
    { label: 'C++', icon: '/icons/framer.png' },
  ];

  return (
    <div className="w-full bg-[#101010] text-white relative overflow-hidden select-none">
      
      <div className="w-full h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 ">WHO AM I ?</h1>
      </div>

      <div className="section w-full flex flex-col md:flex-row px-6 md:px-20 py-20 gap-12 items-center">
        <div className="w-full md:w-1/2 flex justify-center fade-child">
          <img
            src="/img1.jpg"
            alt="About"
            className="w-[80%] object-[0%_30%] md:w-full h-[400px] object-cover rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-center md:text-left fade-child ">A Little About Me</h2>
          <p className="text-gray-300 leading-relaxed text-lg fade-child ">
            Hey, I’m Divyanshu Kumawat — a passionate web developer exploring the MERN stack. I'm part of the Sheryians Coding School, sharpening my full-stack skills and problem-solving. I love adding life to the web using animation tools like GSAP and Framer Motion. My goal? Build smooth, impactful, real-world projects — and I’m just getting started.
          </p>
        </div>
      </div>

      <div className="section w-full px-6 md:px-20 py-20 space-y-6">
        <h2 className="text-4xl font-bold text-center fade-child ">What I’ve Been Working On</h2>
        <ul className="fade-child list-disc pl-6 md:pl-12 text-gray-300 text-lg space-y-2 max-w-3xl mx-auto">
          <li className="">Created frontend projects like portfolios and landing pages</li>
          <li className="">Learning backend with Express, MongoDB & APIs</li>
          <li className="">Exploring modern tools like Framer-motion, Spline, and GSAP</li>
          <li className="">Actively improving problem-solving through DSA practice</li>
        </ul>
      </div>

      <div className="section w-full px-6 md:px-20 py-10 space-y-6">
        <h2 className="text-4xl font-bold text-center fade-child ">Stack & Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {skills.map(({ label, icon }, i) => (
            <div key={i} className="fade-child flex items-center gap-2 text-white px-4 py-2 rounded-full">
              <img src={icon} alt={label} className="w-20 h-20 object-contain" />
            </div>
          ))}
        </div>
      </div>

      <div className="section w-full px-6 md:px-20 py-20 space-y-6">
        <h2 className="text-4xl font-bold text-center fade-child ">My Education & Learning Journey</h2>
        <div className="space-y-6 text-gray-300 text-lg max-w-3xl mx-auto">
          <div className="fade-child">
            <h3 className="text-xl font-semibold text-white ">Bachelor of Computer Applications (BCA)</h3>
            <p className=''>Maharshi Arvind School of Management Studies — 2024 - 2026</p>
            <p className=''>Pursuing • Expected Graduation: 2026</p>
          </div>
          <div className="fade-child">
            <h3 className="text-xl font-semibold text-white ">Class 12 – RBSE</h3>
            <p className=''>Noble Kingdom Public School — 2021 - 2022</p>
            <p className=''> Percentage: 72%</p>
          </div>
          <div className="fade-child">
            <h3 className="text-xl  font-semibold text-white">Class 10 – RBSE</h3>
            <p className=''>Akshar Dham Academy — 2007 - 2020</p>
            <p className=''>Percentage: 72%</p>
          </div>
        </div>
      </div>

      <div className="section w-full h-full px-6 md:px-20 py-20 space-y-6">
        <h2 className="text-4xl font-bold text-center fade-child ">Courses That Boosted My Skills</h2>
        <ul className="fade-child list-disc pl-6 md:pl-12 text-gray-300 text-lg space-y-2 max-w-3xl mx-auto">
          <li className="">Full Stack Cohort – Sheryians Coding School</li>
        </ul>
      </div>

      <div
        id="custom-cursor"
        className="fixed top-0 left-0 w-5 h-5 rounded-full bg-white mix-blend-difference pointer-events-none z-5 transition-transform duration-200 ease-out"
      />
    </div>
  );
};

export default About;
