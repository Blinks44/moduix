import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef, type ForwardedRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type BleedAmount = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedAmount | 'full';

const bleedVariants = cva('', {
  variants: {
    inline: {
      none: null,
      xs: '-mx-1',
      sm: '-mx-2',
      md: '-mx-3',
      lg: '-mx-4',
      xl: '-mx-6',
      full: 'mx-[calc(50%_-_50vi)] [inline-size:100vi]',
    },
    block: {
      none: null,
      xs: '-my-1',
      sm: '-my-2',
      md: '-my-3',
      lg: '-my-4',
      xl: '-my-6',
    },
  },
  defaultVariants: {
    inline: 'full',
    block: 'none',
  },
});

const BleedRoot = forwardRef<
  HTMLElement,
  HTMLArkProps<'div'> & {
    inline?: BleedInline;
    block?: BleedAmount;
  }
>(function BleedRoot({ inline = 'full', block = 'none', className, ...props }, ref) {
  return (
    <ark.div
      ref={ref as ForwardedRef<HTMLDivElement>}
      {...props}
      data-scope="bleed"
      data-part="root"
      data-slot="bleed-root"
      data-inline={inline}
      data-block={block}
      className={cn(bleedVariants({ inline, block }), className)}
    />
  );
});

const Bleed = Object.assign(BleedRoot, {
  Root: BleedRoot,
});

export { Bleed };