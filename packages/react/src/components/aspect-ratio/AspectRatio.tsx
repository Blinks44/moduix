import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef, type CSSProperties } from 'react';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import styles from './AspectRatio.module.css';

type AspectRatioRootProps = HTMLArkProps<'div'> & {
  ratio: number;
};

const AspectRatioRoot = forwardRef<ComponentRef<typeof ark.div>, AspectRatioRootProps>(
  function AspectRatioRoot({ ratio, className, style, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="aspect-ratio"
        data-part="root"
        data-slot="aspect-ratio-root"
        className={clsx(styles.root, normalizeClassName(className))}
        style={{ '--aspect-ratio-value': ratio, ...style } as CSSProperties}
        {...props}
      />
    );
  },
);

const AspectRatio = Object.assign(AspectRatioRoot, {
  Root: AspectRatioRoot,
});

export { AspectRatio };