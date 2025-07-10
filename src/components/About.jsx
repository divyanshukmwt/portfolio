import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionsRef = useRef([]);

  useEffect(() => {
    sectionsRef.current.forEach((el, i) => {
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease:"power1.inOut",
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
            },
          }
        );
      }
    });
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
    <div className="w-full bg-[#101010] text-white">
      {/* Hero Section */}
      <div className="w-full h-screen flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">WHO AM I ?</h1>
      </div>

      {/* Image + Bio Section */}
      <div
        ref={(el) => (sectionsRef.current[0] = el)}
        className="w-full flex flex-col md:flex-row px-6 md:px-20 py-20 gap-12 items-center"
      >
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/img1.jpg"
            alt="About"
            className="w-[80%] object-[0%_30%] md:w-full h-[400px] object-cover rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          />
        </div>
        <div className="w-full md:w-1/2 space-y-6">
          <h2 className="text-4xl font-bold text-center md:text-left">A Little About Me</h2>
          <p className="text-gray-300 leading-relaxed text-lg">
            Hey, I’m Divyanshu Kumawat — a passionate web developer exploring the MERN stack. I'm part of the Sheryians Coding School, sharpening my full-stack skills and problem-solving. I love adding life to the web using animation tools like GSAP and Framer Motion. My goal? Build smooth, impactful, real-world projects — and I’m just getting started.
          </p>
        </div>
      </div>

      {/* Experience */}
      <div
        ref={(el) => (sectionsRef.current[1] = el)}
        className="w-full px-6 md:px-20 py-20 space-y-6"
      >
        <h2 className="text-4xl font-bold text-center">What I’ve Been Working On</h2>
        <ul className="list-disc pl-6 md:pl-12 text-gray-300 text-lg space-y-2 max-w-3xl mx-auto">
          <li>Created frontend projects like portfolios and landing pages</li>
          <li>Learning backend with Express, MongoDB & APIs</li>
          <li>Exploring modern tools like Framer-motion, Spline, and GSAP</li>
          <li>Actively improving problem-solving through DSA practice</li>
        </ul>
      </div>

      {/* Skills */}
      <div
        ref={(el) => (sectionsRef.current[2] = el)}
        className="w-full px-6 md:px-20 py-20 space-y-6"
      >
        <h2 className="text-4xl font-bold text-center">Stack & Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {skills.map(({ label, icon }, i) => (
            <div key={i} className="flex items-center gap-2 text-white px-4 py-2 rounded-full">
              <img src={icon} alt={label} className="w-20 h-20 object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div
        ref={(el) => (sectionsRef.current[3] = el)}
        className="w-full px-6 md:px-20 py-20 space-y-6"
      >
        <h2 className="text-4xl font-bold text-center">My Education & Learning Journey</h2>
        <div className="space-y-6 text-gray-300 text-lg max-w-3xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold text-white">B.Tech in Computer Science</h3>
            <p>XYZ University — 2021 - 2025</p>
            <p>CGPA: 8.6/10</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Class 12 – CBSE</h3>
            <p>ABC School — 2019 - 2021</p>
            <p>Percentage: 92%</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white">Class 10 – CBSE</h3>
            <p>ABC School — 2017 - 2019</p>
            <p>Percentage: 89%</p>
          </div>
        </div>
      </div>

      {/* Certifications */}
      <div
        ref={(el) => (sectionsRef.current[4] = el)}
        className="w-full h-full px-6 md:px-20 py-20 space-y-6"
      >
        <h2 className="text-4xl font-bold text-center">Courses That Boosted My Skills 📚</h2>
        <ul className="list-disc pl-6 md:pl-12 text-gray-300 text-lg space-y-2 max-w-3xl mx-auto">
          <li>Responsive Web Design – freeCodeCamp</li>
          <li>JavaScript Algorithms – freeCodeCamp</li>
          <li>Full Stack Bootcamp – Sheryians Coding School</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
