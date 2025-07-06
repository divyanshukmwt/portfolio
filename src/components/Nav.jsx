import React, { useState } from 'react';

const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);

    function toggleMenu() {
        setIsOpen(prev => !prev);
        console.log(isOpen);
    }

    return (
        <div className='h-screen w-full overflow-hidden'>
            <nav className="w-full h-[10vh] flex justify-between fixed z-10 items-center transparent px-5">
                <div className="flex items-center">
                    <h1 className="select-none font-bold text-xl">Logo</h1>
                </div>

                <div
                    onClick={toggleMenu}
                    className="w-[45px] h-[45px] bg-amber-500 flex items-center justify-center cursor-pointer rounded"
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
            {isOpen && (
                <div className='h-screen w-full flex md:flex-row  flex-col-reverse '>
                    <div className="h-full w-full flex items-center justify-center md:w-[50%] bg-amber-700">
                        <div className='bg-amber-600 h-[60%] w-[90%] flex justify-center flex-col gap-3'>
                            <div className='bg-amber-400 h-fit w-fit font-[font4]'>
                                <h1 className="text-7xl font-semibold ">Home</h1>
                            </div>
                            <div className='bg-amber-400 h-fit w-fit font-[font4] '>
                                <h1 className="text-7xl font-semibold  ">About</h1>
                            </div>
                            <div className='bg-amber-400 h-fit w-fit font-[font4]'>
                                <h1 className="text-7xl font-semibold">Work</h1>
                            </div>
                            <div className='bg-amber-400 h-fit w-fit font-[font4]'>
                                <h1 className="text-7xl font-semibold">Contact</h1>
                            </div>
                        </div>
                    </div>
                    <div className='h-full bg-blue-500 w-full md:w-[50%] flex items-center justify-center'>
                        <div className='flex bg-blue-300 h-[60%] w-[90%] flex-col justify-end pb-[2.2vw] pl-[1vw]'>
                            <div>
                                <i className="ri-instagram-line"></i>
                                <i className="ri-github-fill"></i>
                                <i className="ri-twitter-x-fill"></i>
                                <i className="ri-linkedin-box-fill"></i>
                            </div>
                            <div>
                                <div>
                                    <h2>(inquires)</h2>
                                    <h3>john@jt-studio.com</h3>
                                </div>
                                <div>
                                    <h2>(Phone)</h2>
                                    <h3>+491234 56789</h3>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div>
    );
};

export default Nav;
