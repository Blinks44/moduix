import {
  computed,
  defineComponent,
  inject,
  provide,
  toValue,
  type ComputedRef,
  type InjectionKey,
  type MaybeRefOrGetter,
  type PropType,
} from 'vue';

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
  labels?: Partial<A11yLabels>;
}

export const a11yLabels = defaultA11yLabels;

const A11yLabelsKey: InjectionKey<ComputedRef<A11yLabels>> = Symbol('moduix-a11y-labels');
const defaultA11yLabelsRef = computed<A11yLabels>(() => defaultA11yLabels);

export function useA11yLabels(): ComputedRef<A11yLabels> {
  return inject(A11yLabelsKey, defaultA11yLabelsRef);
}

export function provideA11yLabels(labels: MaybeRefOrGetter<Partial<A11yLabels> | undefined>) {
  const parent = useA11yLabels();
  const merged = computed<A11yLabels>(() => {
    const overrides = toValue(labels);
    return overrides ? { ...parent.value, ...overrides } : parent.value;
  });
  provide(A11yLabelsKey, merged);
  return merged;
}

export const LabelsProvider = defineComponent({
  name: 'LabelsProvider',
  props: {
    labels: {
      type: Object as PropType<Partial<A11yLabels>>,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    provideA11yLabels(() => props.labels);
    return () => slots.default?.();
  },
});