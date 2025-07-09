import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

const Contact = () => {
  const sectionRef = useRef(null)
  const emojiRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    console.log('Form submitted:', formData)

    setFormData({
      name: '',
      email: '',
      message: '',
    })
  }

  useEffect(() => {
    const items = sectionRef.current.querySelectorAll('.contact-item')

    gsap.from(items, {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 1,
      ease: 'power2.inOut',
    })
  }, [])
  const socialLinks = [
    {
      icon: <i className="ri-github-fill mr-2"></i>,
      label: 'GitHub',
      href: 'https://github.com/divyanshukmwt',
    },
    {
      icon: <i className="ri-linkedin-box-fill mr-2" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/divyanshu-kmwt/',
    },
    {
      icon: <i className="ri-instagram-line mr-2" />,
      label: 'Instagram',
      href: 'https://www.instagram.com/divyanshu_kmwt',
    },
    {
      icon: <i className="ri-twitter-x-line mr-2" />,
      label: 'Twitter (X)',
      href: 'https://x.com/divyanshu_kmwt_',
    },
  ]

  return (
    <div
      ref={sectionRef}
      id="contact"
      className="bg-[#101010] text-white min-h-screen w-full px-4 py-20 flex items-center justify-center"
    >
      <div className="w-full max-w-6xl flex flex-col md:flex-row gap-12 md:gap-20">
        {/* Left Side */}
        <div className="flex flex-col gap-4 w-full md:w-1/2 contact-item">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            Let’s Connect <span ref={emojiRef}><i class="ri-links-line"></i></span>
          </h2>
          <p className="text-gray-400 mb-6">
            Available for freelance, collaborations, or just tech talk!
          </p>

          <p className="text-white font-medium"><i class="ri-mail-fill"></i> officialdivyanshu18@gmail.com</p>
          <p className="text-white font-medium"><i class="ri-phone-fill"></i> +91 63764 20136</p>

          {socialLinks.map((item, i) => (
            <a
              key={i}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative inline-block px-6 py-3 font-medium border-2 border-zinc-500 text-zinc-400 bg-[#101010] rounded-md group overflow-hidden transition-transform transform hover:scale-105 hover:text-black duration-300"
            >
              <span className="relative z-10 flex items-center duration-300 gap-2">
                {item.icon}
                {item.label}
              </span>

              <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0" />
            </a>
          ))}
        </div>

        <form className="flex flex-col gap-4 w-full md:w-1/2 contact-item">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-[#1a1a1a] border border-white/10 text-white p-3 rounded outline-none focus:border-zinc-200 transition-all"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-[#1a1a1a] border border-white/10 text-white p-3 rounded outline-none focus:border-zinc-200 transition-all"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className="resize-none bg-[#1a1a1a] border border-white/10 text-white p-3 rounded outline-none focus:border-zinc-200 transition-all"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="relative inline-block px-6 py-3 font-medium border-2 border-zinc-300 text-zinc-100 bg-[#101010] rounded-md group overflow-hidden hover:text-black duration-300"
          >
            <span className="relative z-10">Send Message <i class="ri-send-plane-fill"></i></span>
            <span className="absolute inset-0 bg-white scale-y-0 origin-bottom transition-transform duration-300 ease-in-out group-hover:scale-y-100 z-0" />

          </button>
        </form>
      </div>
    </div>
  )
}

export default Contact
