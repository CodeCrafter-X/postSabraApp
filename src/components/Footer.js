export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="container mx-auto px-6 py-12">



     <div className="flex flex-col md:flex-row justify-evenly gap-16">

  {/* About */}
  <div className="space-y-4 max-w-xs">
    <h3 className="text-lg font-semibold text-green-400 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-green-400">
      About Our Unit
    </h3>
    <p className="text-gray-400 leading-relaxed">
      We centralize and digitize campus announcements, ensuring students, faculty, and staff
      have instant access to all academic and non-academic notices in a structured platform.
    </p>
  </div>

  {/* Contact */}
  <div className="space-y-4 max-w-xs">
    <h3 className="text-lg font-semibold text-green-400 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-green-400">
      Contact
    </h3>
    <address className="not-italic text-gray-400 space-y-2">
      <p>University Business Linkage Cell</p>
      <p>Sabaragamuwa University of Sri Lanka</p>
      <p>P.O. Box 02, Belihuloya, 70140, Sri Lanka</p>
      <p>
        <a href="tel:+94452280193" className="hover:text-green-300 transition-colors">
          (+94) 45 228 0193
        </a>
      </p>
      <p>
        <a href="mailto:ublc@sab.ac.lk" className="hover:text-green-300 transition-colors">
          ublc@sab.ac.lk
        </a>
      </p>
    </address>
  </div>

  {/* Quick Links */}
  <div className="space-y-4 max-w-xs">
    <h3 className="text-lg font-semibold text-green-400 relative pb-2 after:absolute after:left-0 after:bottom-0 after:w-12 after:h-0.5 after:bg-green-400">
      Quick Links
    </h3>
    <ul className="space-y-2">
      <li>
        <a href="https://www.sab.ac.lk/" className="hover:text-green-300 transition-colors">
          University
        </a>
      </li>
      <li>
        <a href="/about" className="hover:text-green-300 transition-colors">
          About Us
        </a>
      </li>
      <li>
        <a href="/contact" className="hover:text-green-300 transition-colors">
          Contact Us
        </a>
      </li>
    </ul>
  </div>
</div>



        {/* Copyright */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          <p>
            © {new Date().getFullYear()} University Business Linkage Cell, SUSL. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
