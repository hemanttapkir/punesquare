import { supabase } from './supabase';

export interface FloorPlan {
  typology: string;
  carpetArea: string;
  price: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  location: string;
  price: string;
  rera?: string;
  description?: string;
  imagesUrl?: string[];
  floorPlans?: FloorPlan[];
  amenities?: string[];
  specs?: string;
  landmarks?: string[];
  lat?: number;
  lng?: number;
}

// Supabase stores columns in snake_case; the app works in camelCase.
// These two helpers translate between the two shapes.
function fromRow(row: any): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    price: row.price,
    rera: row.rera ?? undefined,
    description: row.description ?? undefined,
    imagesUrl: row.images_url ?? undefined,
    floorPlans: row.floor_plans ?? undefined,
    amenities: row.amenities ?? undefined,
    specs: row.specs ?? undefined,
    landmarks: row.landmarks ?? undefined,
    lat: row.lat ?? undefined,
    lng: row.lng ?? undefined,
  };
}

function toRow(project: Omit<Project, 'id' | 'slug'>, slug: string) {
  return {
    slug,
    title: project.title,
    location: project.location,
    price: project.price,
    rera: project.rera ?? null,
    description: project.description ?? null,
    images_url: project.imagesUrl ?? null,
    floor_plans: project.floorPlans ?? null,
    amenities: project.amenities ?? null,
    specs: project.specs ?? null,
    landmarks: project.landmarks ?? null,
    lat: project.lat ?? null,
    lng: project.lng ?? null,
  };
}

export async function getProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('getProjects error:', error.message);
    return [];
  }

  return (data ?? []).map(fromRow);
}

export async function saveProject(project: Omit<Project, 'id' | 'slug'>): Promise<Project | null> {
  const slug = project.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

  const { data, error } = await supabase
    .from('projects')
    .insert(toRow(project, slug))
    .select()
    .single();

  if (error) {
    console.error('saveProject error:', error.message);
    return null;
  }

  return fromRow(data);
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (error || !data) {
    if (error) console.error('getProjectBySlug error:', error.message);
    return undefined;
  }

  return fromRow(data);
}
