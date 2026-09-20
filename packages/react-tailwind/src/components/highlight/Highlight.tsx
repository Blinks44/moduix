import { Highlight as HighlightPrimitive } from '@ark-ui/react/highlight';
import type { ComponentProps } from 'react';
import { cn } from '@/lib/moduix/cn';

function HighlightRoot({ className, ...props }: ComponentProps<typeof HighlightPrimitive>) {
  return (
    <HighlightPrimitive
      {...props}
      data-scope="highlight"
      data-part="root"
      data-slot="highlight-root"
      className={cn(
        'rounded-xs bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))] box-decoration-clone px-1 py-px font-medium text-foreground no-underline shadow-none',
        className,
      )}
    />
  );
}

const Highlight = Object.assign(HighlightRoot, {
  Root: HighlightRoot,
});

export { Highlight };