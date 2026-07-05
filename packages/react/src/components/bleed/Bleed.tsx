import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Bleed.module.css';

const BleedRoot = forwardRef<
  HTMLDivElement,
  HTMLArkProps<'div'> & {
    inline?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
    block?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  }
>(function BleedRoot({ inline = 'full', block = 'none', className, ...props }, ref) {
  return (
    <ark.div
      ref={ref}
      data-scope="bleed"
      data-part="root"
      data-slot="bleed-root"
      data-inline={inline}
      data-block={block}
      className={clsx(styles.root, normalizeClassName(className))}
      {...props}
    />
  );
});

const Bleed = Object.assign(BleedRoot, {
  Root: BleedRoot,
});

export { Bleed };