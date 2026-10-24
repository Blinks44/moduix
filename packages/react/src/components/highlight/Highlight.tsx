import { Highlight as HighlightPrimitive } from '@ark-ui/react/highlight';
import { clsx } from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';
import styles from './Highlight.module.css';

function Highlight({ className, ...props }: ComponentPropsWithoutRef<typeof HighlightPrimitive>) {
  return (
    <HighlightPrimitive
      {...props}
      data-scope="highlight"
      data-part="root"
      data-slot="highlight-root"
      className={clsx(styles.root, className)}
    />
  );
}

export { Highlight };