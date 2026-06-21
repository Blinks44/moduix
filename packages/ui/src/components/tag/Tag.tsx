import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { CloseIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Tag.module.css';

export type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type TagSize = 'sm' | 'md';
export type TagRootProps = HTMLArkProps<'span'> & {
  variant?: TagVariant;
  size?: TagSize;
};
export type TagLabelProps = HTMLArkProps<'span'>;
export type TagStartElementProps = HTMLArkProps<'span'>;
export type TagEndElementProps = HTMLArkProps<'span'>;
export type TagCloseTriggerProps = HTMLArkProps<'button'>;

const DEFAULT_CLOSE_LABEL = 'Remove tag';

const TagRoot = forwardRef<HTMLSpanElement, TagRootProps>(function TagRoot(
  { className, size = 'md', variant = 'default', ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      data-scope="tag"
      data-part="root"
      data-slot="tag-root"
      data-size={size}
      data-variant={variant}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
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
      data-scope="tag"
      data-part="label"
      data-slot="tag-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
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
      data-scope="tag"
      data-part="start-element"
      data-slot="tag-start-element"
      className={clsx(styles.startElement, normalizeClassName(className))}
      {...props}
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
      data-scope="tag"
      data-part="end-element"
      data-slot="tag-end-element"
      className={clsx(styles.endElement, normalizeClassName(className))}
      {...props}
    />
  );
});

const TagCloseTrigger = forwardRef<HTMLButtonElement, TagCloseTriggerProps>(
  function TagCloseTrigger(
    {
      asChild,
      className,
      children,
      disabled,
      onClick,
      type,
      'aria-disabled': ariaDisabled,
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || ariaDisabled === true || ariaDisabled === 'true';

    return (
      <ark.button
        ref={ref}
        asChild={asChild}
        type={asChild ? type : (type ?? 'button')}
        disabled={disabled}
        data-scope="tag"
        data-part="close-trigger"
        data-slot="tag-close-trigger"
        data-disabled={isDisabled ? '' : undefined}
        className={clsx(styles.closeTrigger, normalizeClassName(className))}
        aria-disabled={ariaDisabled}
        aria-label={
          ariaLabel ??
          (children == null && ariaLabelledBy == null ? DEFAULT_CLOSE_LABEL : undefined)
        }
        aria-labelledby={ariaLabelledBy}
        onClick={(event) => {
          if (isDisabled) {
            event.preventDefault();
            event.stopPropagation();
            return;
          }

          onClick?.(event);
        }}
        {...props}
      >
        {children ?? <CloseIcon />}
      </ark.button>
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