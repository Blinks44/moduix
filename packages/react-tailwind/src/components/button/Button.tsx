'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type ButtonVariant =
  | 'default'
  | 'outline'
  | 'secondary'
  | 'destructive'
  | 'destructive-outline'
  | 'ghost'
  | 'link';

type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';

type ButtonRootProps = HTMLArkProps<'button'> & {
  loading?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium no-underline appearance-none transition-[background-color,border-color,color,opacity,transform,translate] duration-fast ease-in-out select-none whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:opacity-50 motion-safe:[&[data-slot='button-root']:not([data-variant='link']):not([aria-haspopup]):active]:translate-y-px [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--color-primary)_88%,black)]',
        outline: 'border-border bg-background text-foreground hover:bg-accent',
        secondary: 'border-secondary bg-secondary text-secondary-foreground hover:bg-accent',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:bg-[color-mix(in_srgb,var(--color-destructive)_88%,black)]',
        'destructive-outline':
          'border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground',
        ghost: 'border-transparent bg-transparent text-foreground hover:bg-accent',
        link: 'border-transparent bg-transparent text-primary underline underline-offset-[0.25em] hover:text-foreground',
      },
      size: {
        xs: 'min-h-control-xs px-2.5 py-0.5 text-xs',
        sm: 'min-h-control-sm px-3 py-1 text-sm',
        md: 'min-h-control-md px-4 py-1 text-sm',
        lg: 'min-h-control-lg px-5 py-1.5 text-md',
        xl: 'min-h-control-xl px-6 py-2 text-lg',
        'icon-sm': 'size-control-sm min-w-control-sm gap-0 p-0',
        'icon-md': 'size-control-md min-w-control-md gap-0 p-0',
        'icon-lg': 'size-control-lg min-w-control-lg gap-0 p-0',
      },
    },
    compoundVariants: [{ variant: 'link', class: 'min-h-0 py-0' }],
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);

const Button = forwardRef<HTMLButtonElement, ButtonRootProps>(function Button(
  {
    asChild,
    className,
    disabled,
    loading = false,
    onClickCapture,
    size = 'md',
    type,
    'data-scope': dataScope = 'button',
    'data-part': dataPart = 'root',
    'data-slot': dataSlot = 'button-root',
    variant = 'default',
    'aria-busy': ariaBusy,
    'aria-disabled': ariaDisabled,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading || ariaDisabled === true || ariaDisabled === 'true';

  return (
    <ark.button
      ref={ref}
      asChild={asChild}
      type={asChild ? type : (type ?? 'button')}
      disabled={asChild ? undefined : isDisabled}
      aria-busy={loading ? true : ariaBusy}
      aria-disabled={isDisabled ? true : ariaDisabled}
      {...props}
      onClickCapture={(event) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClickCapture?.(event);
      }}
      data-scope={dataScope}
      data-part={dataPart}
      data-slot={dataSlot}
      data-variant={variant}
      data-size={size}
      data-disabled={isDisabled ? '' : undefined}
      data-loading={loading ? '' : undefined}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
});

export { Button };
export type { ButtonRootProps, ButtonSize, ButtonVariant };