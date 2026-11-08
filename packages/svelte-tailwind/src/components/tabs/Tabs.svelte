<script module lang="ts">
  import type { TabsRootProps as ArkTabsRootProps } from '@ark-ui/svelte/tabs';

  export type TabsVariant = 'default' | 'line';

  export type TabsSize = 'sm' | 'md' | 'lg';

  export interface TabsRootProps extends ArkTabsRootProps {
    variant?: TabsVariant;
    size?: TabsSize;
    fitted?: boolean;
  }
</script>

<script lang="ts">
  import { TabsRoot } from '@ark-ui/svelte/tabs';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    fitted,
    ref = $bindable(null),
    size = 'md',
    value = $bindable(),
    variant = 'default',
    ...props
  }: TabsRootProps = $props();
</script>

<TabsRoot
  {...props}
  bind:ref
  bind:value
  class={cn(
    'group/tabs flex w-full min-w-0 flex-col gap-3 text-foreground [--_tabs-size:var(--moduix-size-md)] data-[orientation=vertical]:flex-row data-[size=lg]:[--_tabs-size:var(--moduix-size-lg)] data-[size=sm]:[--_tabs-size:var(--moduix-size-sm)]',
    className,
  )}
  data-variant={variant}
  data-size={size}
  data-fitted={fitted ? '' : undefined}
  data-slot="tabs-root"
/>