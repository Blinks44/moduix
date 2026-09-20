import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type SeparatorProps = HTMLArkProps<'span'> & {
  orientation?: 'horizontal' | 'vertical';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'dashed' | 'dotted';
};

const separatorVariants = cva('block shrink-0 m-0 border-border', {
  variants: {
    orientation: {
      horizontal: 'h-0 w-full',
      vertical: 'h-[1em] w-0',
    },
    size: {
      xs: '',
      sm: '',
      md: '',
      lg: '',
    },
    variant: {
      solid: 'border-solid',
      dashed: 'border-dashed',
      dotted: 'border-dotted',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'xs', class: 'border-t-[0.5px]' },
    { orientation: 'horizontal', size: 'sm', class: 'border-t' },
    { orientation: 'horizontal', size: 'md', class: 'border-t-2' },
    { orientation: 'horizontal', size: 'lg', class: 'border-t-[3px]' },
    { orientation: 'vertical', size: 'xs', class: 'border-s-[0.5px]' },
    { orientation: 'vertical', size: 'sm', class: 'border-s' },
    { orientation: 'vertical', size: 'md', class: 'border-s-2' },
    { orientation: 'vertical', size: 'lg', class: 'border-s-[3px]' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'sm',
    variant: 'solid',
  },
});

const SeparatorRoot = forwardRef<HTMLSpanElement, SeparatorProps>(function SeparatorRoot(
  {
    asChild,
    className,
    orientation = 'horizontal',
    role,
    size = 'sm',
    variant = 'solid',
    'aria-orientation': _ariaOrientation,
    ...props
  },
  ref,
) {
  const resolvedRole = role ?? 'separator';

  return (
    <ark.span
      {...props}
      ref={ref}
      asChild={asChild}
      role={resolvedRole}
      aria-orientation={resolvedRole === 'separator' ? orientation : undefined}
      data-scope="separator"
      data-part="root"
      data-slot="separator-root"
      data-orientation={orientation}
      data-size={size}
      data-variant={variant}
      className={cn(separatorVariants({ orientation, size, variant }), className)}
    />
  );
});

const Separator = Object.assign(SeparatorRoot, {
  Root: SeparatorRoot,
});

export { Separator };