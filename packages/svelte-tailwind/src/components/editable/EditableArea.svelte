<script lang="ts">
  import { EditableArea, type EditableAreaProps } from '@ark-ui/svelte/editable';
  import { cn } from '@/lib/moduix/cn';

  const areaClass =
    'flex min-h-control-md min-w-0 items-center rounded-md border border-input bg-background px-3.5 py-1 text-md leading-6 outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out has-focus-visible:outline-ring/50 has-focus-visible:border-ring has-data-invalid:border-destructive has-data-invalid:has-focus-visible:outline-destructive/20 data-disabled:pointer-events-none data-focus:outline-ring/50 data-focus:border-ring has-data-invalid:data-focus:outline-destructive/20';

  let { class: className, ref = $bindable(null), ...props }: EditableAreaProps = $props();
</script>

<EditableArea {...props} bind:ref class={cn(areaClass, className)} data-slot="editable-area" />