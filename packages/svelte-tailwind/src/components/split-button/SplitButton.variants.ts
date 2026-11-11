import { cva } from 'class-variance-authority';

export const splitButtonTriggerVariants = cva(
  "relative ms-[calc(var(--moduix-button-border-width,var(--moduix-border-width-sm))*-1)] rounded-s-none before:pointer-events-none before:absolute before:inset-y-1.5 before:start-0 before:w-px before:bg-current before:opacity-[0.16] before:content-[''] data-[variant=destructive-outline]:before:hidden data-[variant=outline]:before:hidden",
  {
    variants: {
      size: {
        xs: 'px-2',
        sm: 'px-2.5',
        md: 'px-3',
        lg: 'px-3.5',
        xl: 'px-4',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);