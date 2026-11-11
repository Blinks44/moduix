<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarGroupHeaderProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { cn } from '@/lib/moduix/cn';

  let { class: className, ref = $bindable(null), ...props }: SidebarGroupHeaderProps = $props();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  class={cn('flex min-w-0 items-center gap-2', className)}
  data-scope="sidebar"
  data-part="group-header"
  data-slot="sidebar-group-header"
/>