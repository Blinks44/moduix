<script lang="ts">
  import { TagsInputControl, type TagsInputControlProps } from '@ark-ui/svelte/tags-input';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TagsInputControlProps = $props();

  const controlClass =
    'group flex min-h-control-md w-full flex-wrap items-center gap-1 rounded-md border border-input bg-background px-2 py-[0.3125rem] outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:pointer-events-none data-focus:outline-ring/50 data-focus:border-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive/20';
</script>

<TagsInputControl
  {...props}
  bind:ref
  class={cn(controlClass, className)}
  data-slot="tags-input-control"
/>