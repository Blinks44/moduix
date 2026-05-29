import type { ComponentPropsWithoutRef } from 'react';
import clsx from 'clsx';
import styles from './Kbd.module.css';

function Kbd({ className, ...props }: ComponentPropsWithoutRef<'kbd'>) {
  return <kbd data-slot="kbd-root" className={clsx(styles.root, className)} {...props} />;
}

function KbdGroup({ className, ...props }: ComponentPropsWithoutRef<'span'>) {
  return <span data-slot="kbd-group" className={clsx(styles.group, className)} {...props} />;
}

export { Kbd, KbdGroup };