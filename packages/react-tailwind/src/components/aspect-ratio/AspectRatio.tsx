import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef, CSSProperties } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

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
      className={cn('relative block aspect-[var(--_aspect-ratio-value)] w-full', className)}
      style={{ ...style, '--_aspect-ratio-value': ratio } as CSSProperties}
    />
  );
});

export { AspectRatio };