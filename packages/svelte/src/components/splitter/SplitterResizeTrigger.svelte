<script lang="ts">
  import { SplitterResizeTrigger, type SplitterResizeTriggerProps } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import styles from './Splitter.module.css';
  import SplitterResizeTriggerIndicator from './SplitterResizeTriggerIndicator.svelte';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    ...props
  }: SplitterResizeTriggerProps = $props();
</script>

<SplitterResizeTrigger
  type={asChild ? undefined : 'button'}
  {...props}
  bind:ref
  {asChild}
  class={clsx(styles.resizeTrigger, className)}
  data-slot="splitter-resize-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <SplitterResizeTriggerIndicator />
  {/if}
</SplitterResizeTrigger>