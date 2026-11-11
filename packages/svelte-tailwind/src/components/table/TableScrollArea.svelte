<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableScrollAreaProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: TableScrollAreaProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn(
    'relative w-full min-w-0 overflow-x-auto rounded-lg border border-border bg-card',
    className,
  )}
  data-scope="table"
  data-part="scroll-area"
  data-slot="table-scroll-area"
/>