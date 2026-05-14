import clsx from 'clsx';
import * as React from 'react';
import styles from './Bleed.module.css';

type BleedInline = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type BleedBlock = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedAs = React.ElementType;

type BleedOwnProps<As extends BleedAs = 'div'> = {
  as?: As;
  inline?: BleedInline;
  block?: BleedBlock;
};

type BleedProps<As extends BleedAs = 'div'> = BleedOwnProps<As> &
  Omit<React.ComponentPropsWithRef<As>, keyof BleedOwnProps<As>>;

type BleedComponent = <As extends BleedAs = 'div'>(
  props: BleedProps<As>,
) => React.ReactElement | null;

const Bleed = React.forwardRef(function Bleed(
  { as, inline = 'full', block = 'none', className, ...props }: BleedProps<BleedAs>,
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
}) as BleedComponent;

export { Bleed };

export type { BleedProps, BleedAs, BleedInline, BleedBlock };