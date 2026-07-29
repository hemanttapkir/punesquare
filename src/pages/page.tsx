'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { getProjects, Project } from '../lib/projects';

// Shared corridor data
const CORRIDORS = [
  {
    node: '01', tag: 'West IT Corridor', title: 'Hinjewadi – Wakad – Baner',
    desc: 'Anchored by Rajiv Gandhi Infotech Park. Highest concentration of new launches in the city.',
    range: '₹75L – ₹8Cr', sub: 'Studio to 5BHK penthouse',
    localities: ['hinjewadi', 'wakad', 'baner'],
  },
  {
    node: '02', tag: 'East IT Corridor', title: 'Kharadi – Magarpatta – Hadapsar',
    desc: 'EON IT Park and Magarpatta City drive demand. Fastest-growing rental yields in Pune.',
    range: '₹85L – ₹7.5Cr', sub: '2BHK to 4BHK villas',
    localities: ['kharadi', 'magarpatta', 'hadapsar'],
  },
  {
    node: '03', tag: 'Riverside & NW', title: 'Balewadi – Aundh – Bavdhan',
    desc: 'Established residential belt near the Mula-Mutha, close to both IT corridors.',
    range: '₹1.0Cr – ₹3.9Cr', sub: 'Mid to upper-mid segment',
    localities: ['balewadi', 'aundh', 'bavdhan'],
  },
  {
    node: '04', tag: 'SW / Old Pune Fringe', title: 'Kothrud – Warje – NIBM',
    desc: 'Legacy Pune neighbourhoods redeveloping fast, walkable to the old city core.',
    range: '₹95L – ₹13Cr', sub: 'Widest price spread in the city',
    localities: ['kothrud', 'warje', 'nibm'],
  },
  {
    node: '05', tag: 'Affordable & Industrial', title: 'PCMC – Mamurdi – Punawale',
    desc: "Pimpri-Chinchwad's industrial base plus new affordable-housing supply.",
    range: '₹52L – ₹3.2Cr', sub: 'Best entry-level value',
    localities: ['pcmc', 'pimpri', 'chinchwad', 'mamurdi', 'punawale'],
  },
  {
    node: '06', tag: 'Central Premium', title: 'Koregaon Park – Bund Garden',
    desc: "Pune's oldest premium address. Low supply, and it shows in the price ceiling.",
    range: '₹99L – ₹45Cr', sub: "City's ultra-luxury pocket",
    localities: ['koregaon', 'bund garden', 'bund'],
  },
];

const BUDGETS = ['Any budget', 'Under ₹80L', '₹80L – ₹1.5Cr', '₹1.5Cr – ₹3Cr', '₹3Cr and above'];

function parsePriceToLakh(price: string): number | null {
  const match = price.match(/([\d.]+)\s*(L|Cr)/i);
  if (!match) return null;
  const value = parseFloat(match[1]);
  return match[2].toLowerCase() === 'cr' ? value * 100 : value;
}

function matchesBudget(lakh: number, bucket: string): boolean {
  switch (bucket) {
    case 'Under ₹80L': return lakh < 80;
    case '₹80L – ₹1.5Cr': return lakh >= 80 && lakh < 150;
    case '₹1.5Cr – ₹3Cr': return lakh >= 150 && lakh < 300;
    case '₹3Cr and above': return lakh >= 300;
    default: return true;
  }
}

