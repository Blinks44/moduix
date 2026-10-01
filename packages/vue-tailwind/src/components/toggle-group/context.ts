import { inject, type InjectionKey } from 'vue';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.vue';

export type ToggleGroupStyleContextValue = {
  size: () => ToggleSize;
  variant: () => ToggleVariant;
};

const defaultToggleGroupStyleContext: ToggleGroupStyleContextValue = {
  size: () => 'md',
  variant: () => 'default',
};

export const ToggleGroupStyleContextKey: InjectionKey<ToggleGroupStyleContextValue> =
  Symbol('ToggleGroupStyleContext');

export const useToggleGroupStyleContext = () =>
  inject(ToggleGroupStyleContextKey, defaultToggleGroupStyleContext);