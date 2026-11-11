import { getContext, setContext } from 'svelte';
import type { ButtonSize, ButtonVariant } from '../button/Button.svelte';

export type SplitButtonSize = Exclude<ButtonSize, 'icon-sm' | 'icon-md' | 'icon-lg'>;
export type SplitButtonVariant = Exclude<ButtonVariant, 'link'>;
type SplitButtonContextValue = { size: () => SplitButtonSize; variant: () => SplitButtonVariant };

const splitButtonContextKey = Symbol('SplitButtonContext');

export const setSplitButtonContext = (value: SplitButtonContextValue) =>
  setContext(splitButtonContextKey, value);

export const useSplitButtonContext = (componentName: string) => {
  const context = getContext<SplitButtonContextValue | undefined>(splitButtonContextKey);
  if (!context) throw new Error(`${componentName} must be used within SplitButton.`);
  return context;
};