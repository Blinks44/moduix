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
  import { clsx } from 'clsx';
  import styles from './Tabs.module.css';

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
  class={clsx(styles.root, className)}
  data-variant={variant}
  data-size={size}
  data-fitted={fitted ? '' : undefined}
  data-slot="tabs-root"
/>