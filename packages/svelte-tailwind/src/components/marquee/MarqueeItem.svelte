<script lang="ts">
  import { MarqueeItem, type MarqueeItemProps } from '@ark-ui/svelte/marquee';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: MarqueeItemProps = $props();
</script>

<MarqueeItem {...props} bind:ref class={cn('shrink-0', className)} data-slot="marquee-item" />