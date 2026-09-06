import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import type { ComponentRef, CSSProperties } from 'react';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

type AspectRatioRootProps = HTMLArkProps<'div'> & {
  ratio: number;
};

const AspectRatioRoot = forwardRef<ComponentRef<typeof ark.div>, AspectRatioRootProps>(
  function AspectRatioRoot({ ratio, className, style, ...props }, ref) {
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
        className={cn(
          'relative box-border block aspect-[var(--_aspect-ratio-value)] w-full overflow-hidden rounded-[var(--moduix-aspect-ratio-radius,var(--moduix-radius-md))] [&>:where(img,video,iframe,canvas,svg)]:box-border [&>:where(img,video,iframe,canvas,svg)]:block [&>:where(img,video,iframe,canvas,svg)]:h-full [&>:where(img,video,iframe,canvas,svg)]:w-full [&>iframe]:border-0',
          className,
        )}
        style={{ ...style, '--_aspect-ratio-value': ratio } as CSSProperties}
      />
    );
  },
);

const AspectRatio = Object.assign(AspectRatioRoot, {
  Root: AspectRatioRoot,
});

export { AspectRatio };