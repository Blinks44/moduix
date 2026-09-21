import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { splitProps } from 'solid-js';
import { cn } from '@/lib/moduix/cn';

function Kbd(props: HTMLArkProps<'kbd'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.kbd
      {...others}
      data-scope="kbd"
      data-part="root"
      data-slot="kbd-root"
      class={cn(
        'box-border inline-flex min-h-control-xs max-w-full min-w-control-xs flex-none items-center justify-center rounded-sm border border-border bg-muted px-2 py-0 text-center align-middle font-mono text-xs font-medium wrap-anywhere text-foreground tabular-nums shadow-[inset_0_-1px_0_color-mix(in_oklab,currentColor_12%,transparent)] select-none',
        local.class,
      )}
    />
  );
}

function KbdGroup(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      {...others}
      role="group"
      data-scope="kbd"
      data-part="group"
      data-slot="kbd-group"
      class={cn(
        'box-border inline-flex max-w-full flex-wrap items-center gap-1 border-0 bg-transparent p-0 align-middle text-muted-foreground shadow-none',
        local.class,
      )}
    />
  );
}

export { Kbd, KbdGroup };
