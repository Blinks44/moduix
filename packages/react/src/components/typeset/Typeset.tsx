import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import type { ComponentRef, Ref } from 'react';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Typeset.module.css';

const TypesetRoot = forwardRef<HTMLElement, HTMLArkProps<'div'>>(function TypesetRoot(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref as Ref<ComponentRef<typeof ark.div>>}
      {...props}
      data-scope="typeset"
      data-part="root"
      data-slot="typeset"
      className={clsx(styles.root, normalizeClassName(className))}
    />
  );
});

const TypesetScroll = forwardRef<HTMLElement, HTMLArkProps<'div'>>(function TypesetScroll(
  {
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    className,
    role,
    tabIndex = 0,
    ...props
  },
  ref,
) {
  return (
    <ark.div
      ref={ref as Ref<ComponentRef<typeof ark.div>>}
      {...props}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      data-scope="typeset"
      data-part="scroll"
      data-slot="typeset-scroll"
      className={clsx(styles.scroll, normalizeClassName(className))}
      role={role ?? (ariaLabel || ariaLabelledBy ? 'region' : undefined)}
      tabIndex={tabIndex}
    />
  );
});

const Typeset = Object.assign(TypesetRoot, {
  Root: TypesetRoot,
  Scroll: TypesetScroll,
});

export { Typeset };