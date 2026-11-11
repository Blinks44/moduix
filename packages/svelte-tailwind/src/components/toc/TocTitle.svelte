<script lang="ts">
  import { TocTitle, type TocTitleProps } from '@ark-ui/svelte/toc';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TocTitleProps = $props();
</script>

<TocTitle
  {...props}
  bind:ref
  class={cn('m-0 mb-2 text-sm leading-5 font-semibold text-foreground', className)}
  data-slot="toc-title"
/>