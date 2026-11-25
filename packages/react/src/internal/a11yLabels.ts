'use client';

import { createContext, createElement, useContext, useMemo, type ReactNode } from 'react';

// Default accessible labels for interactive fallbacks. Consumers override via LabelsProvider/ModuixProvider or aria-label/children.
export const defaultA11yLabels = {
  breadcrumb: 'Breadcrumb',
  clipboardCopied: 'Copied',
  clipboardCopy: 'Copy',
  clearInput: 'Clear input',
  clearSearch: 'Clear search',
  clearSelection: 'Clear selection',
  close: 'Close',
  closeDialog: 'Close dialog',
  closeDrawer: 'Close drawer',
  closeImage: 'Close image',
  closeModal: 'Close modal',
  closePanel: 'Close panel',
  closePopover: 'Close popover',
  closeTag: 'Remove tag',
  closeToast: 'Close toast',
  closeTour: 'Close tour',
  loading: 'Loading',
  moreActions: 'More actions',
  noResults: 'No results.',
  resizeSidebar: 'Resize sidebar',
  searchCommands: 'Search commands',
  toggleSidebar: 'Toggle sidebar',
} as const;

export type A11yLabels = {
  [K in keyof typeof defaultA11yLabels]: string;
};

export interface LabelsProviderProps {
  children?: ReactNode;
  labels?: Partial<A11yLabels>;
}

export const a11yLabels = defaultA11yLabels;

const A11yLabelsContext = createContext<A11yLabels>(defaultA11yLabels);

export function useA11yLabels(): A11yLabels {
  return useContext(A11yLabelsContext);
}

export function LabelsProvider({ children, labels }: LabelsProviderProps) {
  const parent = useA11yLabels();
  const value = useMemo<A11yLabels>(
    () => (labels ? { ...parent, ...labels } : parent),
    [parent, labels],
  );

  return createElement(A11yLabelsContext.Provider, { value }, children);
}