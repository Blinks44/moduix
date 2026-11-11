<script lang="ts">
  import { AccordionRoot, type AccordionRootProps } from '@ark-ui/svelte/accordion';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    ref = $bindable(null),
    value = $bindable(),
    ...props
  }: AccordionRootProps = $props();

  const rootClass =
    'flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row';
</script>

<AccordionRoot
  {...props}
  bind:ref
  bind:value
  class={cn(rootClass, className)}
  data-slot="accordion-root"
/>