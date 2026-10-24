import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Kbd.module.css';

const Kbd = forwardRef<HTMLElement, HTMLArkProps<'kbd'>>(function Kbd(
  { className, ...props },
  ref,
) {
  return (
    <ark.kbd
      ref={ref}
      {...props}
      data-scope="kbd"
      data-part="root"
      data-slot="kbd-root"
      className={clsx(styles.root, className)}
    />
  );
});

const KbdGroup = forwardRef<HTMLElement, HTMLArkProps<'span'>>(function KbdGroup(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      role="group"
      data-scope="kbd"
      data-part="group"
      data-slot="kbd-group"
      className={clsx(styles.group, className)}
    />
  );
});

export { Kbd, KbdGroup };