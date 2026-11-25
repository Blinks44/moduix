<script module lang="ts">
  import type { TabsRootProviderProps as ArkTabsRootProviderProps } from '@ark-ui/svelte/tabs';
  import type { TabsSize, TabsVariant } from './Tabs.svelte';

  export interface TabsRootProviderProps extends ArkTabsRootProviderProps {
    variant?: TabsVariant;
    size?: TabsSize;
    fitted?: boolean;
  }
</script>

<script lang="ts">
  import { TabsRootProvider } from '@ark-ui/svelte/tabs';
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
    variant = 'default',
    ...props
  }: TabsRootProviderProps = $props();
</script>

<TabsRootProvider
  {...props}
  bind:ref
  class={cn(tabsRootVariants({ size }), className)}
  data-variant={variant}
  data-size={size}
  data-fitted={fitted ? '' : undefined}
  data-slot="tabs-root-provider"
/>