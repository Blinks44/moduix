<script lang="ts">
  import { EditableControl, type EditableControlProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: EditableControlProps = $props();
</script>

<EditableControl
  {...props}
  bind:ref
  class={cn('flex items-center gap-1', className)}
  data-slot="editable-control"
/>