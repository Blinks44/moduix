import {
  usePinInput as usePinInputPrimitive,
  type UsePinInputProps,
  type UsePinInputReturn,
} from '@ark-ui/svelte/pin-input';

const usePinInput = (props: UsePinInputProps | (() => UsePinInputProps) = {}): UsePinInputReturn =>
  usePinInputPrimitive(() => ({
    placeholder: '',
    ...(typeof props === 'function' ? props() : props),
  }));

export { usePinInput };