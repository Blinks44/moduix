import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
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
  "inline-flex min-h-control-xs w-fit max-w-full min-w-0 items-center gap-1.5 rounded-full border px-2 py-0.5 align-middle font-medium text-xs whitespace-nowrap transition-colors duration-normal ease-in-out [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3 [&>svg]:shrink-0 [a&]:cursor-pointer [button&]:cursor-pointer",
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

function Tag(props: TagRootProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);

  return (
    <ark.span
      {...others}
      data-scope="tag"
      data-part="root"
      data-slot="tag-root"
      data-size={local.size ?? 'md'}
      data-variant={local.variant ?? 'default'}
      class={cn(tagVariants({ size: local.size, variant: local.variant }), local.class)}
    />
  );
}

function TagLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="tag"
      data-part="label"
      data-slot="tag-label"
      class={cn('min-w-0 overflow-hidden text-ellipsis', local.class)}
    />
  );
}

function TagStartElement(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="tag"
      data-part="start-element"
      data-slot="tag-start-element"
      class={cn(
        "inline-flex shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3",
        local.class,
      )}
    />
  );
}

function TagEndElement(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="tag"
      data-part="end-element"
      data-slot="tag-end-element"
      class={cn(
        "inline-flex shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3",
        local.class,
      )}
    />
  );
}

function TagCloseTrigger(props: HTMLArkProps<'button'>) {
  const [local, others] = splitProps(props, ['aria-label', 'class']);

  return (
    <CloseButton
      {...others}
      data-scope="tag"
      data-part="close-trigger"
      data-slot="tag-close-trigger"
      aria-label={
        local['aria-label'] ?? (others['aria-labelledby'] == null ? a11yLabels.closeTag : undefined)
      }
      class={cn(
        "size-4 rounded-full text-inherit focus-visible:outline-1 focus-visible:outline-offset-0 [&>svg:not([class*='size-'])]:size-3 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-current/12 [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-inherit",
        local.class,
      )}
    />
  );
}

export { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };
export type { TagRootProps, TagSize, TagVariant };