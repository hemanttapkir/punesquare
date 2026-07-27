'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getProjectBySlug, Project } from '@/lib/projects';

// Disable SSR for Map component
const ProjectMap = dynamic(() => import('../../../components/ProjectMap'), {
  ssr: false,
  loading: () => <div style={{ height: '320px', background: 'var(--stone-2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Map...</div>
});

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = typeof params?.slug === 'string' ? params.slug : '';
  const [project, setProject] = useState<Project | null>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (typeof slug === 'string') {
      const found = getProjectBySlug(slug);
      if (found) {
        setProject(found);
        if (found.imagesUrl?.length) setActiveImage(found.imagesUrl[0]);
      }
    }
  }, [slug]);

  if (!project) return <div className="wrap" style={{ padding: '40px' }}>Loading project...</div>;

  return (
    <main className="wrap" style={{ padding: '40px 32px' }}>
      <Link href="/" className="btn" style={{ marginBottom: '20px', display: 'inline-block' }}>← Back to Listings</Link>

      <div>
        <p className="eyebrow">{project.location} {project.rera ? `• MahaRERA: ${project.rera}` : ''}</p>
        <h1 style={{ fontSize: '36px', margin: '4px 0' }}>{project.title}</h1>
        <p style={{ fontSize: '22px', color: 'var(--brick)', fontWeight: 600 }}>{project.price}</p>
      </div>

      {/* Gallery */}
      {project.imagesUrl && project.imagesUrl.length > 0 && (
        <div style={{ margin: '24px 0' }}>
          <img src={activeImage} alt={project.title} style={{ width: '100%', height: '400px', objectFit: 'cover', border: '1px solid var(--line)' }} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            {project.imagesUrl.map((img, i) => (
              <img key={i} src={img} onClick={() => setActiveImage(img)} alt="thumb" style={{ width: '80px', height: '60px', objectFit: 'cover', cursor: 'pointer', border: activeImage === img ? '2px solid var(--brick)' : '1px solid var(--line)' }} />
            ))}
          </div>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div>
          {/* MAP & LOCATION HIGHLIGHTS */}
          <div style={{ marginBottom: '32px' }}>
            <h3>Location & Neighborhood</h3>
            <p style={{ color: 'var(--ink-soft)', marginTop: '4px', fontSize: '14px' }}>
              📍 {project.location}
            </p>
            
            {/* Interactive Map */}
            <ProjectMap 
              title={project.title} 
              locationName={project.location} 
              lat={project.lat || 18.6298} 
              lng={project.lng || 73.7423} 
            />

            {/* Landmarks */}
            {project.landmarks && project.landmarks.length > 0 && (
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '14px', marginBottom: '8px' }}>Nearby Connectivity & Landmarks</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
                  {project.landmarks.map((lm, i) => (
                    <div key={i} style={{ padding: '8px 12px', background: 'var(--stone-2)', border: '1px solid var(--line)', fontSize: '13px' }}>
                      🚗 {lm}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Configurations */}
          {project.floorPlans && project.floorPlans.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3>Configurations & Pricing</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px' }}>
                <thead>
                  <tr style={{ background: 'var(--stone-2)', textTransform: 'uppercase', fontSize: '12px' }}>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Typology</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Carpet Area</th>
                    <th style={{ padding: '10px', textAlign: 'left' }}>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {project.floorPlans.map((fp, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid var(--line)' }}>
                      <td style={{ padding: '10px' }}><strong>{fp.typology}</strong></td>
                      <td style={{ padding: '10px' }}>{fp.carpetArea}</td>
                      <td style={{ padding: '10px', color: 'var(--brick)' }}>{fp.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Amenities */}
          {project.amenities && project.amenities.length > 0 && (
            <div style={{ marginBottom: '32px' }}>
              <h3>Project Amenities</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginTop: '12px' }}>
                {project.amenities.map((item, i) => (
                  <div key={i} style={{ padding: '10px', background: 'var(--stone-2)', border: '1px solid var(--line)', fontSize: '14px' }}>
                    ✓ {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Lead Form */}
        <div style={{ background: 'var(--basalt)', color: '#fff', padding: '24px', height: 'fit-content' }}>
          <h3>Get Site Visit Details</h3>
          <form style={{ display: 'grid', gap: '12px', marginTop: '16px' }} onSubmit={e => e.preventDefault()}>
            <input type="text" placeholder="Full Name" required style={{ padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }} />
            <input type="tel" placeholder="Mobile Number" required style={{ padding: '10px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }} />
            <button className="search-btn" style={{ width: '100%' }}>Request Call Back →</button>
          </form>
        </div>
      </div>
    </main>
  );
}