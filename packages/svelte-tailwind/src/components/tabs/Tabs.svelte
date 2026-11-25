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
  import { cva } from 'class-variance-authority';
  import { cn } from '@/lib/moduix/cn';

  const tabsRootVariants = cva(
    'group/tabs flex w-full min-w-0 flex-col gap-3 text-foreground data-[orientation=vertical]:flex-row',
    {
      variants: {
        size: {
          sm: '[--_tabs-size:var(--moduix-size-sm)]',
          md: '[--_tabs-size:var(--moduix-size-md)]',
          lg: '[--_tabs-size:var(--moduix-size-lg)]',
        },
      },
      defaultVariants: {
        size: 'md',
      },
    },
  );

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
  class={cn(tabsRootVariants({ size }), className)}
  data-variant={variant}
  data-size={size}
  data-fitted={fitted ? '' : undefined}
  data-slot="tabs-root"
/>