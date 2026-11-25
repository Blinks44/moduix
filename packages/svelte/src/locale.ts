export {
  LocaleProvider,
  useCollator,
  useDateFormatter,
  useFilter,
  useLocaleContext,
} from '@ark-ui/svelte/locale';
export type {
  LocaleProviderProps,
  UseCollatorProps,
  UseCollatorReturn,
  UseDateFormatterProps,
  UseDateFormatterReturn,
  UseFilterProps,
  UseFilterReturn,
  UseLocaleContext,
} from '@ark-ui/svelte/locale';
export {
  defaultA11yLabels,
  setA11yLabels,
  useA11yLabels,
  type A11yLabels,
} from '@/lib/moduix/a11yLabels';
export {
  default as LabelsProvider,
  type LabelsProviderProps,
} from '@/lib/moduix/LabelsProvider.svelte';
export {
  default as ModuixProvider,
  type ModuixProviderProps,
} from '@/lib/moduix/ModuixProvider.svelte';