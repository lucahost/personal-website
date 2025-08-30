import { useState, useMemo, useCallback } from 'react';

export const useProjects = (initialProjects: any[]) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Memoized filtered projects based on category and search
   */
  const filteredProjects = useMemo(() => {
    let filtered = [...initialProjects];

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.technologies.some((tech: string) => tech.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [initialProjects, selectedCategory, searchQuery]);

  const projectCounts = useMemo(() => {
    const counts = {
      all: initialProjects.length,
      web: 0,
      mobile: 0,
      research: 0,
      game: 0,
    };

    initialProjects.forEach((project: any) => {
      const category = project.category;
      if (category === 'web') counts.web++;
      else if (category === 'mobile') counts.mobile++;
      else if (category === 'research') counts.research++;
      else if (category === 'game') counts.game++;
    });

    return counts;
  }, [initialProjects]);

  /**
   * Featured projects for highlighting
   */
  const featuredProjects = useMemo(
    () => initialProjects.filter(p => p.featured),
    [initialProjects]
  );

  /**
   * Handle category change with validation
   */
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  /**
   * Handle search query change
   */
  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  /**
   * Reset all filters
   */
  const resetFilters = useCallback(() => {
    setSelectedCategory('all');
    setSearchQuery('');
  }, []);

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
  };
};