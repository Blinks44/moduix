import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Input.module.css';

const InputRoot = forwardRef<
  ComponentRef<typeof FieldPrimitive.Input>,
  Omit<ComponentProps<typeof FieldPrimitive.Input>, 'size'> & {
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    htmlSize?: ComponentProps<'input'>['size'];
  }
>(function InputRoot({ className, size = 'md', htmlSize, ...props }, ref) {
  return (
    <FieldPrimitive.Input
      {...props}
      ref={ref}
      data-scope="field"
      data-part="input"
      data-slot="input-root"
      data-size={size}
      data-html-size={htmlSize === undefined ? undefined : ''}
      className={clsx(styles.root, normalizeClassName(className))}
      size={htmlSize}
    />
  );
});

const Input = Object.assign(InputRoot, {
  Root: InputRoot,
});

export { Input };