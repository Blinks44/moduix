<script lang="ts">
  import {
    FloatingPanelStageTrigger,
    type FloatingPanelStageTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { clsx } from 'clsx';
  import { stageIcons } from './floating-panel.types';
  import styles from './FloatingPanel.module.css';

  let {
    asChild,
    children,
    class: className,
    ref = $bindable(null),
    stage,
    ...props
  }: FloatingPanelStageTriggerProps = $props();

  const StageIcon = $derived(stageIcons[stage]);
</script>

<FloatingPanelStageTrigger
  {...props}
  bind:ref
  {asChild}
  class={clsx(!asChild && styles.controlButton, className)}
  {stage}
  data-slot="floating-panel-stage-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <StageIcon />
  {/if}
</FloatingPanelStageTrigger>