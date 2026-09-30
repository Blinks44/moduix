import { inject, type InjectionKey } from 'vue';
import type { Props as ButtonProps } from '../button/Button.vue';

export type SplitButtonSize = Exclude<
  NonNullable<ButtonProps['size']>,
  'icon-sm' | 'icon-md' | 'icon-lg'
>;
export type SplitButtonVariant = Exclude<NonNullable<ButtonProps['variant']>, 'link'>;
type SplitButtonContextValue = { size: () => SplitButtonSize; variant: () => SplitButtonVariant };
export const SplitButtonContextKey: InjectionKey<SplitButtonContextValue> =
  Symbol('SplitButtonContext');
export const useSplitButtonContext = (componentName: string) => {
  const context = inject(SplitButtonContextKey);
  if (!context) throw new Error(`${componentName} must be used within SplitButton.`);
  return context;
};