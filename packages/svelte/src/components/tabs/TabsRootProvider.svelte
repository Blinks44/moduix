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
  import { clsx } from 'clsx';
  import styles from './Tabs.module.css';

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
  class={clsx(styles.root, className)}
  data-variant={variant}
  data-size={size}
  data-fitted={fitted ? '' : undefined}
  data-slot="tabs-root-provider"
/>