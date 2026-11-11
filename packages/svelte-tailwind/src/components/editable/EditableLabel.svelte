<script lang="ts">
  import { EditableLabel, type EditableLabelProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: EditableLabelProps = $props();
</script>

<EditableLabel
  {...props}
  bind:ref
  class={cn(
    'col-span-full flex items-center gap-1 text-sm leading-5 font-medium wrap-anywhere data-invalid:text-destructive',
    className,
  )}
  data-slot="editable-label"
/>