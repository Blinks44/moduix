<script lang="ts">
  import {
    FloatingPanelStageTrigger,
    type FloatingPanelStageTriggerProps,
  } from '@ark-ui/svelte/floating-panel';
  import { cn } from '@/lib/moduix/cn';
  import { controlButtonClass } from './floating-panel.types';
  import { stageIcons } from './floating-panel.types';

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
  class={cn(!asChild && controlButtonClass, className)}
  {stage}
  data-slot="floating-panel-stage-trigger"
>
  {#if children}
    {@render children()}
  {:else if !asChild}
    <StageIcon />
  {/if}
</FloatingPanelStageTrigger>