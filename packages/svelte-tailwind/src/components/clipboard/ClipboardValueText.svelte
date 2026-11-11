<script lang="ts">
  import { ClipboardValueText, type ClipboardValueTextProps } from '@ark-ui/svelte/clipboard';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ClipboardValueTextProps = $props();
</script>

<ClipboardValueText
  {...props}
  bind:ref
  class={cn('min-w-0 overflow-hidden text-ellipsis whitespace-nowrap', className)}
  data-slot="clipboard-value-text"
/>