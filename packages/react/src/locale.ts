'use client';

import { LocaleProvider } from '@ark-ui/react/locale';
import { createElement, type ReactNode } from 'react';
import {
  defaultA11yLabels,
  LabelsProvider,
  useA11yLabels,
  type A11yLabels,
  type LabelsProviderProps,
} from '@/lib/moduix/a11yLabels';

export interface ModuixProviderProps {
  children?: ReactNode;
  labels?: Partial<A11yLabels>;
  locale?: string;
}

export function ModuixProvider({ children, labels, locale }: ModuixProviderProps) {
  const content = labels ? createElement(LabelsProvider, { labels }, children) : children;
  return locale ? createElement(LocaleProvider, { locale }, content) : content;
}

export {
  LocaleProvider,
  useCollator,
  useDateFormatter,
  useFilter,
  useLocaleContext,
} from '@ark-ui/react/locale';
export type {
  LocaleProviderProps,
  UseCollatorProps,
  UseDateFormatterProps,
  UseFilterProps,
  UseFilterReturn,
  UseLocaleContext,
} from '@ark-ui/react/locale';
export { defaultA11yLabels, LabelsProvider, useA11yLabels };
export type { A11yLabels, LabelsProviderProps };