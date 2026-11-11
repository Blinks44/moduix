<script lang="ts">
  import { FieldLabel, type FieldLabelProps } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FieldLabelProps = $props();
</script>

<FieldLabel
  {...props}
  bind:ref
  class={cn(
    'inline-flex items-center gap-2 text-sm leading-5 font-medium wrap-anywhere text-foreground',
    className,
  )}
  data-slot="field-label"
/>