import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import styles from './Kbd.module.css';

const KbdRoot = forwardRef<HTMLElement, HTMLArkProps<'kbd'>>(function KbdRoot(
  { className, ...props },
  ref,
) {
  return (
    <ark.kbd
      ref={ref}
      {...props}
      data-scope="kbd"
      data-part="root"
      className={clsx(styles.root, className)}
      data-slot="kbd-root"
    />
  );
});

const KbdGroupPart = forwardRef<HTMLElement, HTMLArkProps<'span'>>(function KbdGroupPart(
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
      className={clsx(styles.group, className)}
      data-slot="kbd-group"
    />
  );
});

const Kbd = Object.assign(KbdRoot, {
  Root: KbdRoot,
  Group: KbdGroupPart,
});

export { Kbd };