import { Highlight as HighlightPrimitive } from '@ark-ui/solid/highlight';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type HighlightProps = ComponentProps<typeof HighlightPrimitive> & {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function Highlight(props: HighlightProps) {
  const [local, others] = splitProps(props, ['class', 'data-scope', 'data-part', 'data-slot']);

  return (
    <HighlightPrimitive
      {...others}
      data-scope="highlight"
      data-part="root"
      data-slot="highlight-root"
      class={cn(
        'rounded-xs bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))] box-decoration-clone px-1 py-px font-medium text-foreground no-underline shadow-none',
        local.class,
      )}
    />
  );
}

export { Highlight };