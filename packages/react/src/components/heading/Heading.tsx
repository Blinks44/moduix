import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Heading.module.css';

type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingElement = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingRootProps = HTMLArkProps<'h1'> & {
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

const HeadingRoot = forwardRef<HTMLHeadingElement, HeadingRootProps>(function HeadingRoot(
  { as, asChild, size, weight = 'semibold', className, ...props },
  ref,
) {
  const Element = elements[as ?? 'h1'] as typeof ark.h1;

  return (
    <Element
      ref={ref}
      asChild={asChild}
      data-scope="heading"
      data-part="root"
      data-slot="heading-root"
      data-size={size}
      data-weight={weight}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const Heading = Object.assign(HeadingRoot, {
  Root: HeadingRoot,
});

export { Heading };