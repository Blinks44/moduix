import { cva } from 'class-variance-authority';

export const toggleGroupRootVariants = cva(
  'group/toggle-group inline-flex max-w-full items-center gap-px overflow-x-auto overscroll-x-contain rounded-lg border border-border bg-muted p-0.5 text-foreground [scrollbar-width:none] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch [&::-webkit-scrollbar]:hidden',
  {
    variants: {
      variant: {
        default: '',
        outline: 'bg-background',
        ghost: 'border-transparent bg-transparent p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);