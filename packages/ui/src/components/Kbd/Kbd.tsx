import clsx from 'clsx';
import * as React from 'react';
import styles from './Kbd.module.css';

type KbdVariant = 'default' | 'outline' | 'ghost';
type KbdSize = 'sm' | 'md' | 'lg';

type KbdProps = React.ComponentProps<'kbd'> & {
  variant?: KbdVariant;
  size?: KbdSize;
};

function Kbd({ className, variant = 'default', size = 'md', ...props }: KbdProps) {
  return (
    <kbd
      data-slot="kbd-root"
      data-variant={variant}
      data-size={size}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
}

type KbdGroupProps = React.ComponentProps<'span'> & {
  size?: KbdSize;
};

function KbdGroup({ className, size = 'md', ...props }: KbdGroupProps) {
  return (
    <span
      data-slot="kbd-group"
      data-size={size}
      className={clsx(styles.group, className)}
      {...props}
    />
  );
}

export { Kbd, KbdGroup };
export type { KbdProps, KbdGroupProps, KbdVariant, KbdSize };