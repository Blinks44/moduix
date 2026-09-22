import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef, Ref } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';
import styles from './Typeset.module.css';

const Typeset = forwardRef<HTMLElement, HTMLArkProps<'div'>>(function Typeset(
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
      className={cn(styles.root, className)}
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
      className={cn(styles.scroll, className)}
      role={role ?? (ariaLabel || ariaLabelledBy ? 'region' : undefined)}
      tabIndex={tabIndex}
    />
  );
});

export { Typeset, TypesetScroll };
