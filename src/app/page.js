'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import PaginatedNoticeList from '@/components/PaginatedNoticeList';
import { FiArrowRight, FiBell, FiBookOpen, FiCalendar } from 'react-icons/fi';
import { CAMPUS_MAP_URL, NOTICE_CATEGORY_GROUPS } from '@/lib/noticeCategories';

export default function Home() {
  const [notices, setNotices] = useState([]);
  const [importantNotices, setImportantNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use absolute URL for API request
        const baseUrl = window.location.origin;
        const res = await fetch(`${baseUrl}/api/notices`);
        
        if (!res.ok) {
          throw new Error(`Failed to fetch notices: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        console.log('Fetched notices:', data);
        
        setNotices(data.notices || []);
        setImportantNotices((data.notices || []).filter(notice => notice.important));
      } catch (err) {
        console.error('Error fetching notices:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="page-shell px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse space-y-6">
            <div className="h-72 rounded-[2rem] bg-[#dfece3]" />
            <div className="h-8 w-56 rounded bg-[#dfece3]" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-shell px-5 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[2rem] bg-[#07543f] px-8 py-16 text-center text-white">
            <p className="section-kicker !text-[#b9e4c9]">SUSL Notice</p>
            <h1 className="mt-3 text-4xl font-bold">The notice board is taking a short pause.</h1>
            <p className="mx-auto mt-4 max-w-xl text-[#d7eee0]">We could not load the latest university updates. Please try again in a moment.</p>
            <button onClick={() => window.location.reload()} className="mt-8 rounded-full bg-white px-5 py-3 font-bold text-[#07543f] transition hover:bg-[#c9efd7]">Try again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell px-5 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <section className="relative min-h-[480px] overflow-hidden rounded-[2rem] bg-[#07543f] text-white shadow-[0_20px_50px_rgba(7,84,63,0.16)] sm:min-h-[560px]">
          <Image src="/campus/campus3.jpg" alt="Sabaragamuwa University meeting and collaboration" fill priority sizes="(max-width: 768px) 100vw, 1200px" className="object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,84,63,0.96)_0%,rgba(7,84,63,0.78)_38%,rgba(7,84,63,0.18)_78%,rgba(7,84,63,0.08)_100%)]" />
          <div className="relative z-10 flex min-h-[480px] items-end px-7 py-10 sm:min-h-[560px] sm:px-12 sm:py-14">
            <div className="max-w-2xl animate-riseIn">
              <p className="section-kicker !text-[#b9e4c9]">Sri Lanka University of Sabaragamuwa</p>
              <h1 className="mt-4 max-w-2xl text-4xl font-black leading-[1.04] tracking-[-0.04em] sm:text-6xl">The official word, clearly delivered.</h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#d7eee0] sm:text-lg">Find academic updates, campus announcements, events, and essential information from across the university.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/notices" className="inline-flex items-center gap-2 rounded-full bg-[#c9efd7] px-5 py-3 font-bold text-[#07543f] transition hover:bg-white">Explore notices <FiArrowRight /></Link>
                <Link href="/about" className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10">About SUSL Notice</Link>
                <a href={CAMPUS_MAP_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/30 px-5 py-3 font-semibold text-white transition hover:bg-white/10">Campus location ↗</a>
              </div>
            </div>
          </div>
        </section>

        <section className="-mt-7 grid gap-3 px-4 sm:grid-cols-3 sm:px-10">
          {[
            [FiBell, 'Latest updates', 'Stay current with campus news'],
            [FiBookOpen, 'Academic life', 'Important academic information'],
            [FiCalendar, 'What is next', 'Events, deadlines, and more'],
          ].map(([Icon, title, text]) => (
            <div key={title} className="relative z-10 flex items-start gap-4 rounded-2xl border border-[#dfe7e1] bg-white p-5 shadow-[0_12px_30px_rgba(23,35,31,0.08)]">
              <span className="rounded-xl bg-[#e8f4ee] p-3 text-xl text-[#087f5b]"><Icon /></span>
              <div><p className="font-bold text-[#17231f]">{title}</p><p className="mt-1 text-sm leading-5 text-[#687570]">{text}</p></div>
            </div>
          ))}
        </section>

        <section className="mt-14">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div><p className="section-kicker">On the board</p><h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#17231f]">Latest announcements</h2></div>
            <Link href="/notices" className="hidden items-center gap-2 text-sm font-bold text-[#087f5b] sm:flex">View all <FiArrowRight /></Link>
          </div>
          <div className="mt-8"><PaginatedNoticeList notices={notices} perPage={4} /></div>
        </section>

        {importantNotices.length > 0 && (
          <section className="mt-16">
            <div className="mb-5 flex items-end justify-between"><div><p className="section-kicker !text-[#a56d19]">Priority information</p><h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#17231f]">Important notices</h2></div><FiBell className="text-2xl text-[#c9953d]" /></div>
            <PaginatedNoticeList notices={importantNotices} perPage={4} />
          </section>
        )}

        <section className="mt-16 pb-8">
          <div className="mb-5"><p className="section-kicker">Browse the archive</p><h2 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#17231f]">Find what matters</h2></div>
          <div className="grid gap-6 md:grid-cols-3">
            {NOTICE_CATEGORY_GROUPS.map((group) => (
              <div key={group.label} className="rounded-2xl border border-[#dfe7e1] bg-white p-5">
                <h3 className="font-black text-[#17231f]">{group.label}</h3>
                <div className="mt-3 space-y-1">
                  {group.options.map((category) => (
              <Link key={category} href={`/notices?category=${encodeURIComponent(category)}`} className="group flex items-center justify-between rounded-2xl border border-[#dfe7e1] bg-white px-4 py-4 font-semibold text-[#34463f] transition hover:-translate-y-0.5 hover:border-[#9dceb3] hover:bg-[#e8f4ee]">
                <span>{category}</span><FiArrowRight className="text-[#087f5b] transition group-hover:translate-x-1" />
              </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
