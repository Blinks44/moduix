import type { ComponentProps, ComponentRef } from 'react';
import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type InputProps = Omit<ComponentProps<typeof FieldPrimitive.Input>, 'size'> & {
  size?: InputSize;
  htmlSize?: ComponentProps<'input'>['size'];
};

const Input = forwardRef<ComponentRef<typeof FieldPrimitive.Input>, InputProps>(function Input(
  { className, size = 'md', htmlSize, ...props },
  ref,
) {
  return (
    <FieldPrimitive.Input
      ref={ref}
      data-scope="field"
      data-part="input"
      data-slot="input-root"
      data-size={size}
      className={clsx(styles.root, className)}
      size={htmlSize}
      {...props}
    />
  );
});

export { Input };
export type { InputProps, InputSize };