import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { cva } from 'class-variance-authority';
import { splitProps } from 'solid-js';
import { Dynamic } from 'solid-js/web';
import { cn } from '@/lib/moduix/cn';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

type HeadingRootProps = HTMLArkProps<'h1'> & {
  as?: HeadingElement;
  size?: HeadingSize;
  weight?: HeadingWeight;
};

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

function Heading(props: HeadingRootProps) {
  const [local, others] = splitProps(props, ['as', 'class', 'size', 'weight']);
  const as = () => local.as ?? 'h1';
  const size = () => local.size ?? defaultSizes[as()];
  const weight = () => local.weight ?? 'semibold';

  return (
    <Dynamic
      component={ark[as()]}
      {...others}
      data-scope="heading"
      data-part="root"
      data-slot="heading-root"
      data-size={size()}
      data-weight={weight()}
      class={cn(headingVariants({ size: size(), weight: weight() }), local.class)}
    />
  );
}

export { Heading };
export type { HeadingElement, HeadingRootProps, HeadingSize, HeadingWeight };