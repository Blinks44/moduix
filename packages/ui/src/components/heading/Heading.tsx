import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Heading.module.css';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';

const defaultSizeByElement = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
} as const;

type HeadingProps = ComponentPropsWithoutRef<'h1'> & {
  as?: HeadingLevel;
  size?: HeadingSize;
  weight?: HeadingWeight;
};

function Heading({ as = 'h1', size, weight = 'semibold', className, ...props }: HeadingProps) {
  const Tag = as;

  return (
    <Tag
      data-slot="heading-root"
      data-size={size ?? defaultSizeByElement[as]}
      data-weight={weight}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

export { Heading };
export type { HeadingLevel, HeadingProps, HeadingSize, HeadingWeight };