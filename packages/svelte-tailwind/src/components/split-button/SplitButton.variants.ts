import { cva } from 'class-variance-authority';

export const splitButtonTriggerVariants = cva(
  "relative rounded-s-none before:pointer-events-none before:absolute before:-inset-y-px before:-start-px before:w-px before:bg-current before:opacity-[0.16] before:content-[''] data-[variant=destructive-outline]:-ms-px data-[variant=destructive-outline]:before:hidden data-[variant=ghost]:before:inset-y-1.5 data-[variant=outline]:-ms-px data-[variant=outline]:before:hidden",
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