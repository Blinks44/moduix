import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef, type ComponentRef } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { CloseButton } from '../close-button';

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md' | 'lg';
type TagRootProps = HTMLArkProps<'span'> & {
  variant?: TagVariant;
  size?: TagSize;
};

const tagVariants = cva(
  'inline-flex min-h-control-xs w-fit max-w-full min-w-0 items-center gap-1.5 rounded-full border px-2 py-0.5 align-middle font-medium text-xs whitespace-nowrap transition-colors duration-normal ease-in-out [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0 [a&]:cursor-pointer [button&]:cursor-pointer',
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
        lg: 'min-h-7 px-2.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

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
      className={cn(tagVariants({ size, variant }), className)}
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
      className={cn('min-w-0 overflow-hidden text-ellipsis', className)}
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
      className={cn(
        'inline-flex shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
        className,
      )}
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
      className={cn(
        'inline-flex shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
        className,
      )}
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
        className={cn(
          "size-4 rounded-full text-inherit focus-visible:outline-1 focus-visible:outline-offset-0 [&>svg:not([class*='size-'])]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-current/12 [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-inherit",
          className,
        )}
      />
    );
  },
);

export { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };
export type { TagRootProps, TagSize, TagVariant };