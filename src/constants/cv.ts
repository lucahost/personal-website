/**
 * CV / résumé content
 * Source of truth: LinkedIn (most current) + personal CV.
 * Copy is framed around impact, scale and ownership.
 * @module constants/cv
 */

import type { EducationEntry, ExperienceEntry, Highlight, SkillGroup } from '../types/cv'

/** Public path to the downloadable, print-friendly CV (no phone/references) */
export const CV_URL = '/static/media/luca-hostettler-cv.pdf'

/** Hero / intro copy */
export const PROFILE = {
  name: 'Luca Hostettler',
  role: 'Engineering Leader · Platforms & Frameworks',
  tagline: 'Designing resilient systems at scale — and growing the engineers who build them.',
  summary: 'Engineering leader in Zürich, building the internal frameworks and APIs other product teams build on at Digitec Galaxus, Switzerland’s largest online retailer — shaped around what each team actually needs to ship. I care about scalable architecture, pragmatic delivery, and lifting the people around me.',
  // Rendered as an editor-style code comment — relaxed, still professional.
  flavor: '// chaotic good — fueled by coffee & code',
  location: 'Zürich, Switzerland',
} as const

/**
 * Impact, shown as cards — each a short statement with its key stat/phrase highlighted.
 * Leads with people leadership, then delivery & scale.
 */
export const HIGHLIGHTS: readonly Highlight[] = [
  {
    id: 'team',
    segments: [
      { text: 'Founded and grew ' },
      { text: 'a new platform & frameworks team', em: true },
      { text: ' — hiring, onboarding and setting its technical direction.' },
    ],
  },
  {
    id: 'ai-adoption',
    segments: [
      { text: 'Drove ' },
      { text: 'AI-assisted engineering adoption', em: true },
      { text: ' across my area, with a hands-on workshop and the change management behind it.' },
    ],
  },
  {
    id: 'flash-delivery',
    segments: [
      { text: 'Helped ship the same-day delivery option now reaching ' },
      { text: '55% of Swiss households', em: true },
      { text: '.' },
    ],
  },
  {
    id: 'tenure',
    segments: [
      { text: '10+ years', em: true },
      { text: ' shipping production software, from full-stack apps to logistics platforms.' },
    ],
  },
  {
    id: 'military',
    segments: [
      { text: 'Planned and led military operations involving ' },
      { text: '300+ personnel', em: true },
      { text: ' as a specialist officer.' },
    ],
  },
  {
    id: 'intranet-admin',
    segments: [
      { text: 'Built a rule-based user & group sync product now running at ' },
      { text: '20+ schools', em: true },
      { text: ' and keeping ' },
      { text: '50,000+ users', em: true },
      { text: ' in sync.' },
    ],
  },
]

