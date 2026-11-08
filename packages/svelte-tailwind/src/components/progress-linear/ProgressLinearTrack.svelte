<script lang="ts">
  import { ProgressTrack, type ProgressTrackProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressTrackProps = $props();
</script>

<ProgressTrack
  {...props}
  bind:ref
  class={cn(
    'col-span-full h-2 overflow-hidden rounded-full bg-muted ring-1 ring-border ring-inset data-[orientation=vertical]:flex data-[orientation=vertical]:h-full data-[orientation=vertical]:w-2 data-[orientation=vertical]:items-end data-[orientation=vertical]:justify-self-center',
    className,
  )}
  data-slot="progress-linear-track"
/>