import type { ComponentPropsWithoutRef, ElementType } from 'react';
import clsx from 'clsx';
import styles from './Bleed.module.css';

type BleedProps = ComponentPropsWithoutRef<'div'> & {
  as?: ElementType;
  inline?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  block?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

function Bleed({
  as: Root = 'div',
  inline = 'full',
  block = 'none',
  className,
  ...props
}: BleedProps) {
  return (
    <Root
      {...props}
      data-slot="bleed-root"
      data-inline={inline}
      data-block={block}
      className={clsx(styles.root, className)}
    />
  );
}

export { Bleed };