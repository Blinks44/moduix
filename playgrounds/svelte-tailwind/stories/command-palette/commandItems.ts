import type { Component } from 'svelte';
import { PlusIcon } from '@/lib/moduix/icons/ui';
import ArrowUpRightIcon from './ArrowUpRightIcon.svelte';
import StarIcon from './StarIcon.svelte';

export type CommandItem = {
  id: string;
  section: string;
  label: string;
  description: string;
  shortcut?: string;
  icon: Component;
};

export type ActionCommandItem = CommandItem & { onSelect: () => void };

export const commandItems: CommandItem[] = [
  {
    id: 'new-project',
    section: 'Create',
    label: 'New project',
    description: 'Start a blank workspace',
    shortcut: 'N',
    icon: PlusIcon,
  },
  {
    id: 'invite-team',
    section: 'Create',
    label: 'Invite teammates',
    description: 'Send access to the current organization',
    shortcut: 'I',
    icon: PlusIcon,
  },
  {
    id: 'recent',
    section: 'Navigate',
    label: 'Open recent work',
    description: 'Jump back to a recently edited file',
    shortcut: 'R',
    icon: ArrowUpRightIcon,
  },
  {
    id: 'favorites',
    section: 'Navigate',
    label: 'View favorites',
    description: 'Show pinned dashboards and docs',
    shortcut: 'F',
    icon: StarIcon,
  },
  {
    id: 'notifications',
    section: 'System',
    label: 'Notification settings',
    description: 'Tune email and product alerts',
    icon: StarIcon,
  },
  {
    id: 'release-notes',
    section: 'System',
    label: 'Release notes',
    description: 'Read the latest product changes',
    icon: ArrowUpRightIcon,
  },
];