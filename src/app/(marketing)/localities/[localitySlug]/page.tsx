'use client';

import React from 'react';
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header>
        <div className="wrap nav-inner">
          <div className="logo">
            Compass<span>Pune</span>
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

            <form className="search-card" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label htmlFor="loc">Corridor</label>
                <select id="loc">
                  <option>Hinjewadi–Wakad–Baner</option>
                  <option>Kharadi–Magarpatta–Hadapsar</option>
                  <option>Balewadi–Aundh–Bavdhan</option>
                  <option>Kothrud–Warje–NIBM</option>
                  <option>PCMC–Mamurdi–Punawale</option>
                  <option>Koregaon Park–Bund Garden</option>
                </select>
              </div>
              <div>
                <label htmlFor="bud">Budget</label>
                <select id="bud">
                  <option>Under ₹80L</option>
                  <option>₹80L – ₹1.5Cr</option>
                  <option>₹1.5Cr – ₹3Cr</option>
                  <option>₹3Cr and above</option>
                </select>
              </div>
              <div>
                <label htmlFor="bhk">Configuration</label>
                <select id="bhk">
                  <option>1–2 BHK</option>
                  <option>3 BHK</option>
                  <option>4 BHK and above</option>
                </select>
              </div>
              <button className="search-btn" type="submit">Search →</button>
            </form>
          </div>

          <div className="hero-art">
            <svg
              className="skyline"
              viewBox="0 0 480 420"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Illustration of Pune hills and skyline with a growth corridor line"
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
        <div className="wrap">
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
            {[
              {
                node: '01', tag: 'West IT Corridor', title: 'Hinjewadi – Wakad – Baner',
                desc: 'Anchored by Rajiv Gandhi Infotech Park. Highest concentration of new launches in the city.',
                range: '₹75L – ₹8Cr', sub: 'Studio to 5BHK penthouse',
              },
              {
                node: '02', tag: 'East IT Corridor', title: 'Kharadi – Magarpatta – Hadapsar',
                desc: 'EON IT Park and Magarpatta City drive demand. Fastest-growing rental yields in Pune.',
                range: '₹85L – ₹7.5Cr', sub: '2BHK to 4BHK villas',
              },
              {
                node: '03', tag: 'Riverside & NW', title: 'Balewadi – Aundh – Bavdhan',
                desc: 'Established residential belt near the Mula-Mutha, close to both IT corridors.',
                range: '₹1.0Cr – ₹3.9Cr', sub: 'Mid to upper-mid segment',
              },
              {
                node: '04', tag: 'SW / Old Pune Fringe', title: 'Kothrud – Warje – NIBM',
                desc: 'Legacy Pune neighbourhoods redeveloping fast, walkable to the old city core.',
                range: '₹95L – ₹13Cr', sub: 'Widest price spread in the city',
              },
              {
                node: '05', tag: 'Affordable & Industrial', title: 'PCMC – Mamurdi – Punawale',
                desc: "Pimpri-Chinchwad's industrial base plus new affordable-housing supply.",
                range: '₹52L – ₹3.2Cr', sub: 'Best entry-level value',
              },
              {
                node: '06', tag: 'Central Premium', title: 'Koregaon Park – Bund Garden',
                desc: "Pune's oldest premium address. Low supply, and it shows in the price ceiling.",
                range: '₹99L – ₹45Cr', sub: "City's ultra-luxury pocket",
              },
            ].map((s) => (
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
          <div className="section-head reveal">
            <p className="eyebrow">Featured launches</p>
            <h2>A cross-section of what&apos;s actually selling right now</h2>
            <p>Picked to span every corridor and every budget band — from a ₹55L 1BHK in Manjari to a ₹45Cr penthouse on Bund Garden Road.</p>
          </div>

          <div className="project-grid reveal">
            {[
              { loc: 'Hinjewadi', status: 'Dec 2029', ready: false, name: 'Shapoorji Joyville Vyomora', builder: 'Shapoorji Pallonji Group', price: '₹84.99L – 1.89Cr', config: '2–3 BHK', sqft: '685–1434 sqft' },
              { loc: 'Kharadi', status: 'Aug 2032', ready: false, name: 'Godrej Ivara', builder: 'Godrej Properties', price: '₹1.15Cr – 2.94Cr', config: '2–4 BHK', sqft: '729–1580 sqft' },
              { loc: 'Bhugaon', status: 'Jun 2031', ready: false, name: 'Kolte Patil The Winds', builder: 'Kolte Patil Developers', price: '₹79.50L – 1.05Cr', config: '2–3 BHK', sqft: '765–1001 sqft' },
              { loc: 'Balewadi', status: 'Mar 2030', ready: false, name: 'VJ Palladio Presidential Suites', builder: 'Vilas Javdekar Developers', price: '₹1.50Cr – 2.50Cr', config: '3–4 BHK', sqft: '1073–1590 sqft' },
              { loc: 'Kothrud', status: 'Mar 2027', ready: false, name: 'Sobha Nesara', builder: 'Sobha Limited', price: '₹2.12Cr – 5.55Cr', config: '3–4.5 BHK', sqft: '1068–2387 sqft' },
              { loc: 'Mundhwa', status: 'Ready', ready: true, name: 'Adani Atelier Greens', builder: 'Adani Realty', price: '₹1.52Cr – 4.63Cr', config: '2–4.5 BHK', sqft: '877–2261 sqft' },
              { loc: 'Manjari', status: 'Jun 2031', ready: false, name: 'Birla Evam', builder: 'Birla Estates', price: '₹55.00L – 1.36Cr', config: '1–3 BHK', sqft: '517–1122 sqft' },
              { loc: 'Bund Garden', status: 'Apr 2028', ready: false, name: 'Lodha One', builder: 'Lodha Group', price: '₹22.60Cr – 45.20Cr', config: '5–6 BHK', sqft: '6000–10000 sqft' },
            ].map((p) => (
              <div className="pcard" key={p.name}>
                <div className="pcard-top">
                  <span className="loc">{p.loc}</span>
                  <span className={`status${p.ready ? ' ready' : ''}`}>{p.status}</span>
                </div>
                <h3>{p.name}</h3>
                <p className="builder">{p.builder}</p>
                <div className="divider" />
                <div className="meta">
                  <div className="price">{p.price}<small>All-inclusive</small></div>
                  <div className="config">{p.config}<br />{p.sqft}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
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
              <div className="logo">Compass<span>Pune</span></div>
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
            <span>© 2026 Compass Pune. Informational content only — verify project and pricing details directly with the developer.</span>
            <span>Pune, Maharashtra</span>
          </div>
        </div>
      </footer>

    </>
  );
}
