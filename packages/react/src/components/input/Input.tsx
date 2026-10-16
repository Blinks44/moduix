import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import styles from './Input.module.css';

type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type InputRootProps = Omit<ComponentProps<typeof FieldPrimitive.Input>, 'size'> & {
  size?: InputSize;
  htmlSize?: ComponentProps<'input'>['size'];
};

const Input = forwardRef<HTMLInputElement, InputRootProps>(function Input(
  { className, size = 'md', htmlSize, ...props },
  ref,
) {
  return (
    <FieldPrimitive.Input
      {...props}
      ref={ref}
      data-scope="field"
      data-part="input"
      data-slot="input-root"
      data-size={size}
      className={clsx(styles.root, className)}
      size={htmlSize}
    />
  );
});

export { Input };
export type { InputRootProps, InputSize };