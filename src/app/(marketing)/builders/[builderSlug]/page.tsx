// src/app/projects/[slug]/page.tsx
'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params?.slug;

  // Formatting title from slug (e.g. godrej-ivara -> Godrej Ivara)
  const formattedTitle = typeof slug === 'string' 
    ? slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
    : 'Project Details';

  return (
    <main className="wrap" style={{ padding: '40px 32px' }}>
      <Link href="/" className="btn" style={{ marginBottom: '24px', display: 'inline-block' }}>
        ← Back to Projects
      </Link>

      <div style={{ margin: '20px 0' }}>
        <p className="eyebrow">Project Listing</p>
        <h1 style={{ fontSize: '40px', margin: '8px 0' }}>{formattedTitle}</h1>
      </div>

      {/* Hero Image Showcase */}
      <div style={{ background: 'var(--stone-2)', height: '320px', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--line)', marginBottom: '32px' }}>
        <p style={{ color: 'var(--ink-soft)' }}>[ Gallery / Image Showcase ]</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Main Details */}
        <div>
          <h2>Floor Plans & Configurations</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', margin: '20px 0' }}>
            <div style={{ padding: '16px', background: 'var(--stone-2)', border: '1px solid var(--line)' }}>
              <h4>2 BHK Layout</h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>750 sq.ft. | ₹85 Lakhs</p>
            </div>
            <div style={{ padding: '16px', background: 'var(--stone-2)', border: '1px solid var(--line)' }}>
              <h4>3 BHK Layout</h4>
              <p style={{ color: 'var(--ink-soft)', fontSize: '14px' }}>1050 sq.ft. | ₹1.25 Cr</p>
            </div>
          </div>

          <h2 style={{ marginTop: '32px' }}>About the Development</h2>
          <p style={{ color: 'var(--ink-soft)', marginTop: '12px' }}>
            Detailed overview of amenities, location access, MahaRERA registration details, and possession dates.
          </p>
        </div>

        {/* Lead Capture Form */}
        <div style={{ background: 'var(--basalt)', color: 'var(--stone)', padding: '24px', borderRadius: '4px', height: 'fit-content' }}>
          <h3 style={{ color: 'var(--stone)', marginBottom: '8px' }}>Enquire About {formattedTitle}</h3>
          <p style={{ fontSize: '13px', color: '#C7BCA3', marginBottom: '16px' }}>Request brochure and current inventory.</p>
          
          <form style={{ display: 'grid', gap: '12px' }} onSubmit={(e) => e.preventDefault()}>
            <input type="text" placeholder="Your Name" style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} required />
            <input type="tel" placeholder="Phone Number" style={{ width: '100%', padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }} required />
            <button type="submit" className="search-btn" style={{ width: '100%' }}>Get Pricing & Details</button>
          </form>
        </div>
      </div>
    </main>
  );
}