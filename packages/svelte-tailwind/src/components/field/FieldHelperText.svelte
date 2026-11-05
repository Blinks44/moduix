<script lang="ts">
  import { FieldHelperText, type FieldHelperTextProps } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FieldHelperTextProps = $props();
</script>

<FieldHelperText
  {...props}
  bind:ref
  class={cn('text-sm leading-5 wrap-anywhere text-muted-foreground', className)}
  data-slot="field-helper-text"
/>