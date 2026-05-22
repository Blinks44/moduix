import clsx from 'clsx';
import * as React from 'react';
import styles from './Heading.module.css';

type HeadingAs = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type HeadingWeight = 'regular' | 'medium' | 'semibold' | 'bold';
type HeadingAlign = 'left' | 'center' | 'right';

type HeadingProps = React.ComponentPropsWithoutRef<'h1'> & {
  as?: HeadingAs;
  size?: HeadingSize;
  weight?: HeadingWeight;
  align?: HeadingAlign;
};

const defaultSizeByElement: Record<HeadingAs, HeadingSize> = {
  h1: '2xl',
  h2: 'xl',
  h3: 'lg',
  h4: 'md',
  h5: 'sm',
  h6: 'xs',
};

const Heading = React.forwardRef(function Heading(
  { as = 'h1', size, weight = 'semibold', align, className, ...props }: HeadingProps,
  ref: React.ForwardedRef<HTMLHeadingElement>,
) {
  const Component = as;

  return (
    <Component
      ref={ref}
      data-slot="heading-root"
      data-size={size ?? defaultSizeByElement[as]}
      data-weight={weight}
      data-align={align}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
});

export {
  Heading,
  type HeadingProps,
  type HeadingAs,
  type HeadingSize,
  type HeadingWeight,
  type HeadingAlign,
};