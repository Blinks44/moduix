import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Heading.module.css';

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

const Heading = forwardRef<HTMLHeadingElement, HeadingRootProps>(function Heading(
  { as = 'h1', size = defaultSizes[as], weight = 'semibold', className, ...props },
  ref,
) {
  const Element = ark[as] as typeof ark.h1;

  return (
    <Element
      {...props}
      ref={ref}
      data-scope="heading"
      data-part="root"
      data-slot="heading-root"
      data-size={size}
      data-weight={weight}
      className={clsx(styles.root, className)}
    />
  );
});

export { Heading };
export type { HeadingElement, HeadingRootProps, HeadingSize, HeadingWeight };