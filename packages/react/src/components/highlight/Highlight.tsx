import type { ComponentProps } from 'react';
import { Highlight as HighlightPrimitive } from '@ark-ui/react/highlight';
import { clsx } from 'clsx';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './Highlight.module.css';

function HighlightRoot({ className, ...props }: ComponentProps<typeof HighlightPrimitive>) {
  return (
    <HighlightPrimitive
      className={clsx(styles.root, normalizeClassName(className))}
      data-scope="highlight"
      data-part="root"
      data-slot="highlight-root"
      {...props}
    />
  );
}

const Highlight = Object.assign(HighlightRoot, {
  Root: HighlightRoot,
});

export { Highlight };