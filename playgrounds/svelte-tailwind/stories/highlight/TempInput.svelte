<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';
  import { cn } from '@/lib/moduix/cn';

  // Temporary stand-in until the moduix Input is ported (group B). Replace with `@/components/input`.
  const inputClass =
    'w-full min-w-0 rounded-md border border-input bg-background px-3 py-1 text-md leading-6 text-foreground outline-focus-halo outline-transparent transition-[border-color,outline-color,opacity] duration-normal ease-in-out placeholder:text-muted-foreground focus-visible:outline-ring/50 focus-visible:border-ring min-h-control-md';

  let { class: className, value = $bindable(), ...props }: HTMLInputAttributes = $props();
</script>

<input
  {...props}
  bind:value
  class={cn(inputClass, className)}
  data-scope="field"
  data-part="input"
  data-slot="input-root"
  data-size="md"
/>