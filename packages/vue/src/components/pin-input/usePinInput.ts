import { usePinInput as usePinInputPrimitive } from '@ark-ui/vue/pin-input';
import type { UsePinInputProps, UsePinInputReturn } from '@ark-ui/vue/pin-input';
import { computed, toValue } from 'vue';
import type { MaybeRef } from 'vue';

const usePinInput = (
  props: MaybeRef<UsePinInputProps> = {},
  emit?: Parameters<typeof usePinInputPrimitive>[1],
): UsePinInputReturn =>
  usePinInputPrimitive(
    computed(() => ({
      placeholder: '',
      ...toValue(props),
    })),
    emit,
  );

export default usePinInput;