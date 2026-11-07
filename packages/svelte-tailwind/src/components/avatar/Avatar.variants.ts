import { cva } from 'class-variance-authority';

export const avatarVariants = cva(
  'relative inline-flex shrink-0 items-center justify-center rounded-full bg-muted align-middle leading-none font-medium text-foreground select-none',
  {
    variants: {
      size: {
        xs: 'size-control-xs text-xs',
        sm: 'size-control-sm text-sm',
        md: 'size-control-md text-md',
        lg: 'size-control-lg text-lg',
        xl: 'size-control-xl text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  },
);