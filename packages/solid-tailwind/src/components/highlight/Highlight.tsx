import { Highlight as HighlightPrimitive } from '@ark-ui/solid/highlight';
import type { ComponentProps } from 'solid-js';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

type HighlightRootProps = ComponentProps<typeof HighlightPrimitive> & {
  'data-scope'?: string;
  'data-part'?: string;
  'data-slot'?: string;
};

function HighlightRoot(props: HighlightRootProps) {
  const [local, others] = splitProps(props, ['class', 'data-scope', 'data-part', 'data-slot']);

  return (
    <HighlightPrimitive
      {...others}
      data-scope="highlight"
      data-part="root"
      data-slot="highlight-root"
      class={cn(
        'rounded-xs bg-[color-mix(in_oklab,var(--color-warning)_40%,var(--color-accent))] [box-decoration-break:clone] px-1 py-px font-medium text-foreground no-underline shadow-none [-webkit-box-decoration-break:clone]',
        local.class,
      )}
    />
  );
}

const Highlight = Object.assign(HighlightRoot, {
  Root: HighlightRoot,
});

export { Highlight };