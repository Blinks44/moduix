<script lang="ts">
  import { FieldsetHelperText, type FieldsetHelperTextProps } from '@ark-ui/svelte/fieldset';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FieldsetHelperTextProps = $props();
</script>

<FieldsetHelperText
  {...props}
  bind:ref
  class={cn('text-sm wrap-anywhere text-muted-foreground', className)}
  data-slot="fieldset-helper-text"
/>