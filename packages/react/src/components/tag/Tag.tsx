import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { CloseButton } from '../close-button';
import styles from './Tag.module.css';

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md' | 'lg';
type TagRootProps = HTMLArkProps<'span'> & {
  variant?: TagVariant;
  size?: TagSize;
};

const Tag = forwardRef<HTMLSpanElement, TagRootProps>(function Tag(
  { className, size = 'md', variant = 'default', ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="tag"
      data-part="root"
      data-slot="tag-root"
      data-size={size}
      data-variant={variant}
      className={clsx(styles.root, className)}
    />
  );
});

const TagLabel = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function TagLabel(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="tag"
      data-part="label"
      data-slot="tag-label"
      className={clsx(styles.label, className)}
    />
  );
});

const TagStartElement = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function TagStartElement(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="tag"
      data-part="start-element"
      data-slot="tag-start-element"
      className={clsx(styles.startElement, className)}
    />
  );
});

const TagEndElement = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function TagEndElement(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="tag"
      data-part="end-element"
      data-slot="tag-end-element"
      className={clsx(styles.endElement, className)}
    />
  );
});

const TagCloseTrigger = forwardRef<ComponentRef<typeof CloseButton>, HTMLArkProps<'button'>>(
  function TagCloseTrigger({ className, 'aria-label': ariaLabel, ...props }, ref) {
    return (
      <CloseButton
        ref={ref}
        {...props}
        data-scope="tag"
        data-part="close-trigger"
        data-slot="tag-close-trigger"
        aria-label={
          ariaLabel ?? (props['aria-labelledby'] == null ? a11yLabels.closeTag : undefined)
        }
        className={clsx(styles.closeTrigger, className)}
      />
    );
  },
);

export { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };
export type { TagRootProps, TagSize, TagVariant };