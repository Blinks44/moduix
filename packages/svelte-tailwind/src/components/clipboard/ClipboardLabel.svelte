<script lang="ts">
  import { ClipboardLabel, type ClipboardLabelProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ClipboardLabelProps = $props();
</script>

<ClipboardLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium', className)}
  data-slot="clipboard-label"
/>