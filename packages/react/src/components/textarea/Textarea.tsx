import { Field as FieldPrimitive } from '@ark-ui/react/field';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import { forwardRef } from 'react';
import styles from './Textarea.module.css';

type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type TextareaRootProps = ComponentProps<typeof FieldPrimitive.Textarea> & {
  size?: TextareaSize;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaRootProps>(function Textarea(
  { className, size = 'md', ...props },
  ref,
) {
  return (
    <FieldPrimitive.Textarea
      {...props}
      ref={ref}
      data-scope="field"
      data-part="textarea"
      data-slot="textarea-root"
      data-size={size}
      className={clsx(styles.root, className)}
    />
  );
});

export { Textarea };
export type { TextareaRootProps, TextareaSize };