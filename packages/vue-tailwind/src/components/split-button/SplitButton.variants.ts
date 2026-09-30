import { cva } from 'class-variance-authority';

export const splitButtonTriggerVariants = cva(
  "relative min-w-0 ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)] rounded-s-none motion-safe:[&:not([data-variant='link']):active]:[translate:none] before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-px before:bg-current before:opacity-[0.16] before:content-['']",
  {
    variants: {
      size: {
        xs: 'px-2',
        sm: 'px-2.5',
        md: 'px-3',
        lg: 'px-3.5',
        xl: 'px-4',
      },
      variant: {
        default: '',
        outline: 'before:opacity-0',
        secondary: '',
        destructive: '',
        'destructive-outline': 'before:opacity-0',
        ghost: '',
      },
    },
    defaultVariants: {
      size: 'md',
      variant: 'default',
    },
  },
);