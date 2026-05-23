import { Input as InputPrimitive } from '@base-ui/react/input';
import * as React from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type InputProps = Omit<InputPrimitive.Props, 'size'> & {
  size?: InputSize;
  htmlSize?: React.ComponentProps<'input'>['size'];
};
type InputState = InputPrimitive.State;
type InputChangeEventReason = InputPrimitive.ChangeEventReason;
type InputChangeEventDetails = InputPrimitive.ChangeEventDetails;

const Input = React.forwardRef(function Input(
  { className, size: componentSize = 'md', htmlSize, ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  return (
    <InputPrimitive
      ref={ref}
      data-slot="input-root"
      data-size={componentSize}
      className={mergeClassName(className, styles.root)}
      size={htmlSize}
      {...props}
    />
  );
});

export { Input };

export type { InputProps, InputState, InputChangeEventReason, InputChangeEventDetails, InputSize };