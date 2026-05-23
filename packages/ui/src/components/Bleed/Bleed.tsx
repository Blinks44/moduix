import clsx from 'clsx';
import * as React from 'react';
import styles from './Bleed.module.css';

type BleedSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedSize | 'full';
type BleedBlock = BleedSize;

type BleedProps = React.ComponentPropsWithoutRef<'div'> & {
  as?: React.ElementType;
  inline?: BleedInline;
  block?: BleedBlock;
};

const Bleed = React.forwardRef(function Bleed(
  { as, inline = 'full', block = 'none', className, ...props }: BleedProps,
  ref: React.ForwardedRef<Element>,
) {
  const Component = as ?? 'div';

  return (
    <Component
      ref={ref}
      data-slot="bleed-root"
      data-inline={inline}
      data-block={block}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
});

export { Bleed };

export type { BleedProps };