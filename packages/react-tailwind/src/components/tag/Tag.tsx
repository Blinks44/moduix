import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef, type ComponentRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import { CloseButton } from '../close-button';

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

const tagVariants = cva(
  'inline-flex min-h-control-xs w-fit max-w-full min-w-0 items-center gap-1.5 rounded-full border px-2 py-0.5 align-middle font-medium text-xs whitespace-nowrap transition-colors duration-200 ease-in-out motion-reduce:transition-none [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        outline: 'border-border bg-transparent text-foreground',
        ghost: 'border-transparent bg-transparent text-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
      },
      size: {
        sm: 'min-h-5 gap-1 px-1.5 py-0',
        md: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

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
      className={cn(tagVariants({ size, variant }), className)}
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
      className={cn('min-w-0 overflow-hidden text-ellipsis', className)}
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
      className={cn(
        'inline-flex min-w-0 shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
        className,
      )}
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
      className={cn(
        'inline-flex min-w-0 shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
        className,
      )}
    />
  );
});

const TagCloseTrigger = forwardRef<ComponentRef<typeof CloseButton>, TagCloseTriggerProps>(
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
      <CloseButton
        ref={ref}
        asChild={asChild}
        {...props}
        data-scope="tag"
        data-part="close-trigger"
        data-slot="tag-close-trigger"
        aria-label={
          ariaLabel ??
          (!asChild && children == null && ariaLabelledBy == null ? 'Remove tag' : undefined)
        }
        aria-labelledby={ariaLabelledBy}
        className={cn(
          'size-4 rounded-full bg-transparent p-0 text-inherit focus-visible:outline-1 focus-visible:outline-offset-0 [&>svg]:size-2.5 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-current/12 [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-inherit',
          className,
        )}
      >
        {children}
      </CloseButton>
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