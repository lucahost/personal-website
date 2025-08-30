/**
 * Project-related TypeScript interfaces and types
 * @module types/project
 */

export type ProjectCategory = 'web' | 'mobile' | 'research' | 'game';

export interface Project {
  id: string;
  title: string;
  year: string;
  description: string;
  image: string;
  technologies: readonly string[];
  category: ProjectCategory;
  githubUrl?: string;
  liveUrl?: string;
  pdfUrl?: string;
  featured?: boolean;
}

export type ProjectCounts = Record<ProjectCategory | 'all', number>;

export interface ProjectFiltersProps {
  selectedCategory: string;
  viewMode: 'grid' | 'list';
  projectCounts: ProjectCounts;
  onCategoryChange: (category: string) => void;
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export interface ProjectCardProps {
  project: Project;
  viewMode: 'grid' | 'list';
  index: number;
  categoryColor: string;
  categoryIcon: React.ReactElement;
}