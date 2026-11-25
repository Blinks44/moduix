import { LocaleProvider } from '@ark-ui/vue/locale';
import { defineComponent, h, type PropType } from 'vue';
import {
  defaultA11yLabels,
  LabelsProvider,
  provideA11yLabels,
  useA11yLabels,
  type A11yLabels,
  type LabelsProviderProps,
} from '@/lib/moduix/a11yLabels';

export interface ModuixProviderProps {
  labels?: Partial<A11yLabels>;
  locale?: string;
}

export const ModuixProvider = defineComponent({
  name: 'ModuixProvider',
  props: {
    labels: {
      type: Object as PropType<Partial<A11yLabels>>,
      default: undefined,
    },
    locale: {
      type: String,
      default: undefined,
    },
  },
  setup(props, { slots }) {
    provideA11yLabels(() => props.labels);
    return () =>
      props.locale ? h(LocaleProvider, { locale: props.locale }, slots) : slots.default?.();
  },
});

export {
  LocaleProvider,
  useCollator,
  useDateFormatter,
  useFilter,
  useLocaleContext,
} from '@ark-ui/vue/locale';
export type {
  LocaleContext,
  LocaleProviderProps,
  UseCollatorProps,
  UseCollatorReturn,
  UseDateFormatterProps,
  UseDateFormatterReturn,
  UseFilterProps,
  UseFilterReturn,
} from '@ark-ui/vue/locale';
export { defaultA11yLabels, LabelsProvider, provideA11yLabels, useA11yLabels };
export type { A11yLabels, LabelsProviderProps };