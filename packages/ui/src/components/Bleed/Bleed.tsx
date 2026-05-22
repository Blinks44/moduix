import clsx from 'clsx';
import * as React from 'react';
import styles from './Bleed.module.css';

type BleedInline = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type BleedBlock = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedAs = React.ElementType;

type BleedOwnProps = {
  as?: BleedAs;
  inline?: BleedInline;
  block?: BleedBlock;
};

type BleedProps<As extends BleedAs = 'div'> = BleedOwnProps &
  Omit<React.ComponentPropsWithRef<As>, keyof BleedOwnProps>;

const Bleed = React.forwardRef(function Bleed(
  { as, inline = 'full', block = 'none', className, ...props }: BleedProps,
  ref: React.ForwardedRef<Element>,
) {
  const Component: React.ElementType = as ?? 'div';

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