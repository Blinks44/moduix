import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { cva } from 'class-variance-authority';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps = HTMLArkProps<'h1'> & {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: HeadingWeight;
};

const elements = {
  h1: ark.h1,
  h2: ark.h2,
  h3: ark.h3,
  h4: ark.h4,
  h5: ark.h5,
  h6: ark.h6,
} as const;

const defaultSizes: Record<HeadingElement, HeadingSize> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
};

const headingVariants = cva('m-0 text-foreground tracking-normal text-balance wrap-anywhere', {
  variants: {
    size: {
      xs: 'text-sm',
      sm: 'text-md',
      md: 'text-lg',
      lg: 'text-xl',
      xl: 'text-2xl',
      '2xl': 'text-3xl',
    },
    weight: {
      regular: 'font-regular',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
});

const Heading = forwardRef<ComponentRef<typeof ark.h1>, HeadingProps>(function Heading(
  { as, asChild, size, weight = 'semibold', className, ...props },
  ref,
) {
  const Element = elements[as ?? 'h1'] as typeof ark.h1;

  return (
    <Element
      ref={ref}
      asChild={asChild}
      {...props}
      data-scope="heading"
      data-part="root"
      data-slot="heading-root"
      data-size={size}
      data-weight={weight}
      className={cn(headingVariants({ size: size ?? defaultSizes[as ?? 'h1'], weight }), className)}
    />
  );
});

export { Heading };