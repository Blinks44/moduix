import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { children as resolveChildren, splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { CloseButton } from '../close-button';

type TagVariant = 'default' | 'secondary' | 'outline' | 'ghost' | 'destructive';
type TagSize = 'sm' | 'md';
type TagProps = HTMLArkProps<'span'> & {
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

function Tag(props: TagProps) {
  const [local, others] = splitProps(props, ['asChild', 'class', 'size', 'variant']);

  return (
    <ark.span
      asChild={local.asChild}
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

function TagLabel(props: TagLabelProps) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="label"
      data-slot="tag-label"
      class={cn('min-w-0 overflow-hidden text-ellipsis', local.class)}
    />
  );
}

function TagStartElement(props: TagStartElementProps) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="start-element"
      data-slot="tag-start-element"
      class={cn(
        'inline-flex min-w-0 shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
        local.class,
      )}
    />
  );
}

function TagEndElement(props: TagEndElementProps) {
  const [local, others] = splitProps(props, ['asChild', 'class']);

  return (
    <ark.span
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="end-element"
      data-slot="tag-end-element"
      class={cn(
        'inline-flex min-w-0 shrink-0 items-center justify-center [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0',
        local.class,
      )}
    />
  );
}

function TagCloseTrigger(props: TagCloseTriggerProps) {
  const [local, others] = splitProps(props, [
    'asChild',
    'aria-label',
    'aria-labelledby',
    'children',
    'class',
  ]);
  const resolvedChildren = resolveChildren(() => local.children);

  return (
    <CloseButton
      asChild={local.asChild}
      {...others}
      data-scope="tag"
      data-part="close-trigger"
      data-slot="tag-close-trigger"
      aria-label={
        local['aria-label'] ??
        (!local.asChild && resolvedChildren() == null && local['aria-labelledby'] == null
          ? 'Remove tag'
          : undefined)
      }
      aria-labelledby={local['aria-labelledby']}
      class={cn(
        'size-4 rounded-full bg-transparent p-0 text-inherit focus-visible:outline-1 focus-visible:outline-offset-0 [&>svg]:size-2.5 [@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-current/12 [@media(hover:hover)]:[&:not([data-disabled]):hover]:text-inherit',
        local.class,
      )}
    >
      {local.children}
    </CloseButton>
  );
}

export { Tag, TagCloseTrigger, TagEndElement, TagLabel, TagStartElement };