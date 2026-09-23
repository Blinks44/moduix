import { cva } from 'class-variance-authority';

export const toggleVariants = cva(
  'box-border inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border text-sm font-medium appearance-none transition-[background-color,border-color,color,opacity] duration-200 ease-in-out select-none whitespace-nowrap focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-ring data-disabled:pointer-events-none data-disabled:cursor-default data-disabled:opacity-50 motion-reduce:transition-none data-[state=off]:active:bg-accent [@media(hover:hover)]:data-[state=off]:hover:bg-accent [&>svg]:block [&>svg]:size-4 [&>svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'border-secondary bg-secondary text-secondary-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
        outline:
          'border-border bg-background text-foreground data-[state=on]:border-primary data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
        ghost:
          'border-transparent bg-transparent text-foreground data-[state=on]:bg-accent data-[state=on]:text-foreground',
      },
      size: {
        xs: 'min-h-control-xs px-2.5 py-0.5 text-xs',
        sm: 'min-h-control-sm px-3 py-1',
        md: 'min-h-control-md px-4 py-1',
        lg: 'min-h-control-lg px-5 py-1.5 text-md',
        'icon-sm': 'size-control-sm min-w-control-sm gap-0 p-0',
        'icon-md': 'size-control-md min-w-control-md gap-0 p-0',
        'icon-lg': 'size-control-lg min-w-control-lg gap-0 p-0',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);