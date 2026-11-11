<script lang="ts">
  import { AccordionRootProvider, type AccordionRootProviderProps } from '@ark-ui/svelte/accordion';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: AccordionRootProviderProps = $props();

  const rootClass =
    'flex w-full max-w-full min-w-0 flex-col text-foreground data-[orientation=horizontal]:h-80 data-[orientation=horizontal]:max-h-full data-[orientation=horizontal]:w-auto data-[orientation=horizontal]:flex-row';
</script>

<AccordionRootProvider
  {...props}
  bind:ref
  class={cn(rootClass, className)}
  data-slot="accordion-root-provider"
/>