/**
 * Project-related TypeScript interfaces and types
 * @module types/project
 */

export type ProjectCategory = 'web' | 'mobile' | 'research' | 'game'

export interface Project {
  id: string
  title: string
  year: string
  description: string
  image: string
  technologies: readonly string[]
  category: ProjectCategory
  githubUrl?: string
  liveUrl?: string
  pdfUrl?: string
  featured?: boolean
}

export type ProjectCounts = Record<ProjectCategory | 'all', number>

export interface ProjectFiltersProps {
  selectedCategory: string
  projectCounts: ProjectCounts
  onCategoryChange: (category: string) => void
}

export interface ProjectCardProps {
  project: Project
  index: number
  categoryColor: string
  categoryIcon: React.ReactElement
}
