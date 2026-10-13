import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef, type CSSProperties } from 'react';
import styles from './AspectRatio.module.css';

type AspectRatioProps = HTMLArkProps<'div'> & {
  ratio?: number | undefined;
};

const AspectRatio = forwardRef<ComponentRef<typeof ark.div>, AspectRatioProps>(function AspectRatio(
  { ratio = 1, className, style, ...props },
  ref,
) {
  return (
    <ark.div
      {...props}
      ref={ref}
      data-scope="aspect-ratio"
      data-part="root"
      data-slot="aspect-ratio-root"
      className={clsx(styles.root, className)}
      style={{ ...style, '--_aspect-ratio-value': toAspectRatioValue(ratio) } as CSSProperties}
    />
  );
});

// Invalid ratios, such as `0 / 0` before media metadata loads, fall back to a square frame.
function toAspectRatioValue(ratio: number) {
  return Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
}

export { AspectRatio };