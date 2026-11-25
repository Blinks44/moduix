import { LocaleProvider } from '@ark-ui/solid/locale';
import { createComponent, createMemo, type JSX } from 'solid-js';
import {
  defaultA11yLabels,
  LabelsProvider,
  useA11yLabels,
  type A11yLabels,
  type LabelsProviderProps,
} from './internal/a11yLabels';

export interface ModuixProviderProps {
  children?: JSX.Element;
  labels?: Partial<A11yLabels>;
  locale?: string;
}

export function ModuixProvider(props: ModuixProviderProps): JSX.Element {
  const withLabels = () =>
    createComponent(LabelsProvider, {
      get labels() {
        return props.labels;
      },
      get children() {
        return props.children;
      },
    });

  const hasLocale = createMemo(() => Boolean(props.locale));

  return createMemo(() =>
    hasLocale()
      ? createComponent(LocaleProvider, {
          get locale() {
            return props.locale!;
          },
          get children() {
            return withLabels();
          },
        })
      : withLabels(),
  ) as unknown as JSX.Element;
}

export {
  LocaleProvider,
  useCollator,
  useDateFormatter,
  useFilter,
  useLocaleContext,
} from '@ark-ui/solid/locale';
export type {
  LocaleProviderProps,
  UseCollatorProps,
  UseDateFormatterProps,
  UseDateFormatterReturn,
  UseFilterProps,
  UseFilterReturn,
  UseLocaleContext,
} from '@ark-ui/solid/locale';
export { defaultA11yLabels, LabelsProvider, useA11yLabels };
export type { A11yLabels, LabelsProviderProps };