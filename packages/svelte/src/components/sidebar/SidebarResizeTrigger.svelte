<script module lang="ts">
  import type { SplitterResizeTriggerProps } from '@ark-ui/svelte/splitter';

  export interface SidebarResizeTriggerProps extends Omit<SplitterResizeTriggerProps, 'id'> {}
</script>

<script lang="ts">
  import { SplitterResizeTrigger } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import { a11yLabels } from '@/lib/moduix/a11yLabels';
  import splitterStyles from '../splitter/Splitter.module.css';
  import SplitterResizeTriggerIndicator from '../splitter/SplitterResizeTriggerIndicator.svelte';
  import { useSidebarConfig } from './context';
  import styles from './Sidebar.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: SidebarResizeTriggerProps = $props();

  const { panelId, side } = useSidebarConfig();
  const resizeTriggerId = $derived<`${string}:${string}`>(
    side() === 'left' ? `${panelId()}:content` : `content:${panelId()}`,
  );
</script>

<SplitterResizeTrigger
  type={asChild ? undefined : 'button'}
  {...props}
  bind:ref
  {asChild}
  id={resizeTriggerId}
  aria-label={typeof ariaLabel === 'string' ? ariaLabel : a11yLabels.resizeSidebar}
  class={clsx(splitterStyles.resizeTrigger, styles.resizeTrigger, className)}
  data-side={side()}
  data-slot="sidebar-resize-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <SplitterResizeTriggerIndicator />
  {/if}
</SplitterResizeTrigger>