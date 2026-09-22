import { Highlight as HighlightPrimitive } from '@ark-ui/react/highlight';
import { clsx } from 'clsx';
import type { ComponentProps } from 'react';
import styles from './Highlight.module.css';

function Highlight({ className, ...props }: ComponentProps<typeof HighlightPrimitive>) {
  return (
    <HighlightPrimitive
      className={clsx(styles.root, className)}
      {...props}
      data-scope="highlight"
      data-part="root"
      data-slot="highlight-root"
    />
  );
}

export { Highlight };