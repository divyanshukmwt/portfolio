import React from 'react';

const About = () => {

  return (
    <div className="w-full flex bg-[#101010] text-white">

      <div className="w-1/2 h-screen sticky top-0 flex items-center justify-center">
        <img
          src="/img1.jpg" 
          alt="About"
          className="w-[80%] h-[80%] object-cover rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.15)]"
        />
      </div>

<div className="w-1/2 overflow-y-auto px-10 py-12 space-y-20 scrollbar-hide">

        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Bio</h2>
          <p className="text-gray-300 leading-relaxed">
            Hey, I’m Divyanshu Kumawat—a passionate web developer currently diving deep into the MERN stack (MongoDB, Express, React, Node.js). As part of the Sheryians Job Ready AI-Powered Cohort, I’m actively sharpening my frontend and backend development skills along with DSA and problem-solving. I’m also exploring the creative side of web development through animation and interaction libraries like GSAP, Framer Motion, Lenis, and Locomotive Scroll to craft smooth, engaging digital experiences. My goal is to become a full-stack developer who builds impactful, real-world projects—and this is just the beginning.
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Experience</h2>
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
            <li>Frontend Intern – ABC Corp (2024)</li>
            <li>Developed responsive UI with React & Tailwind</li>
            <li>Collaborated with designers for pixel-perfect outputs</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-3 text-sm">
            {['HTML', 'CSS', 'JavaScript', 'React', 'Tailwind CSS', 'Node.js', 'MongoDB', 'Three.js', 'Spline'].map(skill => (
              <span
                key={skill}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Academics</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="text-xl font-semibold text-white">B.Tech in Computer Science</h3>
              <p className="text-sm">XYZ University — 2021 - 2025</p>
              <p className="text-sm">CGPA: 8.6/10</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Class 12 – CBSE</h3>
              <p className="text-sm">ABC School — 2019 - 2021</p>
              <p className="text-sm">Percentage: 92%</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white">Class 10 – CBSE</h3>
              <p className="text-sm">ABC School — 2017 - 2019</p>
              <p className="text-sm">Percentage: 89%</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-white mb-4">Certifications</h2>
          <ul className="list-disc pl-5 text-gray-300 space-y-2">
            <li>Responsive Web Design – freeCodeCamp</li>
            <li>JavaScript Algorithms – freeCodeCamp</li>
            <li>Full Stack Bootcamp – Sheryians Coding School</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default About;