/** Work experience, most recent first */
export const EXPERIENCE: readonly ExperienceEntry[] = [
  {
    id: 'digitec-galaxus',
    company: 'Digitec Galaxus AG',
    context: 'Switzerland’s largest online retailer',
    location: 'Zürich',
    period: 'Feb 2023 — Present',
    current: true,
    roles: [
      {
        title: 'Team Lead, Software Engineering',
        period: 'Jun 2025 — Present',
        description: 'Lead a team building the core frameworks and internal APIs other engineering teams depend on, and drive adoption of AI tooling across the engineering organisation. Own hiring, mentoring and technical direction.',
      },
      {
        title: 'Senior Software Engineer',
        period: 'Aug 2024 — Jun 2025',
        description: 'Product-responsible for the logistics warehouse-transfer domain — enabling in-store pickup and orchestrating truck departures within tight delivery windows. Designed resilient, scalable services integrated with core ERP processes.',
      },
      {
        title: 'Software Engineer',
        period: 'Feb 2023 — Aug 2024',
        description: 'Joined the new last-mile team "Firefly" and helped build "Flash Delivery", the same-day delivery option now reaching 55% of Swiss customers.',
      },
    ],
  },
  {
    id: 'ise-ag',
    company: 'ISE AG Informatik Solutions',
    context: 'IT solutions & software house',
    location: 'Einsiedeln',
    period: 'Dec 2014 — Dec 2022',
    roles: [
      {
        title: 'Software Engineer (Full-stack)',
        period: '8 years',
        description: 'Designed, built and maintained customer-facing and internal applications across the full stack. Built ISE IntranetAdmin — a rule-based user & group synchronisation product, originally my HF diploma project — now shipped to 20+ schools and keeping 50,000+ users in sync across Entra ID and on-prem AD. Also led delivery of a multi-tenant ticketing platform for education-sector clients with CRM integration, and mentored apprentices.',
        link: { label: 'ise-intranetadmin', url: 'https://www.iseag.ch/loesungen/ise-intranetadmin/' },
      },
    ],
  },
  {
    id: 'visary',
    company: 'Visary',
    context: 'Donation-app startup',
    location: 'Switzerland',
    period: 'Apr 2018 — Jul 2019',
    parallel: true,
    roles: [
      {
        title: 'Java Backend Engineer',
        period: '1 yr 3 mos',
        description: 'Helped build the Spring Boot / Java backend for a Swiss startup modernising charitable giving — an app to make donating quick, safe and simple.',
      },
    ],
  },
  {
    id: 'abb',
    company: 'ABB',
    context: 'Global technology & engineering group',
    location: 'Zürich HQ',
    period: 'Aug 2012 — Dec 2014',
    roles: [
      {
        title: 'Application Developer',
        period: '2.5 years',
        description: 'Built and maintained "ABB Inside", the company intranet, and supported the global trainee programme.',
      },
    ],
  },
  {
    id: 'swiss-armed-forces',
    company: 'Swiss Armed Forces',
    context: 'Concurrent leadership commitment',
    location: 'Switzerland',
    period: 'Mar 2016 — Jul 2026',
    parallel: true,
    roles: [
      {
        title: 'Specialist Officer (Captain), Signals',
        period: 'Mar 2016 — Jul 2026',
        description: 'Deputy operations chief (S3) for a battalion. Planned and led operations involving 300+ personnel, coordinated the staff cell and ran brigade-level exercises.',
      },
    ],
  },
]

/** Skills, grouped under monospace keys */
export const SKILLS: readonly SkillGroup[] = [
  { key: 'architecture', items: ['Distributed systems', 'Event-driven design', 'Resilient & scalable services', 'API design'] },
  { key: 'backend', items: ['.NET / C#', 'ASP.NET Core', 'MSSQL', 'PostgreSQL', 'Node.js', 'Java', 'Go'] },
  { key: 'frontend', items: ['React', 'TypeScript', 'Next.js'] },
  { key: 'leadership', items: ['Team leadership', 'Hiring', 'Mentoring', 'Scrum', 'Stakeholder management'] },
  { key: 'foundations', items: ['Domain-driven design', 'Data Science', 'Network analysis', 'SQL', 'Testing (ISTQB)'] },
]

/** Education, most recent first */
export const EDUCATION: readonly EducationEntry[] = [
  {
    id: 'ffhs',
    school: 'FFHS — Fernfachhochschule Schweiz',
    degree: 'BSc Computer Science',
    period: '2020 — 2023',
    detail: 'Top 5% of cohort · Thesis: “Quantitative Analysis of Graph Metrics”',
  },
  {
    id: 'juventus',
    school: 'Juventus Schulen Zürich',
    degree: 'Dipl. Techniker HF, Software Development',
    period: '2017 — 2020',
    detail: 'Graduated top of class · 5.66 / 6 · Diploma project: “Rule-based User & Group Synchronisation” (ISE IntranetAdmin)',
  },
]

/** Compact credentials strip */
export const CREDENTIALS: readonly string[] = [
  'ISTQB Certified Tester',
  'Business English Certificate B2',
  'SVF Team / Group Leadership',
]

/** Languages */
export const LANGUAGES: readonly string[] = [
  'German (native)',
  'English (professional)',
  'French',
]
