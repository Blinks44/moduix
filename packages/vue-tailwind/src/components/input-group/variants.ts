import { cva } from 'class-variance-authority';

const inputGroupPaddingVariants = {
  xs: 'px-2.5',
  sm: 'px-3',
  md: 'px-3.5',
  lg: 'px-4',
  xl: 'px-4.5',
};

export const inputGroupRootVariants = cva(
  'flex w-full items-stretch overflow-hidden rounded-md border border-border bg-background text-foreground outline-focus-inset outline-offset-focus-inset outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out has-[>[data-align=block]]:flex-col focus-within:outline-ring has-[:is([data-slot=input-root],[data-slot=textarea-root]):is([data-invalid],[aria-invalid=true])]:border-destructive has-[:is([data-slot=input-root],[data-slot=textarea-root]):is([data-invalid],[aria-invalid=true])]:focus-within:outline-destructive has-[:is([data-slot=input-root],[data-slot=textarea-root]):is([data-disabled],:disabled)]:opacity-disabled [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100',
  {
    variants: {
      size: {
        xs: 'min-h-control-xs text-xs leading-4',
        sm: 'min-h-control-sm text-sm leading-5',
        md: 'min-h-control-md text-md leading-6',
        lg: 'min-h-control-lg text-lg leading-7',
        xl: 'min-h-control-xl text-lg leading-7',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupInputVariants = cva(
  'min-h-0 grow rounded-none border-0 bg-transparent outline-0',
  {
    variants: {
      size: inputGroupPaddingVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupTextareaVariants = cva(
  'min-w-0 grow resize-none rounded-none border-0 bg-transparent outline-0 disabled:opacity-100 data-disabled:opacity-100',
  {
    variants: {
      size: inputGroupPaddingVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupAddonVariants = cva(
  "inline-flex min-w-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap border-s border-e border-border bg-muted text-muted-foreground first:border-s-0 last:border-e-0 [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 data-[align=block]:justify-start data-[align=block]:border-x-0 data-[align=block]:border-y data-[align=block]:py-2 data-[align=block]:first:border-t-0 data-[align=block]:last:border-b-0",
  {
    variants: {
      size: inputGroupPaddingVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupTextVariants = cva(
  "inline-flex min-w-0 items-center justify-center gap-2 overflow-hidden whitespace-nowrap text-muted-foreground [&>svg:not([class*='size-'])]:size-4 [&>svg]:shrink-0 data-[align=block]:justify-start data-[align=block]:py-2",
  {
    variants: {
      size: inputGroupPaddingVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupButtonClass = 'h-auto min-h-0 self-stretch rounded-none border-0 py-0';

export const inputGroupClearTriggerClass =
  'me-2 size-control-xs self-center focus-visible:outline-focus-inset focus-visible:outline-offset-1 data-[size=xs]:size-5';