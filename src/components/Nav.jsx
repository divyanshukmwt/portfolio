import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from 'react-router-dom';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const titlesRef = useRef([]);
    const underlineRef = useRef([]);

    const menuItems = [
        { label: 'Home', path: '/' },
        { label: 'About', path: '/about' },
        { label: 'Work', path: '/work' },
        { label: 'Contact', path: '/contact' }
    ];

    useEffect(() => {
        const tl = gsap.timeline();
        if (isOpen) {
            tl.to(".navpage", {
                height: "100vh",
                duration: 0.6,
                ease: "power1.inOut",
            });
            tl.from(".navpageh1", {
                y: 100,
                duration: 0.5,
                delay: 0.2,
                ease: "power1.inOut",
                stagger: 0.2,
            }, "-=0.5")
            tl.from(".navbaricons", {
                scale: 0,
                duration: 0.8,
                stagger: 0.1,
            }, "-=1")
            tl.from("#navbarh3", {
                y: 50,
                duration: 0.7,
                ease: "power1.inOut",
                stagger: 0.2
            }, "-=1")
            tl.from("#navbarh2", {
                y: 50,
                duration: 0.7,
                ease: "power1.inOut",
                stagger: 0.2
            }, "-=1.01")
        } else {
            tl.to(".navpage", {
                height: "0vh",
                duration: 0.6,
                ease: "power1.inOut",
            });
        }
    }, [isOpen]);
    const handleMouseEnter = (index) => {
        gsap.set(underlineRef.current[index], { transformOrigin: 'left' });
        gsap.to(underlineRef.current[index], {
            scaleX: 1,
            duration: 0.4,
            ease: 'power2.out',
        });

        titlesRef.current.forEach((el, i) => {
            if (i !== index) {
                gsap.to(el, {
                    color: 'gray',
                    opacity: 0.6,
                    duration: 0.3,
                });
            }
        });
    };

    const handleMouseLeave = (index) => {
        gsap.set(underlineRef.current[index], { transformOrigin: 'right' });
        gsap.to(underlineRef.current[index], {
            scaleX: 0,
            duration: 0.4,
            ease: 'power2.out',
        });

        titlesRef.current.forEach((el) => {
            gsap.to(el, {
                color: 'white',
                opacity: 1,
                duration: 0.3,
            });
        });
    };


    function toggleMenu() {
        setIsOpen(prev => !prev);
    }

    function handleLinkClick() {
        setIsOpen(false); // closes the nav
    }



    return (
        <div className='w-full overflow-hidden'>
            <nav className="w-full h-[10vh] flex justify-between fixed top-0 left-0 z-10 items-center px-5">
                <div className="flex items-center">
                    <h1 className="select-none text-white font-bold text-xl">D</h1>
                </div>

                <div
                    onClick={toggleMenu}
                    className="w-[45px] h-[45px] text-white flex items-center justify-center cursor-pointer rounded"
                >
                    <span className="text-2xl font-light">
                        {isOpen ? (
                            <i className="ri-close-large-fill"></i>
                        ) : (
                            <i className="ri-menu-2-line"></i>
                        )}
                    </span>
                </div>
            </nav>
            <div className='navpage h-0 w-full flex md:flex-row fixed top-0 left-0 z-9 overflow-hidden bg-[#101010] flex-col-reverse '>
                <div className="h-[90%] w-[50%] flex flex-col md:items-end justify-center gap-3">
                    {menuItems.map((item, index) => (
                        <div
                            key={index}
                            className="relative overflow-hidden h-fit w-fit font-[font4]"
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => handleMouseLeave(index)}
                        >
                            <Link to={item.path} onClick={handleLinkClick}>
                                <h1
                                    ref={(el) => (titlesRef.current[index] = el)}
                                    className="text-7xl navpageh1 translate-y-0 md:text-[6rem] font-semibold text-white cursor-pointer"
                                >
                                    {item.label}
                                </h1>
                            </Link>

                            <div
                                ref={(el) => (underlineRef.current[index] = el)}
                                className="absolute left-0 bottom-0 h-[4px] bg-white w-full scale-x-0"
                                style={{ transformOrigin: "left", transform: "scaleX(0)" }}
                            ></div>
                        </div>
                    ))}


                </div>
                <div className='h-full w-full md:w-[50%] flex items-center justify-center'>
                    <div className='flex h-[90%] w-[90%] flex-col justify-center pl-[2vw] gap-8'>
                        <div className='w-full bg flex gap-2'>
                            <div className=" navbaricons group relative w-10 h-10 rounded-full border border-white flex items-center justify-center cursor-pointer">
                                <span className="absolute inset-0 bg-white  scale-0 group-hover:scale-120 transition-transform duration-500 origin-center rounded-full"></span>
                                <i className="ri-instagram-line relative text-white group-hover:text-black duration-500 text-xl z-10"></i>
                            </div>
                            <div className=" navbaricons group relative w-10 h-10 rounded-full  border border-white flex items-center justify-center cursor-pointer">
                                <span className="absolute inset-0 bg-white scale-0 group-hover:scale-120 transition-transform duration-500 origin-center rounded-full"></span>
                                <i className="ri-github-fill relative text-white group-hover:text-black duration-500 text-xl z-10"></i>
                            </div>
                            <div className=" navbaricons group relative w-10 h-10 rounded-full  border border-white flex items-center justify-center cursor-pointer">
                                <span className="absolute inset-0 bg-white scale-0 group-hover:scale-120 transition-transform duration-500 origin-center rounded-full"></span>
                                <i className="ri-twitter-x-fill relative text-white group-hover:text-black duration-500 text-xl z-10"></i>
                            </div>
                            <div className=" navbaricons group relative w-10 h-10 rounded-full  border border-white flex items-center justify-center cursor-pointer">
                                <span className="absolute inset-0 bg-white scale-0 group-hover:scale-120 transition-transform duration-500 origin-center rounded-full"></span>
                                <i className="ri-linkedin-box-fill relative text-white group-hover:text-black duration-500 text-xl z-10"></i>
                            </div>
                        </div>
                        <div className='flex flex-col gap-3'>
                            <div>
                                <div className="h-fit w-fit overflow-hidden">
                                    <h2 id="navbarh2" className='text-[#9d9d9d] translate-y-0'>(inquires)</h2>
                                </div>
                                <div className="h-fit w-fit overflow-hidden">
                                    <h3 id="navbarh3" className='relative group translate-y-0 text-white cursor-pointer w-fit'>
                                        offcialdivyanshu18@gmail.com
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white
                                                    transform scale-x-100 group-hover:scale-x-0 
                                                    origin-left group-hover:origin-right 
                                                    transition-transform duration-300 ease-in-out"
                                        ></span>
                                    </h3>
                                </div>
                            </div>
                            <div>
                                <div className="h-fit w-fit overflow-hidden">
                                    <h2 id="navbarh2" className='text-[#9d9d9d] translate-y-0'>(Phone)</h2>
                                </div>
                                <div className="h-fit w-fit overflow-hidden">
                                    <h3 id="navbarh3" className='relative group translate-y-0 text-white cursor-pointer w-fit'>
                                        +91 6376420136
                                        <span
                                            className="absolute bottom-0 left-0 w-full h-0.5 bg-white 
                                                    transform scale-x-100 group-hover:scale-x-0 
                                                    origin-left group-hover:origin-right 
                                                    transition-transform duration-300 ease-in-out"
                                        ></span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;
