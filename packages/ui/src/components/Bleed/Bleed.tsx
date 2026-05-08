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
  Omit<React.ComponentPropsWithoutRef<As>, keyof BleedOwnProps<As>>;

function Bleed<As extends BleedAs = 'div'>({
  as,
  inline = 'full',
  block = 'none',
  className,
  ...props
}: BleedProps<As>) {
  const Component = as ?? 'div';

  return (
    <Component
      data-slot="bleed-root"
      data-inline={inline}
      data-block={block}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

export { Bleed };

export type { BleedProps, BleedAs, BleedInline, BleedBlock };