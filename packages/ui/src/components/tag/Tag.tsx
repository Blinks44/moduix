import type { ComponentPropsWithoutRef } from 'react';
import { Button as ButtonPrimitive } from '@base-ui/react/button';
import clsx from 'clsx';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import styles from './Tag.module.css';

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md';
type TagProps = ComponentPropsWithoutRef<'span'> & {
  variant?: TagVariant;
  size?: TagSize;
};
type TagLabelProps = ComponentPropsWithoutRef<'span'>;
type TagRemoveProps = ButtonPrimitive.Props;

const DEFAULT_REMOVE_LABEL = 'Remove tag';

function Tag({ className, size = 'md', variant = 'default', ...props }: TagProps) {
  return (
    <span
      data-slot="tag-root"
      data-size={size}
      data-variant={variant}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

function TagLabel({ className, ...props }: TagLabelProps) {
  return <span data-slot="tag-label" className={clsx(styles.label, className)} {...props} />;
}

function TagRemove({
  className,
  children,
  type = 'button',
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: TagRemoveProps) {
  return (
    <ButtonPrimitive
      type={type}
      data-slot="tag-remove"
      className={clsx(styles.remove, className)}
      aria-label={
        ariaLabel ?? (children == null && ariaLabelledBy == null ? DEFAULT_REMOVE_LABEL : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      {...props}
    >
      {children ?? <CloseIcon />}
    </ButtonPrimitive>
  );
}

export { Tag, TagLabel, TagRemove };
export type { TagProps, TagSize, TagVariant, TagLabelProps, TagRemoveProps };