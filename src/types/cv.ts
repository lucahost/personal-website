/**
 * CV / résumé TypeScript interfaces
 * @module types/cv
 */

/** A single role held within a company (companies can have a progression of roles) */
export interface Role {
  title: string
  period: string
  description: string
  /** Optional external link to a product or result of this role */
  link?: { label: string, url: string }
}

/** An experience entry: one company, one or more roles */
export interface ExperienceEntry {
  id: string
  company: string
  /** Short descriptor of the company, e.g. "Switzerland's largest online retailer" */
  context: string
  location: string
  period: string
  /** Marks a currently-held position */
  current?: boolean
  /** Marks a concurrent / parallel commitment (e.g. militia service) */
  parallel?: boolean
  roles: readonly Role[]
}

/** A run of text within an impact statement; `em` marks the stat/phrase to highlight */
export interface HighlightSegment {
  text: string
  em?: boolean
}

/** An impact statement, rendered as a sentence with its key stat/phrase emphasized inline */
export interface Highlight {
  id: string
  segments: readonly HighlightSegment[]
}

/** A grouped set of skills with a monospace prefix */
export interface SkillGroup {
  /** Monospace key shown before the group, e.g. "architecture" */
  key: string
  items: readonly string[]
}

/** An education entry */
export interface EducationEntry {
  id: string
  school: string
  degree: string
  period: string
  detail?: string
}
