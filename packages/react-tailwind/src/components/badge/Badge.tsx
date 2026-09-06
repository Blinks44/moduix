import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { Children, forwardRef, type ComponentRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline' | 'ghost' | 'link';

const badgeVariants = cva(
  "box-border inline-flex min-h-5 w-fit max-w-full min-w-0 items-center justify-center gap-1.5 overflow-hidden rounded-full border px-2.5 py-0 align-middle font-medium text-xs tabular-nums whitespace-nowrap text-ellipsis no-underline select-none transition-[color,background-color,border-color,opacity] duration-200 ease-in-out motion-reduce:transition-none [&>svg]:pointer-events-none [&>svg]:size-3 [&>svg]:shrink-0 [&:is(a,button,[role='button']):focus-visible]:outline-2 [&:is(a,button,[role='button']):focus-visible]:outline-ring [&:is(a,button,[role='button']):focus-visible]:outline-offset-0.5 [&:is(a,button,[role='button']):not(:disabled):not([aria-disabled='true'])]:cursor-pointer [&:is(a,button,[role='button']):is(:disabled,[aria-disabled='true'])]:cursor-not-allowed [&:is(a,button,[role='button']):is(:disabled,[aria-disabled='true'])]:opacity-50 [&:is(a,button,[role='button']):not(:disabled):not([aria-disabled='true']):is([data-variant='default'],[data-variant='secondary'],[data-variant='destructive']):hover]:opacity-90",
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground',
        secondary: 'border-transparent bg-secondary text-secondary-foreground',
        destructive: 'border-transparent bg-destructive text-destructive-foreground',
        outline:
          "border-border bg-transparent text-foreground [&:is(a,button,[role='button']):not(:disabled):not([aria-disabled='true']):hover]:border-primary [&:is(a,button,[role='button']):not(:disabled):not([aria-disabled='true']):hover]:text-primary",
        ghost:
          "border-transparent bg-transparent text-foreground [&:is(a,button,[role='button']):not(:disabled):not([aria-disabled='true']):hover]:border-primary [&:is(a,button,[role='button']):not(:disabled):not([aria-disabled='true']):hover]:text-primary",
        link: "min-h-auto rounded-none border-transparent bg-transparent px-0 py-[0.125em] text-primary underline decoration-[color-mix(in_oklab,currentColor_55%,transparent)] underline-offset-[0.15em] [text-decoration-thickness:from-font] [&:is(a,button,[role='button']):not(:disabled):not([aria-disabled='true']):hover]:decoration-current",
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

type BadgeRootProps = HTMLArkProps<'span'> & {
  variant?: BadgeVariant;
};

const BadgeLabel = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(
  function BadgeLabel({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        {...props}
        data-scope="badge"
        data-part="label"
        data-slot="badge-label"
        className={cn('min-w-0 overflow-hidden text-ellipsis', className)}
      />
    );
  },
);

const BadgeRoot = forwardRef<ComponentRef<typeof ark.span>, BadgeRootProps>(function BadgeRoot(
  { asChild, children, className, variant = 'default', ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="badge"
      data-part="root"
      data-slot="badge-root"
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      asChild={asChild}
    >
      {asChild
        ? children
        : Children.map(children, (child) =>
            typeof child === 'string' || typeof child === 'number' ? (
              <BadgeLabel>{child}</BadgeLabel>
            ) : (
              child
            ),
          )}
    </ark.span>
  );
});

const BadgeDot = forwardRef<ComponentRef<typeof ark.span>, HTMLArkProps<'span'>>(function BadgeDot(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      data-scope="badge"
      data-part="dot"
      data-slot="badge-dot"
      aria-hidden="true"
      className={cn('size-1.5 shrink-0 rounded-full bg-current', className)}
    />
  );
});

const Badge = Object.assign(BadgeRoot, {
  Root: BadgeRoot,
  Label: BadgeLabel,
  Dot: BadgeDot,
});

export { Badge };