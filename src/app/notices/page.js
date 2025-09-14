import { Suspense } from 'react';
import NoticesContent from './NoticesContent';

export const dynamic = 'force-dynamic'; // ensures full client rendering

export default function NoticesPage() {
  return (
    <Suspense fallback={<p className="text-center mt-10">Loading...</p>}>
      <NoticesContent />
    </Suspense>
  );
}
