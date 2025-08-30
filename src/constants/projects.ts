import biergit from '../common/img/biergit.png';
import uno from '../common/img/uno.png';
import go from '../common/img/go.png';
import muuvy from '../common/img/muuvy.png';
import portal from '../common/img/portal.png';
import drugstore from '../common/img/drugstore.png';
import network from '../common/img/network.png';
import smartContracts from '../common/img/smartContracts.png';
import thesis from '../common/img/thesis.png';
import type { Project, ProjectCategory } from '../types';

export const PROJECTS_DATA: readonly Project[] = [
  {
    id: 'thesis',
    title: 'Quantitative Analysis of Graph Metrics',
    year: '2023',
    description: 'Bachelor thesis exploring network analysis and data science methodologies for graph metric evaluation.',
    image: thesis,
    technologies: ['Network Analysis', 'Data Science', 'Research', 'Python'],
    category: 'research',
    githubUrl: 'https://github.com/lucahost/bachelor-thesis',
    pdfUrl: 'https://hostettler.io/static/media/thesis-hostettler.pdf',
    featured: true,
  },
  {
    id: 'smart-contracts',
    title: 'Ethereum Smart Contracts',
    year: '2022',
    description: 'Development and deployment of smart contracts on the Ethereum blockchain with a React frontend.',
    image: smartContracts,
    technologies: ['Solidity', 'React', 'Web3', 'Ethereum'],
    category: 'web',
    githubUrl: 'https://github.com/lucahost/eth-smart-contracts',
    pdfUrl: 'https://hostettler.io/static/media/smart-contracts.pdf',
    featured: true,
  },
  {
    id: 'portal-vr',
    title: 'Portal VR',
    year: '2021-2022',
    description: 'Virtual reality puzzle game inspired by Portal, built with Unity and C#.',
    image: portal,
    technologies: ['Unity', 'C#', 'VR', 'Game Development'],
    category: 'game',
    githubUrl: 'https://github.com/lucahost/portal-vr',
    featured: true,
  },
  {
    id: 'network-analysis',
    title: 'Network Analysis',
    year: '2021-2022',
    description: 'Academic research project analyzing complex network structures and their properties.',
    image: network,
    technologies: ['Python', 'NetworkX', 'Data Analysis', 'Research'],
    category: 'research',
    githubUrl: 'https://github.com/lucahost/ffhs-na',
    pdfUrl: 'https://hostettler.io/static/media/network-analysis.pdf',
  },
  {
    id: 'drugstore',
    title: 'Drugstore App',
    year: '2021-2022',
    description: 'Android application for pharmacy management and medication tracking.',
    image: drugstore,
    technologies: ['Java', 'Android', 'SQLite', 'Material Design'],
    category: 'mobile',
    githubUrl: 'https://github.com/lucahost/drugstore',
  },
  {
    id: 'go',
    title: 'GO Game',
    year: '2021',
    description: 'Web-based implementation of the ancient board game GO with WebWorkers for AI opponents.',
    image: go,
    technologies: ['Next.js', 'TypeScript', 'WebWorkers', 'Game AI'],
    category: 'game',
    liveUrl: 'https://go.hostettler.io',
  },
  {
    id: 'biergit',
    title: 'BierGit',
    year: '2019-2020',
    description: 'Social platform for beer enthusiasts to share and discover craft beers.',
    image: biergit,
    technologies: ['Spring Boot', 'React', 'PostgreSQL', 'REST API'],
    category: 'web',
    githubUrl: 'https://github.com/biergit-ch',
  },
  {
    id: 'uno',
    title: 'UNO Game',
    year: '2019',
    description: 'Desktop implementation of the classic UNO card game with multiplayer support.',
    image: uno,
    technologies: ['JavaFX', 'Game Logic', 'Multiplayer', 'UI/UX'],
    category: 'game',
    githubUrl: 'https://github.com/booooza/swe2-uno',
  },
  {
    id: 'muuvy',
    title: 'Muuvy',
    year: '2019',
    description: 'Movie discovery and tracking application built with Vaadin framework.',
    image: muuvy,
    technologies: ['Vaadin', 'Java', 'TMDb API', 'Material Design'],
    category: 'web',
    githubUrl: 'https://github.com/muuvy',
  },
];

export const CATEGORY_COLORS: Record<ProjectCategory, string> = {
  web: '#2196F3',
  mobile: '#4CAF50',
  research: '#FF9800',
  game: '#9C27B0',
} as const;