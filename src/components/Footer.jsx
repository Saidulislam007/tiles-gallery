import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2f2722] text-gray-300 px-5 sm:px-8 md:px-12 lg:px-20 py-10 md:py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">

        {/* LEFT SIDE */}
        <div className="space-y-5 text-center sm:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Tiles Gallery
          </h2>

          <p className="text-sm md:text-base text-gray-400 max-w-xs mx-auto sm:mx-0">
            Your destination for exceptional tiles and ceramics.
          </p>

          <div className="flex justify-center sm:justify-start gap-5 text-xl md:text-2xl">
            <FaFacebookF className="hover:text-white hover:scale-110 transition duration-300 cursor-pointer" />
            <FaInstagram className="hover:text-white hover:scale-110 transition duration-300 cursor-pointer" />
            <FaYoutube className="hover:text-white hover:scale-110 transition duration-300 cursor-pointer" />
            <FaTiktok className="hover:text-white hover:scale-110 transition duration-300 cursor-pointer" />
          </div>

          <p className="text-xs md:text-sm text-gray-400 pt-4">
            © 2026 Tiles Gallery. All rights reserved.
          </p>
        </div>

        {/* CENTER */}
        <div className="space-y-4 text-center sm:text-left lg:pl-10">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            Design
          </h3>

          <p className="text-sm md:text-base text-gray-400">
            +8801234567890
          </p>
          <p className="text-sm md:text-base text-gray-400 break-words">
            info@tilescorner.com
          </p>
        </div>

        
        <div className="space-y-4 text-center sm:text-left">
          <h3 className="text-lg md:text-xl font-semibold text-white">
            Contact Us
          </h3>

          <p className="text-sm md:text-base text-gray-400">
            Dhaka, Bangladesh
          </p>
          <p className="text-sm md:text-base text-gray-400">
            +880 1234-567890
          </p>
          <p className="text-sm md:text-base text-gray-400 break-words">
            info@tilesgallery.com
          </p>
          <p className="text-sm md:text-base text-gray-400">
            Sat-Thu, 10:00 AM - 8:00 PM
          </p>
        </div>

      </div>
    </footer>
  );
}