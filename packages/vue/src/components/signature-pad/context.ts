import type { UseSignaturePadReturn } from '@ark-ui/vue/signature-pad';
import type { ComputedRef, InjectionKey, UnwrapRef } from 'vue';

export type SignaturePadApi = UnwrapRef<UseSignaturePadReturn> & {
  readOnly: boolean;
};

export const signaturePadReadOnlyKey: InjectionKey<ComputedRef<boolean>> =
  Symbol('SignaturePadReadOnly');