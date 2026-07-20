import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Typeset.module.css';

const TypesetRoot = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function TypesetRoot(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="typeset"
      data-part="root"
      data-slot="typeset"
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const TypesetScroll = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function TypesetScroll(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="typeset"
      data-part="scroll"
      data-slot="typeset-scroll"
      className={clsx(styles.scroll, normalizeClassName(className))}
      {...props}
    />
  );
});

const Typeset = Object.assign(TypesetRoot, {
  Root: TypesetRoot,
  Scroll: TypesetScroll,
});

export { Typeset };