import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef } from 'react';
import { CloseButton } from '../close-button';
import styles from './Tag.module.css';

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md';
type TagRootProps = HTMLArkProps<'span'> & {
  variant?: TagVariant;
  size?: TagSize;
};
type TagLabelProps = HTMLArkProps<'span'>;
type TagStartElementProps = HTMLArkProps<'span'>;
type TagEndElementProps = HTMLArkProps<'span'>;
type TagCloseTriggerProps = HTMLArkProps<'button'>;

const DEFAULT_CLOSE_LABEL = 'Remove tag';

const TagRoot = forwardRef<HTMLSpanElement, TagRootProps>(function TagRoot(
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

const TagLabel = forwardRef<HTMLSpanElement, TagLabelProps>(function TagLabel(
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

const TagStartElement = forwardRef<HTMLSpanElement, TagStartElementProps>(function TagStartElement(
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

const TagEndElement = forwardRef<HTMLSpanElement, TagEndElementProps>(function TagEndElement(
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

const TagCloseTrigger = forwardRef<ComponentRef<typeof CloseButton.Root>, TagCloseTriggerProps>(
  function TagCloseTrigger(
    {
      asChild,
      className,
      children,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref,
  ) {
    return (
      <CloseButton.Root
        ref={ref}
        asChild={asChild}
        {...props}
        data-scope="tag"
        data-part="close-trigger"
        data-slot="tag-close-trigger"
        aria-label={
          ariaLabel ??
          (!asChild && children == null && ariaLabelledBy == null ? DEFAULT_CLOSE_LABEL : undefined)
        }
        aria-labelledby={ariaLabelledBy}
        className={clsx(styles.closeTrigger, className)}
      >
        {children}
      </CloseButton.Root>
    );
  },
);

const Tag = Object.assign(TagRoot, {
  Root: TagRoot,
  Label: TagLabel,
  StartElement: TagStartElement,
  EndElement: TagEndElement,
  CloseTrigger: TagCloseTrigger,
});

export { Tag };