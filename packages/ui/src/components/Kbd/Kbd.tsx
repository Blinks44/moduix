import clsx from 'clsx';
import * as React from 'react';
import styles from './Kbd.module.css';

type KbdVariant = 'default' | 'outline' | 'ghost';
type KbdSize = 'sm' | 'md' | 'lg';

type KbdProps = React.ComponentPropsWithoutRef<'kbd'> & {
  variant?: KbdVariant;
  size?: KbdSize;
};

const Kbd = React.forwardRef<React.ComponentRef<'kbd'>, KbdProps>(function Kbd(
  { className, variant = 'default', size = 'md', ...props },
  ref,
) {
  return (
    <kbd
      ref={ref}
      data-slot="kbd-root"
      data-variant={variant}
      data-size={size}
      className={clsx(styles.root, className)}
      {...props}
    />
  );
});

type KbdGroupProps = React.ComponentPropsWithoutRef<'span'> & {
  size?: KbdSize;
};

const KbdGroup = React.forwardRef<React.ComponentRef<'span'>, KbdGroupProps>(function KbdGroup(
  { className, size = 'md', ...props },
  ref,
) {
  return (
    <span
      ref={ref}
      data-slot="kbd-group"
      data-size={size}
      className={clsx(styles.group, className)}
      {...props}
    />
  );
});

export { Kbd, KbdGroup };
export type { KbdProps, KbdGroupProps, KbdVariant, KbdSize };