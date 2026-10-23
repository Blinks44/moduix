import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type BadgeSize = 'sm' | 'md' | 'lg';
type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

const badgeVariants = cva(
  "inline-flex min-h-5 w-fit max-w-full min-w-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 align-middle font-medium text-xs tabular-nums whitespace-nowrap no-underline select-none transition-[color,background-color,border-color,opacity] duration-normal ease-in-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring [&>svg]:pointer-events-none [&>svg:not([class*='size-'])]:size-3 [&>svg]:shrink-0 [a&]:cursor-pointer",
  {
    variants: {
      size: {
        sm: 'min-h-4 px-2 text-[0.625rem] leading-3.5',
        md: '',
        lg: 'min-h-6 px-3 text-sm',
      },
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground [a&]:hover:opacity-90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:opacity-90',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground [a&]:hover:opacity-90',
        outline:
          'border-border bg-transparent text-foreground [a&]:hover:border-primary [a&]:hover:text-primary',
        ghost: 'border-transparent bg-transparent text-foreground [a&]:hover:text-primary',
        link: 'min-h-auto rounded-none border-transparent bg-transparent px-0 py-[0.125em] text-primary underline decoration-[color-mix(in_oklab,currentColor_55%,transparent)] underline-offset-[0.15em] [text-decoration-thickness:from-font] [a&]:hover:decoration-current',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);

type BadgeRootProps = HTMLArkProps<'span'> & {
  variant?: BadgeVariant;
  size?: BadgeSize;
};

function BadgeLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="badge"
      data-part="label"
      data-slot="badge-label"
      class={cn('min-w-0 overflow-hidden text-ellipsis', local.class)}
    />
  );
}

function Badge(props: BadgeRootProps) {
  const [local, others] = splitProps(props, ['class', 'size', 'variant']);

  return (
    <ark.span
      {...others}
      data-scope="badge"
      data-part="root"
      data-slot="badge-root"
      data-size={local.size ?? 'md'}
      data-variant={local.variant ?? 'default'}
      class={cn(badgeVariants({ size: local.size, variant: local.variant }), local.class)}
    />
  );
}

function BadgeDot(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      data-scope="badge"
      data-part="dot"
      data-slot="badge-dot"
      aria-hidden="true"
      class={cn('size-1.5 shrink-0 rounded-full bg-current', local.class)}
    />
  );
}

export { Badge, BadgeDot, BadgeLabel };
export type { BadgeRootProps, BadgeSize, BadgeVariant };