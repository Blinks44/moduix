<script lang="ts">
  import { ProgressValueText, type ProgressValueTextProps } from '@ark-ui/svelte/progress';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: ProgressValueTextProps = $props();
</script>

<ProgressValueText
  {...props}
  bind:ref
  class={cn('text-center text-sm font-medium wrap-anywhere', className)}
  data-slot="progress-circular-value-text"
/>