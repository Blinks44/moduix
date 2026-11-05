<script lang="ts">
  import { CheckboxLabel, type CheckboxLabelProps } from '@ark-ui/svelte/checkbox';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: CheckboxLabelProps = $props();
</script>

<CheckboxLabel
  {...props}
  bind:ref
  class={cn('text-sm leading-5 font-medium', className)}
  data-slot="checkbox-label"
/>