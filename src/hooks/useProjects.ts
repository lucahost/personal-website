import type { Project, ProjectCounts } from '../types'
import { useCallback, useMemo, useState } from 'react'

export function useProjects(initialProjects: readonly Project[]) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  /**
   * Memoized filtered projects based on category and search
   * Sorted by featured first, then by year descending
   */
  const filteredProjects = useMemo(() => {
    let filtered = [...initialProjects]

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory)
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query)
        || p.description.toLowerCase().includes(query)
        || p.technologies.some(tech => tech.toLowerCase().includes(query)),
      )
    }

    // Sort by featured first, then by year descending
    filtered.sort((a, b) => {
      if (a.featured && !b.featured)
        return -1
      if (!a.featured && b.featured)
        return 1
      return b.year.localeCompare(a.year)
    })

    return filtered
  }, [initialProjects, selectedCategory, searchQuery])

  const projectCounts = useMemo((): ProjectCounts => {
    const counts: ProjectCounts = {
      all: initialProjects.length,
      web: 0,
      mobile: 0,
      research: 0,
      game: 0,
    }

    initialProjects.forEach((project) => {
      const category = project.category
      if (category in counts) {
        counts[category]++
      }
    })

    return counts
  }, [initialProjects])

  /**
   * Featured projects for highlighting
   */
  const featuredProjects = useMemo(
    () => initialProjects.filter(p => p.featured),
    [initialProjects],
  )

  /**
   * Handle category change with validation
   */
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category)
  }, [])

  /**
   * Handle search query change
   */
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(() => {
    setSelectedCategory('all')
    setSearchQuery('')
  }, [])

  return {
    // State
    selectedCategory,
    searchQuery,

    // Computed
    filteredProjects,
    projectCounts,
    featuredProjects,
    hasActiveFilters: selectedCategory !== 'all' || searchQuery !== '',

    // Actions
    handleCategoryChange,
    handleSearchChange,
    resetFilters,
  }
}
