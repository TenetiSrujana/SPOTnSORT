// src/components/Footer.jsx

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-4 px-6 mt-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left */}
        <p className="text-sm">
          © {new Date().getFullYear()} SpotnSort. All rights reserved.
        </p>

        {/* Right */}
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="/privacy" className="hover:text-white text-sm">
            Privacy Policy
          </a>
          <a href="/terms" className="hover:text-white text-sm">
            Terms of Service
          </a>
          <a href="/contact" className="hover:text-white text-sm">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
n