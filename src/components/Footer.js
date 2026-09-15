import { CAMPUS_MAP_URL } from '@/lib/noticeCategories';

export default function Footer() {
  return (
    <footer className="border-t border-[#174f3d] bg-[#07543f] text-[#d7eee0]">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
     <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_0.7fr]">

  {/* About */}
  <div className="max-w-md space-y-4">
    <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#b9e4c9]">SUSL~Notice</p>
    <h3 className="text-2xl font-black text-white">University information, in one place.</h3>
    <p className="leading-relaxed text-[#b9e4c9]">
      We centralize and digitize campus announcements, ensuring students, faculty, and staff
      have instant access to all academic and non-academic notices in a structured platform.
    </p>
  </div>

  {/* Contact */}
  <div className="space-y-4">
    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#b9e4c9]">Contact</h3>
    <address className="space-y-2 text-sm not-italic text-[#d7eee0]">
      <p>University Business Linkage Cell</p>
      <p>Sabaragamuwa University of Sri Lanka</p>
      <p>P.O. Box 02, Belihuloya, 70140, Sri Lanka</p>
      <p>
        <a href={CAMPUS_MAP_URL} target="_blank" rel="noreferrer" className="font-semibold transition-colors hover:text-white">
          Open campus location map
        </a>
      </p>
      <p>
        <a href="tel:+94452280193" className="transition-colors hover:text-white">
          (+94) 45 228 0193
        </a>
      </p>
      <p>
        <a href="mailto:ublc@sab.ac.lk" className="transition-colors hover:text-white">
          ublc@sab.ac.lk
        </a>
      </p>
    </address>
  </div>

  {/* Quick Links */}
  <div className="space-y-4">
    <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-[#b9e4c9]">Quick links</h3>
    <ul className="space-y-3 text-sm">
      <li>
        <a href="https://www.sab.ac.lk/" className="transition-colors hover:text-white">
          University
        </a>
      </li>
      <li>
        <a href="/about" className="transition-colors hover:text-white">
          About Us
        </a>
      </li>
      <li>
        <a href="/contact" className="transition-colors hover:text-white">
          Contact Us
        </a>
      </li>
    </ul>
  </div>
</div>



        {/* Copyright */}
        <div className="mt-10 border-t border-[#24684f] pt-6 text-center text-sm text-[#9ecab0]">
          <p>
            © {new Date().getFullYear()} University Business Linkage Cell, SUSL. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
