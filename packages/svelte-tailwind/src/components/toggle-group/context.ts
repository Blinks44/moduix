import { getContext, setContext } from 'svelte';
import type { ToggleSize, ToggleVariant } from '../toggle/Toggle.svelte';

export type ToggleGroupStyleContextValue = {
  size: () => ToggleSize;
  variant: () => ToggleVariant;
};

const defaultToggleGroupStyleContext: ToggleGroupStyleContextValue = {
  size: () => 'md',
  variant: () => 'default',
};

const toggleGroupStyleContextKey = Symbol('ToggleGroupStyleContext');

export const setToggleGroupStyleContext = (value: ToggleGroupStyleContextValue) =>
  setContext(toggleGroupStyleContextKey, value);

export const useToggleGroupStyleContext = () =>
  getContext<ToggleGroupStyleContextValue | undefined>(toggleGroupStyleContextKey) ??
  defaultToggleGroupStyleContext;