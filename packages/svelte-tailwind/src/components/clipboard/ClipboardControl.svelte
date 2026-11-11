<script lang="ts">
  import { ClipboardControl, type ClipboardControlProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ClipboardControlProps = $props();
</script>

<ClipboardControl
  {...props}
  bind:ref
  class={cn('flex w-full items-center gap-2', className)}
  data-slot="clipboard-control"
/>