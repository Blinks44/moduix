export type Page = 'Projects' | 'Team' | 'Reports' | 'Settings';

export type Project = {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Paused' | 'Archived';
  owner: string;
  updated: string;
};

export type ProjectDraft = Omit<Project, 'id' | 'updated'>;

export const owners = ['Ada Lovelace', 'Grace Hopper', 'Alan Turing', 'Katherine Johnson'];
export const statuses = ['Active', 'Paused', 'Archived'] as const;

// Replace these sample rows with your API. Changes in the starter stay in memory.
export const initialProjects: Project[] = [
  {
    id: 'website',
    name: 'Website redesign',
    description: 'Marketing site and blog',
    status: 'Active',
    owner: 'Ada Lovelace',
    updated: '2 hours ago',
  },
  {
    id: 'mobile',
    name: 'Mobile onboarding',
    description: 'Sign-up flow for iOS and Android',
    status: 'Active',
    owner: 'Grace Hopper',
    updated: 'Yesterday',
  },
  {
    id: 'billing',
    name: 'Billing migration',
    description: 'Move invoices to the new provider',
    status: 'Paused',
    owner: 'Alan Turing',
    updated: 'Oct 28',
  },
  {
    id: 'tokens',
    name: 'Design tokens',
    description: 'Shared colors, spacing and type',
    status: 'Active',
    owner: 'Ada Lovelace',
    updated: 'Oct 24',
  },
  {
    id: 'legacy',
    name: 'Legacy dashboard',
    description: 'Read-only since v2',
    status: 'Archived',
    owner: 'Katherine Johnson',
    updated: 'Sep 12',
  },
];

export const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('');