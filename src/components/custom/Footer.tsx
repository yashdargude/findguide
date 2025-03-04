import { HiCubeTransparent } from "react-icons/hi";

function Footer() {
  return (
    <footer className="bg-gradient-radial from-gradientred via-gradientblue to-darkblue p-8">
      <div className="container mx-auto text-center py-12">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-white text-lg font-semibold">
              © 2024 FindYouGuide. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="/about" className="text-white hover:text-gray-400">
              About Us
            </a>
            <a href="/contact" className="text-white hover:text-gray-400">
              Contact
            </a>
            <a href="/privacy" className="text-white hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="/terms" className="text-white hover:text-gray-400">
              Terms of Service
            </a>
          </div>
        </div>
        <div className="mt-8">
          <p className="text-white text-sm mb-4">Follow us on:</p>
          <div className="flex justify-center space-x-6">
            <a
              href="https://facebook.com"
              className="text-white hover:text-gray-400"
            >
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a
              href="https://twitter.com"
              className="text-white hover:text-gray-400"
            >
              <i className="fab fa-twitter text-2xl"></i>
            </a>
            <a
              href="https://instagram.com"
              className="text-white hover:text-gray-400"
            >
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a
              href="https://linkedin.com"
              className="text-white hover:text-gray-400"
            >
              <i className="fab fa-linkedin-in text-2xl"></i>
            </a>
          </div>
          <HiCubeTransparent className="text-brightred w-10 h-10 " />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