export default function HomePage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState('');
  const [corridor, setCorridor] = useState('All corridors');
  const [budget, setBudget] = useState('Any budget');

  useEffect(() => {
    setProjects(getProjects());
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((item) => {
      if (query.trim() && !item.title.toLowerCase().includes(query.trim().toLowerCase())) {
        return false;
      }
      if (corridor !== 'All corridors') {
        const c = CORRIDORS.find((c) => c.title === corridor);
        if (c && !c.localities.some((loc) => item.location.toLowerCase().includes(loc))) {
          return false;
        }
      }
      if (budget !== 'Any budget') {
        const lakh = parsePriceToLakh(item.price);
        if (lakh !== null && !matchesBudget(lakh, budget)) return false;
      }
      return true;
    });
  }, [projects, query, corridor, budget]);

  const filtersActive = query.trim() !== '' || corridor !== 'All corridors' || budget !== 'Any budget';

  function clearFilters() {
    setQuery('');
    setCorridor('All corridors');
    setBudget('Any budget');
  }

  return (
    <>
      <header>
        <div className="wrap nav-inner">
          <div className="logo">
            Pune<span>Square</span>
          </div>
          <nav>
            <ul>
              <li><a href="#corridors">Corridors</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#markets">Price Snapshot</a></li>
              <li><a href="#guides">Guides</a></li>
            </ul>
          </nav>
          <a href="#projects" className="btn btn-solid nav-cta">Browse Projects</a>
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <p className="eyebrow">Pune, Maharashtra</p>
            <h1>Understand Pune&apos;s real estate <em>before</em> you walk into a site office.</h1>
            <p className="lede">Six growth corridors, hundreds of live launches, and a lot of sales pressure. We map the city by geography and price — not by whoever&apos;s advertising loudest this week.</p>
            <div className="hero-actions">
              <a href="#projects" className="btn btn-solid">See featured projects</a>
              <a href="#corridors" className="btn">Explore the corridor map</a>
            </div>
          </div>

          <div className="hero-art">
            <svg
              className="skyline"
              viewBox="0 0 480 420"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Pune hills and skyline vector visualization"
            >
              <rect x="0" y="0" width="480" height="420" fill="none" />
              <path d="M0 300 L60 250 L110 290 L170 220 L230 270 L300 200 L360 260 L420 235 L480 280 L480 420 L0 420 Z" fill="#5C6749" opacity="0.35" />
              <path d="M0 340 L70 300 L130 330 L200 280 L260 320 L330 275 L400 315 L480 300 L480 420 L0 420 Z" fill="#59654A" opacity="0.55" />
              <g fill="#9E4429">
                <rect x="60" y="230" width="20" height="110" opacity="0.9" />
                <rect x="88" y="200" width="16" height="140" opacity="0.85" />
                <rect x="150" y="245" width="22" height="95" opacity="0.9" />
                <rect x="260" y="215" width="18" height="125" opacity="0.9" />
                <rect x="290" y="255" width="20" height="85" opacity="0.85" />
                <rect x="350" y="190" width="16" height="150" opacity="0.9" />
                <rect x="380" y="235" width="20" height="105" opacity="0.85" />
              </g>
              <g stroke="#BD9436" strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round">
                <path d="M10 360 C 120 330, 240 350, 470 300" fill="none" />
              </g>
              <g fill="#BD9436">
                <circle cx="10" cy="360" r="5" />
                <circle cx="150" cy="340" r="5" />
                <circle cx="300" cy="335" r="5" />
                <circle cx="470" cy="300" r="5" />
              </g>
            </svg>
          </div>
        </div>
      </section>

      <div className="stat-strip">
        <div className="wrap stat-grid">
          <div className="stat"><b>1,300+</b><span>active projects tracked across Pune MMR</span></div>
          <div className="stat"><b>6</b><span>distinct growth corridors, each with its own price logic</span></div>
          <div className="stat"><b>₹45L–₹45Cr</b><span>range of live listings, from PCMC studios to Bund Garden penthouses</span></div>
          <div className="stat"><b>25+</b><span>developers with current Pune launches</span></div>
        </div>
      </div>

      <section id="corridors" className="corridor-section">
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">The corridor map</p>
            <h2>Pune doesn&apos;t have one market. It has six.</h2>
            <p>Price in this city follows infrastructure, not just distance from Shivajinagar. Scroll along the line — each stop is a corridor with its own IT anchor, price band, and buyer profile.</p>
          </div>
        </div>
        <div className="corridor-rail">
          <div className="corridor-track">
            {CORRIDORS.map((s) => (
              <div className="stop reveal" key={s.node}>
                <div className="node">{s.node}</div>
                <span className="tag">{s.tag}</span>
                <h4>{s.title}</h4>
                <p className="locs">{s.desc}</p>
                <p className="range">{s.range}<small>{s.sub}</small></p>
              </div>
            ))}
          </div>
        </div>
      </section>

   <section id="projects">
  <div className="wrap">
    <div className="section-head section-head-flex">
      <div>
        <p className="eyebrow">Active Inventory</p>
        <h2>Latest Projects</h2>
      </div>
      <Link href="/agent" className="btn btn-solid">+ Add New Project</Link>
    </div>

    <div className="finder">
      <div className="finder-bar">
        <div className="finder-field finder-search">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by project name…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search by project name"
          />
        </div>

        <div className="finder-divider" />

        <select value={corridor} onChange={(e) => setCorridor(e.target.value)} aria-label="Filter by corridor">
          <option>All corridors</option>
          {CORRIDORS.map((c) => (
            <option key={c.node} value={c.title}>{c.title}</option>
          ))}
        </select>

        <div className="finder-divider" />

        <select value={budget} onChange={(e) => setBudget(e.target.value)} aria-label="Filter by budget">
          {BUDGETS.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div className="finder-meta">
        <span>{filteredProjects.length} of {projects.length} projects match</span>
        {filtersActive && (
          <button type="button" className="finder-clear" onClick={clearFilters}>Clear filters</button>
        )}
      </div>
    </div>

    {projects.length === 0 ? (
      <p style={{ color: 'var(--ink-soft)', marginTop: '16px' }}>
        No custom projects added yet. <Link href="/agent" style={{ color: 'var(--brick)', fontWeight: 600 }}>Add one now →</Link>
      </p>
    ) : filteredProjects.length === 0 ? (
      <p style={{ color: 'var(--ink-soft)', marginTop: '16px' }}>
        No projects match your filters. <button type="button" className="finder-clear" onClick={clearFilters} style={{ marginLeft: '4px' }}>Clear filters</button>
      </p>
    ) : (
    <div className="project-grid" style={{ marginTop: '24px' }}>
  {filteredProjects.map((item) => {
    // Get the first uploaded image from imagesUrl, or use fallback
    const cardImage = item.imagesUrl?.[0] || '/placeholder.jpg';

    return (
      <div className="pcard" key={item.id}>
        {/* Project Cover Image */}
        <div className="pcard-img">
          <img 
            src={cardImage} 
            alt={item.title} 
            loading="lazy" 
          />
        </div>

        <div className="pcard-body">
          <div className="pcard-top">
            <span className="loc">{item.location}</span>
            <span className="status ready">{item.rera ? 'MahaRERA Verified' : 'New Launch'}</span>
          </div>

          <h3>{item.title}</h3>
          <div className="divider" />

          <div className="meta">
            <div className="price">
              {item.price}
              <small>Starting Price</small>
            </div>
            <Link 
              href={`/projects/${item.slug}`} 
              className="btn btn-solid" 
              style={{ padding: '6px 14px', fontSize: '12px' }}
            >
              View Details →
            </Link>
          </div>
        </div>
      </div>
    );
  })}
</div>
      })}
      </section>

      <section id="markets" style={{ background: 'var(--stone-2)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Price snapshot</p>
            <h2>What each corridor costs, at a glance</h2>
            <p>Ranges pulled from current live listings in each corridor — useful for a first gut-check before you shortlist.</p>
          </div>

          <div className="table-wrap reveal">
            <table>
              <thead>
                <tr><th>Corridor</th><th>Anchor locality</th><th>Price range</th><th>Typical config mix</th></tr>
              </thead>
              <tbody>
                <tr><td className="loc-name">West IT Corridor</td><td>Hinjewadi, Wakad, Baner</td><td className="price-cell">₹75L – ₹8Cr</td><td>2–4 BHK</td></tr>
                <tr><td className="loc-name">East IT Corridor</td><td>Kharadi, Magarpatta</td><td className="price-cell">₹85L – ₹7.5Cr</td><td>2–4 BHK</td></tr>
                <tr><td className="loc-name">Riverside &amp; NW</td><td>Balewadi, Bavdhan</td><td className="price-cell">₹1.0Cr – ₹3.9Cr</td><td>2–3 BHK</td></tr>
                <tr><td className="loc-name">SW / Old Pune Fringe</td><td>Kothrud, NIBM</td><td className="price-cell">₹95L – ₹13Cr</td><td>2–4.5 BHK</td></tr>
                <tr><td className="loc-name">Affordable &amp; Industrial</td><td>Pimpri, Mamurdi, Punawale</td><td className="price-cell">₹52L – ₹3.2Cr</td><td>1–3 BHK</td></tr>
                <tr><td className="loc-name">Central Premium</td><td>Koregaon Park, Bund Garden</td><td className="price-cell">₹99L – ₹45Cr</td><td>3–6 BHK</td></tr>
              </tbody>
            </table>
          </div>
          <p className="table-note">Ranges reflect listed unit prices across current projects in each corridor and will shift as new phases launch.</p>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Who&apos;s building</p>
            <h2>Developers active in Pune right now</h2>
          </div>
          <div className="builder-row reveal">
            {[
              'Godrej Properties', 'Lodha Group', 'Kolte Patil Developers', 'Shapoorji Pallonji Group',
              'VTP Realty', 'Vilas Javdekar Developers', 'Mahindra Lifespace', 'Gera Developer',
              'Hiranandani Group', 'Puravankara Group', 'Birla Estates', 'Kalpataru Group',
              'Sobha Limited', 'Adani Realty',
            ].map((name) => (
              <span className="chip" key={name}>{name}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="guides" style={{ background: 'var(--stone-2)' }}>
        <div className="wrap">
          <div className="section-head reveal">
            <p className="eyebrow">Before you sign anything</p>
            <h2>Guides for first-time Pune buyers</h2>
            <p>The paperwork and math that site-visit sales teams tend to gloss over.</p>
          </div>

          <div className="guide-grid reveal">
            <div className="gcard">
              <span className="num">01 · Legal</span>
              <h3>MahaRERA registration, and what it actually protects</h3>
              <p>Every project on this page should carry a MahaRERA number — here&apos;s how to verify one, and what it does and doesn&apos;t guarantee about delivery timelines.</p>
              <span className="read">Read the guide →</span>
            </div>
            <div className="gcard">
              <span className="num">02 · Measurement</span>
              <h3>Carpet area vs built-up vs super built-up</h3>
              <p>Why the sqft figure on the brochure isn&apos;t the sqft figure you&apos;ll actually live in, and how the loading percentage changes the real price per square foot.</p>
              <span className="read">Read the guide →</span>
            </div>
            <div className="gcard">
              <span className="num">03 · Financing</span>
              <h3>Home loans: LTV, pre-EMI, and the fine print</h3>
              <p>How loan-to-value ratios work for under-construction property, what pre-EMI actually costs you, and the documents banks ask for in Pune specifically.</p>
              <span className="read">Read the guide →</span>
            </div>
            <div className="gcard">
              <span className="num">04 · Timing</span>
              <h3>Ready-to-move vs under-construction, honestly compared</h3>
              <p>The GST difference, the possession-delay risk, and why the &quot;price gap&quot; between the two is usually smaller than it first looks.</p>
              <span className="read">Read the guide →</span>
            </div>
          </div>
        </div>
      </section>

      <div className="cta-band">
        <div className="wrap">
          <h2>Talk to someone who isn&apos;t on commission from a single builder.</h2>
          <p>Tell us your corridor, budget and timeline — we&apos;ll shortlist three projects worth an actual site visit.</p>
          <a href="#" className="btn">Get a shortlist</a>
        </div>
      </div>

      <footer>
        <div className="wrap">
          <div className="foot-grid">
            <div>
              <div className="logo">Pune<span>Square</span></div>
              <p className="about">An independent, informational guide to Pune&apos;s residential real estate — corridors, current launches, and the paperwork that matters. Not a brokerage.</p>
            </div>
            <div>
              <h5>Explore</h5>
              <ul>
                <li><a href="#corridors">Corridor map</a></li>
                <li><a href="#projects">Featured projects</a></li>
                <li><a href="#markets">Price snapshot</a></li>
              </ul>
            </div>
            <div>
              <h5>Corridors</h5>
              <ul>
                <li><a href="#corridors">Hinjewadi–Wakad–Baner</a></li>
                <li><a href="#corridors">Kharadi–Magarpatta</a></li>
                <li><a href="#corridors">Kothrud–NIBM</a></li>
              </ul>
            </div>
            <div>
              <h5>Guides</h5>
              <ul>
                <li><a href="#guides">MahaRERA basics</a></li>
                <li><a href="#guides">Carpet vs built-up area</a></li>
                <li><a href="#guides">Home loan basics</a></li>
              </ul>
            </div>
          </div>
          <div className="foot-bottom">
            <span>© 2026 Pune Square. Informational content only — verify project and pricing details directly with the developer.</span>
            <span>Pune, Maharashtra</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        /* Global Mobile Fixes */
        .wrap {
          width: 100%;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
          box-sizing: border-box;
        }

        .nav-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 16px;
        }

        nav ul {
          display: flex;
          gap: 16px;
          list-style: none;
          padding: 0;
          margin: 0;
          flex-wrap: wrap;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          align-items: center;
          padding: 40px 16px;
        }

        .hero-art svg {
          width: 100%;
          height: auto;
          max-width: 480px;
        }

        .stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          padding: 24px 16px;
        }

        .corridor-rail {
          overflow-x: auto;
          padding-bottom: 16px;
          -webkit-overflow-scrolling: touch;
        }

        .corridor-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding: 0 16px;
        }

        .section-head-flex {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 16px;
        }

        .table-wrap {
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .guide-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }

        .foot-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 32px;
          padding: 40px 16px;
        }

        .foot-bottom {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding: 20px 16px;
          border-top: 1px solid rgba(0, 0, 0, 0.1);
        }

        /* Finder Section Styles */
        .finder {
          margin-top: 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .finder-bar {
          display: flex;
          align-items: center;
          gap: 4px;
          background: #fff;
          border: 1px solid rgba(20, 20, 20, 0.09);
          border-radius: 999px;
          padding: 6px;
          box-shadow: 0 1px 2px rgba(20, 20, 20, 0.04);
          flex-wrap: wrap;
        }

        .finder-field {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          color: var(--ink-soft);
        }

        .finder-search {
          flex: 1 1 220px;
          min-width: 180px;
        }

        .finder-search input {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          width: 100%;
          color: inherit;
          font-family: inherit;
        }

        .finder-search input::placeholder {
          color: var(--ink-soft);
          opacity: 0.75;
        }

        .finder-divider {
          width: 1px;
          height: 24px;
          background: rgba(20, 20, 20, 0.08);
          flex: 0 0 auto;
        }

        .finder select {
          border: none;
          outline: none;
          background: transparent;
          font-size: 14px;
          padding: 10px 12px;
          border-radius: 999px;
          color: var(--ink, #1c1c1c);
          font-family: inherit;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .finder select:hover,
        .finder select:focus {
          background: var(--stone-2, #f2efe9);
        }

        .finder-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 6px;
          font-size: 13px;
          color: var(--ink-soft);
        }

        .finder-clear {
          border: none;
          background: none;
          color: var(--brick, #9e4429);
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          padding: 0;
        }

        .finder-clear:hover {
          text-decoration: underline;
        }

        /* Mobile Breakpoint Adjustments */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-actions {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .hero-art {
            display: flex;
            justify-content: center;
          }

          .nav-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .nav-cta {
            width: 100%;
            text-align: center;
          }
        }

        @media (max-width: 640px) {
          .finder-bar {
            border-radius: 16px;
            flex-direction: column;
            align-items: stretch;
            padding: 8px;
          }

          .finder-divider {
            display: none;
          }

          .finder select {
            width: 100%;
            border: 1px solid rgba(20, 20, 20, 0.08);
            border-radius: 8px;
            padding: 10px;
          }

          .finder-search {
            border: 1px solid rgba(20, 20, 20, 0.08);
            border-radius: 8px;
          }
        }
      `}</style>
    </>
  );
}
