import type * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
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

function Input({ className, size = 'md', htmlSize, ...props }: InputProps) {
  return (
    <InputPrimitive
      data-slot="input-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      size={htmlSize}
      {...props}
    />
  );
}

export { Input };

export type { InputProps, InputState, InputChangeEventReason, InputChangeEventDetails, InputSize };