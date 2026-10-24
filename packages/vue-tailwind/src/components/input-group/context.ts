import { computed, inject } from 'vue';
import type { InjectionKey, Ref } from 'vue';
import type { InputSize } from '../input';

export type InputGroupSize = InputSize;

export type InputGroupAddonAlign = 'inline' | 'block';

export const InputGroupSizeContextKey: InjectionKey<Readonly<Ref<InputGroupSize>>> =
  Symbol('InputGroupSize');

export function useInputGroupSize() {
  return inject(
    InputGroupSizeContextKey,
    computed<InputGroupSize>(() => 'md'),
  );
}