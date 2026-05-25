import clsx from 'clsx';
import * as React from 'react';
import styles from './Bleed.module.css';

function Bleed({
  as,
  inline = 'full',
  block = 'none',
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  as?: React.ElementType;
  inline?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  block?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}) {
  const Component = as ?? 'div';

  return (
    <Component
      {...props}
      data-slot="bleed-root"
      data-inline={inline}
      data-block={block}
      className={clsx(styles.root, className)}
    />
  );
}

export { Bleed };