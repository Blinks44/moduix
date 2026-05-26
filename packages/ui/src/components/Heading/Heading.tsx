import clsx from 'clsx';
import * as React from 'react';
import styles from './Heading.module.css';

const defaultSizeByElement = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
} as const;

function Heading({
  as = 'h1',
  size,
  weight = 'semibold',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'h1'> & {
  as?: keyof typeof defaultSizeByElement;
  size?: (typeof defaultSizeByElement)[keyof typeof defaultSizeByElement];
  weight?: 'regular' | 'medium' | 'semibold' | 'bold';
}) {
  const Component = as;
  const resolvedSize = size ?? defaultSizeByElement[as];

  return (
    <Component
      data-slot="heading-root"
      data-size={resolvedSize}
      data-weight={weight}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

export { Heading };