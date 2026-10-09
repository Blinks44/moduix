import { cva } from 'class-variance-authority';

export const inputGroupSizeVariants = {
  xs: 'px-2.5 text-xs leading-4',
  sm: 'px-3 text-sm leading-5',
  md: 'px-3.5 text-md leading-6',
  lg: 'px-4 text-lg leading-7',
  xl: 'px-4.5 text-lg leading-7',
};

export const inputGroupRootVariants = cva(
  'flex w-full max-w-none items-stretch overflow-hidden rounded-md border border-border bg-background text-foreground outline-1 -outline-offset-1 outline-transparent transition-[border-color,outline-color,opacity] duration-200 ease-in-out focus-within:outline-ring has-[[data-slot=input-root][data-invalid]]:border-destructive has-[[data-slot=input-root][data-invalid]]:focus-within:outline-destructive has-[[data-slot=input-root][aria-invalid=true]]:border-destructive has-[[data-slot=input-root][aria-invalid=true]]:focus-within:outline-destructive has-[[data-slot=input-root][data-disabled]]:opacity-50 has-[[data-slot=input-root]:disabled]:opacity-50 [:is([data-slot=field-root][data-disabled],[data-slot=field-root-provider][data-disabled],[data-slot=fieldset-root][data-disabled],[data-slot=fieldset-root-provider][data-disabled])_&]:opacity-100 motion-reduce:transition-none',
  {
    variants: {
      size: {
        xs: 'min-h-control-xs',
        sm: 'min-h-control-sm',
        md: 'min-h-control-md',
        lg: 'min-h-control-lg',
        xl: 'min-h-control-xl',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupInputVariants = cva(
  'min-h-0 min-w-0 grow basis-auto rounded-none border-0 bg-transparent outline-0',
  {
    variants: {
      size: inputGroupSizeVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupAddonVariants = cva(
  'inline-flex min-w-0 items-center justify-center gap-2 truncate bg-muted text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0 border-s border-e border-border first:border-s-0 last:border-e-0',
  {
    variants: {
      size: inputGroupSizeVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupTextVariants = cva(
  'inline-flex min-w-0 items-center justify-center gap-2 truncate bg-transparent text-muted-foreground [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      size: inputGroupSizeVariants,
    },
    defaultVariants: {
      size: 'md',
    },
  },
);

export const inputGroupButtonClass = 'h-auto self-stretch rounded-none border-0';
export const inputGroupClearTriggerVariants = cva(
  'me-2 size-control-xs self-center focus-visible:outline-1 focus-visible:outline-offset-1 motion-reduce:transition-none',
  {
    variants: { size: { xs: 'size-5', sm: '', md: '', lg: '', xl: '' } },
    defaultVariants: { size: 'md' },
  },
);