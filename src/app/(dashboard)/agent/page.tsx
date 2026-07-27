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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = saveProject({
      ...formData,
      imagesUrl,
      floorPlans,
      amenities,
      landmarks: formData.landmarks.split(',').map(s => s.trim()).filter(Boolean),
    });
    router.push(`/projects/${created.slug}`);
  };

  return (
    <div className="wrap" style={{ padding: '40px 32px' }}>
      <h1>Publish Property Details</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px', background: 'var(--stone-2)', padding: '32px', border: '1px solid var(--line)', marginTop: '20px' }}>
        
        {/* Core Info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <input type="text" placeholder="Project Name (e.g. Yashada Evo)" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} style={{ padding: '10px' }} />
          <input type="text" placeholder="Location (e.g. Punawale, Pune)" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} style={{ padding: '10px' }} />
          <input type="text" placeholder="Starting Price (e.g. ₹96.3 L - ₹2.01 Cr)" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ padding: '10px' }} />
          <input type="text" placeholder="MahaRERA Registration Number" value={formData.rera} onChange={e => setFormData({...formData, rera: e.target.value})} style={{ padding: '10px' }} />
        </div>

        {/* Gallery */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600 }}>Project Gallery Images</label>
          <input type="file" accept="image/*" multiple onChange={handleMultipleImages} style={{ width: '100%', marginTop: '6px' }} />
        </div>

        {/* Configurations / Floor Plans */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Floor Plans & Typologies</label>
          {floorPlans.map((fp, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '8px' }}>
              <input type="text" value={fp.typology} onChange={e => { const copy = [...floorPlans]; copy[i].typology = e.target.value; setFloorPlans(copy); }} placeholder="Typology" />
              <input type="text" value={fp.carpetArea} onChange={e => { const copy = [...floorPlans]; copy[i].carpetArea = e.target.value; setFloorPlans(copy); }} placeholder="Carpet Area" />
              <input type="text" value={fp.price} onChange={e => { const copy = [...floorPlans]; copy[i].price = e.target.value; setFloorPlans(copy); }} placeholder="Price" />
            </div>
          ))}
          <button type="button" onClick={addFloorPlan} className="btn" style={{ fontSize: '12px' }}>+ Add Configuration</button>
        </div>

        {/* Amenities Selection */}
        <div>
          <label style={{ fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>Select Project Amenities</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
            {AVAILABLE_AMENITIES.map(item => (
              <label key={item} style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <input type="checkbox" checked={amenities.includes(item)} onChange={() => toggleAmenity(item)} />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Specifications & Landmarks */}
        <textarea rows={2} placeholder="Specifications (e.g. 800x1600mm Vitrified Tiles, Gypsum Finish, Concealed Wiring)" value={formData.specs} onChange={e => setFormData({...formData, specs: e.target.value})} style={{ padding: '10px' }} />
        <input type="text" placeholder="Nearby Landmarks (Comma separated: Hinjewadi IT Park, DY Patil University, Sai Mall)" value={formData.landmarks} onChange={e => setFormData({...formData, landmarks: e.target.value})} style={{ padding: '10px' }} />

        <button type="submit" className="btn btn-solid">Publish Complete Listing →</button>
      </form>
    </div>
  );
}