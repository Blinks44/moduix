import { usePinInput as usePinInputPrimitive } from '@ark-ui/vue/pin-input';
import type { UsePinInputProps, UsePinInputReturn } from '@ark-ui/vue/pin-input';
import { computed, toValue } from 'vue';
import type { MaybeRef } from 'vue';

const usePinInput = (props: MaybeRef<UsePinInputProps> = {}): UsePinInputReturn =>
  usePinInputPrimitive(
    computed(() => ({
      placeholder: '',
      ...toValue(props),
    })),
  );

export default usePinInput;