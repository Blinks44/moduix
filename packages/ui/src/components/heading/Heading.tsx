import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Heading.module.css';

export type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';

export type HeadingRootProps = HTMLArkProps<'h1'> & {
  size?: HeadingSize;
  weight?: HeadingWeight;
};

const HeadingRoot = forwardRef<HTMLHeadingElement, HeadingRootProps>(function HeadingRoot(
  { size, weight = 'semibold', className, ...props },
  ref,
) {
  return (
    <ark.h1
      ref={ref}
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