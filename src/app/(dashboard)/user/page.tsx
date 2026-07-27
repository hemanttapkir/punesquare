'use client';

import Link from 'next/link';

export default function UserDashboard() {
  const savedProjects = [
    { name: 'Shapoorji Joyville Vyomora', loc: 'Hinjewadi', price: '₹84.99L – 1.89Cr', status: 'Inquiry Sent' },
    { name: 'VJ Palladio Presidential Suites', loc: 'Balewadi', price: '₹1.50Cr – 2.50Cr', status: 'Shortlisted' },
  ];

  return (
    <div className="wrap" style={{ padding: '40px 32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div>
          <p className="eyebrow">Buyer Dashboard</p>
          <h1 style={{ fontSize: '32px', marginTop: '8px' }}>My Saved Properties</h1>
        </div>
        <Link href="/" className="btn">← Back to Explorer</Link>
      </div>

      <div className="project-grid">
        {savedProjects.map((p) => (
          <div className="pcard" key={p.name}>
            <div className="pcard-top">
              <span className="loc">{p.loc}</span>
              <span className="status ready">{p.status}</span>
            </div>
            <h3>{p.name}</h3>
            <div className="divider" />
            <div className="meta">
              <div className="price">{p.price}</div>
              <button className="btn btn-solid" style={{ padding: '6px 12px', fontSize: '12px' }}>View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}