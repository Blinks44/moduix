<script lang="ts">
  import { DateInputControl, type DateInputControlProps } from '@ark-ui/svelte/date-input';
  import { cn } from '@/lib/moduix/cn';
  let { class: className, ref = $bindable(null), ...props }: DateInputControlProps = $props();
  const controlClass =
    'flex min-h-control-md w-full items-center gap-1 rounded-md border border-input bg-background px-3 py-1 text-md text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color] duration-normal ease-in-out data-disabled:pointer-events-none data-focus:outline-ring/50 data-focus:border-ring data-invalid:border-destructive data-invalid:data-focus:outline-destructive/20';
</script>

<DateInputControl
  {...props}
  bind:ref
  class={cn(controlClass, className)}
  data-slot="date-input-control"
/>