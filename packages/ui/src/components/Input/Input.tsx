import type { ComponentProps, ComponentRef } from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { forwardRef } from 'react';
import { mergeClassName } from '@/utils/mergeClassName';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type InputProps = Omit<InputPrimitive.Props, 'size'> & {
  size?: InputSize;
  htmlSize?: ComponentProps<'input'>['size'];
};

const Input = forwardRef<ComponentRef<typeof InputPrimitive>, InputProps>(function Input(
  { className, size = 'md', htmlSize, ...props },
  ref,
) {
  return (
    <InputPrimitive
      ref={ref}
      data-slot="input-root"
      data-size={size}
      className={mergeClassName(className, styles.root)}
      size={htmlSize}
      {...props}
    />
  );
});

export { Input };
export type { InputProps, InputSize };