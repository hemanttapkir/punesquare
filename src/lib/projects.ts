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
  
  export function getProjects(): Project[] {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem('pune_projects');
    return stored ? JSON.parse(stored) : [];
  }
  
  export function saveProject(project: Omit<Project, 'id' | 'slug'>): Project {
    const projects = getProjects();
    const slug = project.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  
    const newProject: Project = { ...project, id: Date.now().toString(), slug };
    localStorage.setItem('pune_projects', JSON.stringify([newProject, ...projects]));
    return newProject;
  }
  
  export function getProjectBySlug(slug: string): Project | undefined {
    return getProjects().find((p) => p.slug === slug);
  }