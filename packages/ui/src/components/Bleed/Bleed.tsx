import clsx from 'clsx';
import * as React from 'react';
import styles from './Bleed.module.css';

type BleedAs = 'div' | 'section' | 'figure' | 'aside';
type BleedInline = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
type BleedBlock = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type BleedProps = React.HTMLAttributes<HTMLElement> & {
  as?: BleedAs;
  inline?: BleedInline;
  block?: BleedBlock;
};

function Bleed({ as = 'div', inline = 'full', block = 'none', className, ...props }: BleedProps) {
  const Component = as;

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