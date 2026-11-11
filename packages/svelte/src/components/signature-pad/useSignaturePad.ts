import { useFieldContext } from '@ark-ui/svelte/field';
import { useSignaturePad as useSignaturePadPrimitive } from '@ark-ui/svelte/signature-pad';
import type { UseSignaturePadProps } from '@ark-ui/svelte/signature-pad';
import type { SignaturePadApi } from './context';

type SignaturePadHookProps = UseSignaturePadProps | (() => UseSignaturePadProps) | undefined;

export const useSignaturePad = (props?: SignaturePadHookProps): (() => SignaturePadApi) => {
  const field = useFieldContext();
  const signaturePad = useSignaturePadPrimitive(props);
  return () => ({
    ...signaturePad(),
    readOnly:
      (typeof props === 'function' ? props() : props)?.readOnly ?? field?.()?.readOnly ?? false,
  });
};