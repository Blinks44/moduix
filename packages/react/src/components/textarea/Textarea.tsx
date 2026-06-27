import type { ComponentProps, ComponentRef } from 'react';
import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Textarea.module.css';

type TextareaProps = ComponentProps<typeof FieldPrimitive.Textarea>;

const Textarea = forwardRef<ComponentRef<typeof FieldPrimitive.Textarea>, TextareaProps>(
  function Textarea({ autoresize, className, ...props }, ref) {
    return (
      <FieldPrimitive.Textarea
        ref={ref}
        {...props}
        data-scope="field"
        data-part="textarea"
        data-slot="textarea-root"
        data-autoresize={autoresize ? '' : undefined}
        autoresize={autoresize}
        className={clsx(styles.root, normalizeClassName(className))}
      />
    );
  },
);

export { Textarea };
export type { TextareaProps };