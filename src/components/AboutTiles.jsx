import React from 'react';

const AboutTiles = () => {
    return (
        <section className="relative py-16 h-auto md:h-[600px] mt-[-30px] px-4 sm:px-6 md:px-16 bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 md:p-10">
                {/* Left: Text */}
                <div className="space-y-6 md:ml-30">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl text-black font-bold">
                        About Tiles <br />
                        <span className="text-blue-400 mt-2 sm:mt-4 block">Gallery</span>
                    </h2>
                    <p className="text-gray-600 text-base sm:text-lg mt-2 sm:mt-4">
                        Discover our leading tiles and ceramics <br className="hidden sm:block" />
                        showroom, offering quality, variety, and <br className="hidden sm:block" />
                        excellence in design across Bangladesh.
                    </p>
                    <button className="px-5 py-2 sm:px-6 sm:py-2 border border-gray-800 rounded-full text-gray-800 font-medium hover:bg-gray-300 transition">
                        Explore
                    </button>
                </div>

                {/* Right: Images */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 md:mr-20 gap-4 sm:gap-5">
                    <div className="overflow-hidden h-48 sm:h-60 md:h-[400px] rounded-xl">
                        <img
                            src="/about.png"
                            alt="Tiles showcase"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                    <div className="overflow-hidden h-48 sm:h-60 md:h-[400px] rounded-xl">
                        <img
                            src="/about2.png"
                            alt="Tiles showroom"
                            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutTiles;