<script lang="ts">
  import { FieldsetErrorText, type FieldsetErrorTextProps } from '@ark-ui/svelte/fieldset';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FieldsetErrorTextProps = $props();
</script>

<FieldsetErrorText
  {...props}
  bind:ref
  class={cn('text-sm font-medium wrap-anywhere text-destructive', className)}
  data-slot="fieldset-error-text"
/>