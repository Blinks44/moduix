<script lang="ts">
  import { EditableInput, type EditableInputProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: EditableInputProps = $props();
</script>

<EditableInput
  {...props}
  bind:ref
  class={cn(
    'w-full min-w-0 appearance-none bg-transparent text-inherit outline-0 placeholder:text-muted-foreground [&:is(textarea)]:min-h-24 [&:is(textarea)]:resize-y',
    className,
  )}
  data-slot="editable-input"
/>