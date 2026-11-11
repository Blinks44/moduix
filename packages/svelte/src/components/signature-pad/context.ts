import type { UseSignaturePadReturn } from '@ark-ui/svelte/signature-pad';
import { getContext, setContext } from 'svelte';

export type SignaturePadApi = ReturnType<UseSignaturePadReturn> & {
  readOnly: boolean;
};

type ReadOnlyAccessor = () => boolean | undefined;

const signaturePadReadOnlyKey = Symbol('SignaturePadReadOnly');

export const setSignaturePadReadOnly = (readOnly: ReadOnlyAccessor) =>
  setContext(signaturePadReadOnlyKey, readOnly);

export const getSignaturePadReadOnly = () =>
  getContext<ReadOnlyAccessor | undefined>(signaturePadReadOnlyKey);