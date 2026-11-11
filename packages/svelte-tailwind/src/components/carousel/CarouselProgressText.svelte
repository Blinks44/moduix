<script lang="ts">
  import { CarouselProgressText, type CarouselProgressTextProps } from '@ark-ui/svelte/carousel';
  import { cn } from '@/lib/moduix/cn';
  const progressTextClass = 'text-sm text-muted-foreground tabular-nums [unicode-bidi:isolate]';

  let { class: className, ref = $bindable(null), ...props }: CarouselProgressTextProps = $props();
</script>

<CarouselProgressText
  {...props}
  bind:ref
  class={cn(progressTextClass, className)}
  dir="ltr"
  data-slot="carousel-progress-text"
/>