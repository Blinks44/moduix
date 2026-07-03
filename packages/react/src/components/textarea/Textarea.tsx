import type { ComponentProps, ComponentRef } from 'react';
import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Textarea.module.css';

const Textarea = forwardRef<
  ComponentRef<typeof FieldPrimitive.Textarea>,
  ComponentProps<typeof FieldPrimitive.Textarea>
>(function Textarea({ autoresize, className, ...props }, ref) {
  return (
    <FieldPrimitive.Textarea
      ref={ref}
      {...props}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-autoresize={autoresize ? '' : undefined}
      className={clsx(styles.root, normalizeClassName(className))}
      autoresize={autoresize}
    />
  );
});

export { Textarea };