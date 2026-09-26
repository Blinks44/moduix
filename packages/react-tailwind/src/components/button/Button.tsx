import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium no-underline appearance-none transition-[background-color,border-color,color,opacity,transform] duration-200 ease-in-out select-none whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-loading:cursor-progress motion-reduce:transition-none motion-safe:[&:not([data-variant='link']):active]:translate-y-px [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          'border-primary bg-primary text-primary-foreground hover:bg-[color-mix(in_srgb,var(--color-primary)_88%,black)]',
        outline: 'border-border bg-background text-foreground hover:bg-accent',
        secondary: 'border-secondary bg-secondary text-secondary-foreground hover:bg-accent',
        destructive:
          'border-destructive bg-destructive text-destructive-foreground hover:brightness-[0.96]',
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

const Button = forwardRef<
  HTMLButtonElement,
  HTMLArkProps<'button'> & {
    loading?: boolean;
    variant?:
      | 'default'
      | 'outline'
      | 'secondary'
      | 'destructive'
      | 'destructive-outline'
      | 'ghost'
      | 'link';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'icon-sm' | 'icon-md' | 'icon-lg';
    'data-scope'?: string;
    'data-part'?: string;
    'data-slot'?: string;
  }
>(function Button(
  {
    asChild,
    className,
    disabled,
    loading = false,
    onClick,
    onClickCapture,
    size = 'md',
    type,
    'data-scope': dataScope = 'button',
    'data-part': dataPart = 'root',
    'data-slot': dataSlot,
    variant = 'default',
    'aria-busy': ariaBusy,
    'aria-disabled': ariaDisabled,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || loading || ariaDisabled === true || ariaDisabled === 'true';
  const nativeDisabled = asChild ? undefined : isDisabled;
  const resolvedAriaBusy = loading ? true : ariaBusy;
  const resolvedAriaDisabled = isDisabled ? true : ariaDisabled;

  return (
    <ark.button
      ref={ref}
      asChild={asChild}
      type={asChild ? type : (type ?? 'button')}
      disabled={nativeDisabled}
      aria-busy={resolvedAriaBusy}
      aria-disabled={resolvedAriaDisabled}
      {...props}
      onClickCapture={(event) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClickCapture?.(event);
      }}
      onClick={(event) => {
        if (isDisabled) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }

        onClick?.(event);
      }}
      data-scope={dataScope}
      data-part={dataPart}
      data-slot={dataSlot ?? 'button-root'}
      data-variant={variant}
      data-size={size}
      data-disabled={isDisabled ? '' : undefined}
      data-loading={loading ? '' : undefined}
      className={cn(buttonVariants({ variant, size }), className)}
    />
  );
});

export { Button };