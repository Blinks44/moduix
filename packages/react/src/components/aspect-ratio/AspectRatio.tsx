import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { forwardRef, type ComponentRef, type CSSProperties } from 'react';
import styles from './AspectRatio.module.css';

type AspectRatioProps = HTMLArkProps<'div'> & {
  ratio: number;
};

const AspectRatio = forwardRef<ComponentRef<typeof ark.div>, AspectRatioProps>(function AspectRatio(
  { ratio, className, style, ...props },
  ref,
) {
  if (!Number.isFinite(ratio) || ratio <= 0) {
    throw new RangeError('AspectRatio `ratio` must be a finite number greater than zero.');
  }

  return (
    <ark.div
      {...props}
      ref={ref}
      data-scope="aspect-ratio"
      data-part="root"
      data-slot="aspect-ratio-root"
      className={clsx(styles.root, className)}
      style={{ ...style, '--_aspect-ratio-value': ratio } as CSSProperties}
    />
  );
});

export { AspectRatio };