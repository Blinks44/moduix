import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Bleed.module.css';

type BleedAmount = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type BleedInline = BleedAmount | 'full';

const BleedRoot = forwardRef<
  HTMLDivElement,
  HTMLArkProps<'div'> & {
    inline?: BleedInline;
    block?: BleedAmount;
  }
>(function BleedRoot({ inline = 'full', block = 'none', className, ...props }, ref) {
  return (
    <ark.div
      ref={ref}
      {...props}
      data-scope="bleed"
      data-part="root"
      data-slot="bleed-root"
      data-inline={inline}
      data-block={block}
      className={clsx(styles.root, normalizeClassName(className))}
    />
  );
});

const Bleed = Object.assign(BleedRoot, {
  Root: BleedRoot,
});

export { Bleed };