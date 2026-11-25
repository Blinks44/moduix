import { getContext, hasContext, setContext } from 'svelte';

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

export const a11yLabels = defaultA11yLabels;

const A11yLabelsKey = Symbol('moduix-a11y-labels');
const getDefaultLabels = (): A11yLabels => defaultA11yLabels;

export function useA11yLabels(): () => A11yLabels {
  return hasContext(A11yLabelsKey) ? getContext<() => A11yLabels>(A11yLabelsKey) : getDefaultLabels;
}

export function setA11yLabels(labels: () => Partial<A11yLabels> | undefined): () => A11yLabels {
  const parent = useA11yLabels();
  const merged = (): A11yLabels => {
    const overrides = labels();
    return overrides ? { ...parent(), ...overrides } : parent();
  };
  setContext(A11yLabelsKey, merged);
  return merged;
}