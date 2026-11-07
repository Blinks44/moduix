<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';
  import ColorPickerChannelSlider from './ColorPickerChannelSlider.svelte';

  let { class: className, ...props }: Omit<HTMLAttributes<HTMLDivElement>, 'children'> = $props();
</script>

<div
  {...props}
  class={cn('flex min-w-0 flex-1 flex-col gap-2', className)}
  data-slot="color-picker-sliders"
>
  <ColorPickerChannelSlider channel="hue" />
  <ColorPickerChannelSlider channel="alpha" />
</div>