<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupProps
    extends HTMLProps<'section'>, PolymorphicProps<'section'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarGroupProps = $props();
</script>

<Ark
  as="section"
  {...props}
  bind:ref
  class={cn('flex flex-col gap-1 p-3 group-data-[state=collapsed]/sidebar-panel:px-1', className)}
  data-scope="sidebar"
  data-part="group"
  data-slot="sidebar-group"
/>