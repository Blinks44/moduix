import { useFieldContext } from '@ark-ui/vue/field';
import { useSignaturePad as useSignaturePadPrimitive } from '@ark-ui/vue/signature-pad';
import type { UseSignaturePadProps } from '@ark-ui/vue/signature-pad';
import { computed, toValue, unref } from 'vue';
import type { ComputedRef, MaybeRef } from 'vue';
import type { SignaturePadApi } from './context';

type SignaturePadHookProps = MaybeRef<UseSignaturePadProps> | undefined;

export const useSignaturePad = (props?: SignaturePadHookProps): ComputedRef<SignaturePadApi> => {
  const field = useFieldContext();
  const signaturePad = useSignaturePadPrimitive(props);
  const readOnly = computed(() => {
    const machineProps = toValue(props);

    return machineProps?.readOnly ?? unref(field)?.readOnly ?? false;
  });

  return computed(() => ({
    ...signaturePad.value,
    readOnly: readOnly.value,
  }));
};