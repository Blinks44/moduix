import { useFocusVisible } from '@ark-ui/solid';
import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { JSX } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type ButtonRootProps = HTMLArkProps<'button'> & {
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
  onClickCapture?: (event: MouseEvent) => void;
};

const buttonVariants = cva(
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium no-underline outline-0 appearance-none transition-[background-color,border-color,color,opacity,transform] duration-200 ease-in-out select-none whitespace-nowrap data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 data-loading:cursor-progress motion-reduce:transition-none motion-safe:[&:not([data-variant='link']):active]:translate-y-px [&:focus[data-focus-visible]]:-outline-offset-1 [&:focus[data-focus-visible]]:outline-2 [&:focus[data-focus-visible]]:outline-ring [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0",
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

const ArkButton = ark.button as (
  props: ButtonRootProps & {
    'oncapture:click'?: (event: MouseEvent) => void;
  },
) => JSX.Element;

function ButtonRoot(props: ButtonRootProps) {
  const focusVisible = useFocusVisible();
  const [local, others] = splitProps(props, [
    'asChild',
    'class',
    'disabled',
    'loading',
    'onClick',
    'onClickCapture',
    'size',
    'type',
    'data-scope',
    'data-part',
    'data-slot',
    'variant',
    'aria-busy',
    'aria-disabled',
  ]);
  const isDisabled = () =>
    local.disabled ||
    local.loading ||
    local['aria-disabled'] === true ||
    local['aria-disabled'] === 'true';
  const handleClickCapture = (event: MouseEvent) => {
    if (isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    local.onClickCapture?.(event);
  };
  const handleClick = (event: MouseEvent) => {
    if (isDisabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    (local.onClick as ((event: MouseEvent) => void) | undefined)?.(event);
  };

  return (
    <ArkButton
      asChild={local.asChild}
      {...others}
      type={local.asChild ? local.type : (local.type ?? 'button')}
      disabled={local.asChild ? undefined : isDisabled()}
      aria-busy={local.loading ? true : local['aria-busy']}
      aria-disabled={isDisabled() ? true : local['aria-disabled']}
      oncapture:click={handleClickCapture}
      onClick={handleClick}
      data-scope={local['data-scope'] ?? 'button'}
      data-part={local['data-part'] ?? 'root'}
      data-slot={local['data-slot'] ?? 'button-root'}
      data-variant={local.variant ?? 'default'}
      data-size={local.size ?? 'md'}
      data-disabled={isDisabled() ? '' : undefined}
      data-focus-visible={focusVisible() ? '' : undefined}
      data-loading={local.loading ? '' : undefined}
      class={cn(buttonVariants({ variant: local.variant, size: local.size }), local.class)}
    />
  );
}

const Button = Object.assign(ButtonRoot, {
  Root: ButtonRoot,
});

export { Button };