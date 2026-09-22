import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cn } from '@/lib/moduix/cn';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps = ComponentProps<typeof ark.h1> & {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: HeadingWeight;
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
  'data-size'?: string;
  'data-weight'?: string;
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

function Heading(props: HeadingProps) {
  const [local, others] = splitProps(props, [
    'as',
    'asChild',
    'size',
    'weight',
    'class',
    'data-scope',
    'data-part',
    'data-slot',
    'data-size',
    'data-weight',
  ]);
  const Element = () => elements[local.as ?? 'h1'] as typeof ark.h1;

  return (
    <Dynamic
      component={Element()}
      asChild={local.asChild}
      {...others}
      data-scope="heading"
      data-part="root"
      data-slot="heading-root"
      data-size={local.size}
      data-weight={local.weight ?? 'semibold'}
      class={cn(
        headingVariants({
          size: local.size ?? defaultSizes[local.as ?? 'h1'],
          weight: local.weight ?? 'semibold',
        }),
        local.class,
      )}
    />
  );
}

export { Heading };