import type { InjectionKey, Ref } from 'vue';

export type InputGroupSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const defaultInputGroupSize: InputGroupSize = 'md';

export const InputGroupSizeContextKey: InjectionKey<Readonly<Ref<InputGroupSize>>> =
  Symbol('InputGroupSize');