import {
  createComponent,
  createContext,
  createMemo,
  useContext,
  type Accessor,
  type JSX,
} from 'solid-js';

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
  children?: JSX.Element;
  labels?: Partial<A11yLabels>;
}

export const a11yLabels = defaultA11yLabels;

const A11yLabelsContext = createContext<Accessor<A11yLabels>>(() => defaultA11yLabels);

export function useA11yLabels(): Accessor<A11yLabels> {
  return useContext(A11yLabelsContext);
}

export function LabelsProvider(props: LabelsProviderProps) {
  const parent = useA11yLabels();
  const value = createMemo<A11yLabels>(() =>
    props.labels ? { ...parent(), ...props.labels } : parent(),
  );

  return createComponent(A11yLabelsContext.Provider, {
    value,
    get children() {
      return props.children;
    },
  });
}