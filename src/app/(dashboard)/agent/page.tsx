'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { saveProject, FloorPlan } from '@/lib/projects';

const AVAILABLE_AMENITIES = [
  'Infinity Swimming Pool', 'Gymnasium', 'Grand Clubhouse', 'Amphitheatre',
  'Kids Play Area', 'Yoga & Meditation Zone', 'Co-Working Space',
  '24x7 Security & CCTV', 'Power Backup', 'Landscaped Gardens'
];

export default function AgentPortal() {
  const router = useRouter();
  const [formData, setFormData] = useState({ title: '', location: '', price: '', rera: '', description: '', specs: '', landmarks: '' });
  const [imagesUrl, setImagesUrl] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [floorPlans, setFloorPlans] = useState<FloorPlan[]>([
    { typology: '2 BHK', carpetArea: '808 sq.ft.', price: '₹96.3 L' },
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const toggleAmenity = (item: string) => {
    setAmenities(prev => prev.includes(item) ? prev.filter(a => a !== item) : [...prev, item]);
  };

  const addFloorPlan = () => {
    setFloorPlans([...floorPlans, { typology: '3 BHK', carpetArea: '1062 sq.ft.', price: '₹1.25 Cr' }]);
  };

  const handleMultipleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Promise.all(Array.from(files).map(file => new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      }))).then(imgs => setImagesUrl(imgs));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const created = await saveProject({
        ...formData,
        imagesUrl,
        floorPlans,
        amenities,
        landmarks: formData.landmarks.split(',').map(s => s.trim()).filter(Boolean),
      });

      // Guard against a null result or missing slug before routing
      if (created && created.slug) {
        router.push(`/projects/${created.slug}`);
        return;
      }

      console.error('Failed to generate project slug:', created);
      setSubmitError('Could not publish this listing. Please check the fields and try again.');
    } catch (err) {
      console.error('saveProject threw:', err);
      setSubmitError('Something went wrong while publishing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="agent-wrap">
      <h1>Publish Property Details</h1>
      <form onSubmit={handleSubmit} className="agent-form">
        
        {/* Core Info */}
        <div className="core-info-grid">
          <input type="text" placeholder="Project Name (e.g. Yashada Evo)" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="form-input" />
          <input type="text" placeholder="Location (e.g. Punawale, Pune)" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="form-input" />
          <input type="text" placeholder="Starting Price (e.g. ₹96.3 L - ₹2.01 Cr)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="form-input" />
          <input type="text" placeholder="MahaRERA Registration Number" value={formData.rera} onChange={e => setFormData({...formData, rera: e.target.value})} className="form-input" />
        </div>

        {/* Overview Description */}
        <div>
          <label className="form-label" style={{ display: 'block', marginBottom: '4px' }}>Project Overview</label>
          <textarea rows={3} placeholder="Brief summary of the development, builder highlights..." value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="form-input" />
        </div>

        {/* Gallery */}
        <div>
          <label className="form-label">Project Gallery Images</label>
          <input type="file" accept="image/*" multiple onChange={handleMultipleImages} style={{ width: '100%', marginTop: '6px' }} />
        </div>

        {/* Configurations / Floor Plans */}
        <div>
          <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Floor Plans & Typologies</label>
          {floorPlans.map((fp, i) => (
            <div key={i} className="floor-plan-row">
              <input type="text" value={fp.typology} onChange={e => { const copy = [...floorPlans]; copy[i].typology = e.target.value; setFloorPlans(copy); }} placeholder="Typology" className="form-input" />
              <input type="text" value={fp.carpetArea} onChange={e => { const copy = [...floorPlans]; copy[i].carpetArea = e.target.value; setFloorPlans(copy); }} placeholder="Carpet Area" className="form-input" />
              <input type="text" value={fp.price} onChange={e => { const copy = [...floorPlans]; copy[i].price = e.target.value; setFloorPlans(copy); }} placeholder="Price" className="form-input" />
            </div>
          ))}
          <button type="button" onClick={addFloorPlan} className="btn" style={{ fontSize: '12px', marginTop: '4px' }}>+ Add Configuration</button>
        </div>

        {/* Amenities Selection */}
        <div>
          <label className="form-label" style={{ display: 'block', marginBottom: '8px' }}>Select Project Amenities</label>
          <div className="amenities-grid">
            {AVAILABLE_AMENITIES.map(item => (
              <label key={item} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="checkbox" checked={amenities.includes(item)} onChange={() => toggleAmenity(item)} />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Specifications & Landmarks */}
        <textarea rows={2} placeholder="Specifications (e.g. 800x1600mm Vitrified Tiles, Gypsum Finish, Concealed Wiring)" value={formData.specs} onChange={e => setFormData({...formData, specs: e.target.value})} className="form-input" />
        <input type="text" placeholder="Nearby Landmarks (Comma separated: Hinjewadi IT Park, DY Patil University, Sai Mall)" value={formData.landmarks} onChange={e => setFormData({...formData, landmarks: e.target.value})} className="form-input" />

        {submitError && (
          <p style={{ color: '#9E4429', fontSize: '13px', margin: 0 }}>{submitError}</p>
        )}

        <button
          type="submit"
          className="btn btn-solid"
          style={{ width: '100%', padding: '12px', opacity: isSubmitting ? 0.6 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Publishing…' : 'Publish Complete Listing →'}
        </button>
      </form>

      <style jsx>{`
        .agent-wrap {
          width: 100%;
          max-width: 1000px;
          margin: 0 auto;
          padding: 40px 20px;
          box-sizing: border-box;
        }

        .agent-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
          background: var(--stone-2, #f2efe9);
          padding: 32px;
          border: 1px solid var(--line, rgba(0, 0, 0, 0.1));
          margin-top: 20px;
          box-sizing: border-box;
        }

        .core-info-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
        }

        .floor-plan-row {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
          margin-bottom: 8px;
        }

        .amenities-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 10px;
        }

        .form-label {
          font-size: 12px;
          font-weight: 600;
        }

        .form-input {
          padding: 10px;
          width: 100%;
          box-sizing: border-box;
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-radius: 4px;
        }

        @media (max-width: 640px) {
          .agent-wrap {
            padding: 20px 12px;
          }

          .agent-form {
            padding: 16px;
          }

          .core-info-grid,
          .floor-plan-row {
            grid-template-columns: 1fr;
          }

          .amenities-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
          }
        }
      `}</style>
    </div>
  );
}
