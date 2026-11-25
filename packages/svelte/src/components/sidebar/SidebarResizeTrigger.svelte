<script module lang="ts">
  import type { SplitterResizeTriggerProps } from '@ark-ui/svelte/splitter';

  export interface SidebarResizeTriggerProps extends Omit<SplitterResizeTriggerProps, 'id'> {}
</script>

<script lang="ts">
  import { SplitterResizeTrigger } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import { useA11yLabels } from '@/lib/moduix/a11yLabels';
  import splitterStyles from '../splitter/Splitter.module.css';
  import SplitterResizeTriggerIndicator from '../splitter/SplitterResizeTriggerIndicator.svelte';
  import { useSidebarConfig } from './context';
  import styles from './Sidebar.module.css';

  let {
    asChild,
    children,
    class: className,
    hidden,
    ref = $bindable(null),
    'aria-label': ariaLabel,
    ...props
  }: SidebarResizeTriggerProps = $props();

  const { isMobile, panelId, side } = useSidebarConfig();
  const resizeTriggerId = $derived<`${string}:${string}`>(
    side() === 'left' ? `${panelId()}:content` : `content:${panelId()}`,
  );

  const labels = useA11yLabels();
</script>

<SplitterResizeTrigger
  type={asChild ? undefined : 'button'}
  {...props}
  bind:ref
  {asChild}
  hidden={isMobile() || hidden}
  id={resizeTriggerId}
  aria-label={typeof ariaLabel === 'string' ? ariaLabel : labels().resizeSidebar}
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