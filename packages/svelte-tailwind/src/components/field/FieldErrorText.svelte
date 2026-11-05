<script lang="ts">
  import { FieldErrorText, type FieldErrorTextProps } from '@ark-ui/svelte/field';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: FieldErrorTextProps = $props();
</script>

<FieldErrorText
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium wrap-anywhere text-destructive', className)}
  data-slot="field-error-text"
/>