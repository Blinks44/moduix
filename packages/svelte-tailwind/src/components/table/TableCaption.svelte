<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface TableCaptionProps
    extends HTMLProps<'caption'>, PolymorphicProps<'caption'>, RefAttribute {
    side?: 'top' | 'bottom';
  }
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let {
    class: className,
    side = 'bottom',
    ref = $bindable(null),
    ...props
  }: TableCaptionProps = $props();
</script>

<Ark
  as="caption"
  {...props}
  bind:ref
  class={cn(
    'px-4 text-start text-sm leading-5 text-pretty text-muted-foreground group-data-[size=lg]/table:px-5 group-data-[size=sm]/table:px-3 data-[side=bottom]:caption-bottom data-[side=bottom]:pt-3 data-[side=bottom]:pb-2 data-[side=top]:caption-top data-[side=top]:pt-2 data-[side=top]:pb-3',
    className,
  )}
  data-scope="table"
  data-part="caption"
  data-side={side}
  data-slot="table-caption"
/>