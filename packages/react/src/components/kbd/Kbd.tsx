import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Kbd.module.css';

export type KbdRootProps = HTMLArkProps<'kbd'>;
export type KbdGroupProps = HTMLArkProps<'kbd'>;

const KbdRoot = forwardRef<HTMLElement, KbdRootProps>(function KbdRoot(
  { className, ...props },
  ref,
) {
  return (
    <ark.kbd
      ref={ref}
      data-scope="kbd"
      data-part="root"
      data-slot="kbd-root"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const KbdGroupPart = forwardRef<HTMLElement, KbdGroupProps>(function KbdGroupPart(
  { className, ...props },
  ref,
) {
  return (
    <ark.kbd
      ref={ref}
      data-scope="kbd"
      data-part="group"
      data-slot="kbd-group"
      className={clsx(styles.group, normalizeClassName(className))}
      {...props}
    />
  );
});

const Kbd = Object.assign(KbdRoot, {
  Root: KbdRoot,
  Group: KbdGroupPart,
});

export { Kbd };