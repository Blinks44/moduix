import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { forwardRef } from 'react';
import { cn } from '@/lib/moduix/cn';

const Kbd = forwardRef<HTMLElement, HTMLArkProps<'kbd'>>(function Kbd(
  { className, ...props },
  ref,
) {
  return (
    <ark.kbd
      ref={ref}
      {...props}
      data-scope="kbd"
      data-part="root"
      data-slot="kbd-root"
      className={cn(
        "inline-flex min-h-control-xs min-w-control-xs flex-none items-center justify-center gap-1 rounded-sm border border-border bg-muted px-2 align-middle font-mono text-xs font-medium whitespace-nowrap text-foreground tabular-nums shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_12%,transparent)] select-none [&>svg]:pointer-events-none [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-3",
        className,
      )}
    />
  );
});

const KbdGroup = forwardRef<HTMLElement, HTMLArkProps<'span'>>(function KbdGroup(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      {...props}
      role="group"
      data-scope="kbd"
      data-part="group"
      data-slot="kbd-group"
      className={cn(
        'inline-flex max-w-full flex-wrap items-center gap-1 align-middle text-muted-foreground',
        className,
      )}
    />
  );
});

export { Kbd, KbdGroup };