<script module lang="ts">
  import type { HTMLProps, PolymorphicProps, RefAttribute } from '@ark-ui/svelte';

  export interface SidebarExpandedContentProps
    extends HTMLProps<'div'>, PolymorphicProps<'div'>, RefAttribute {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { useSidebar } from './context';

  let { ref = $bindable(null), ...props }: SidebarExpandedContentProps = $props();

  const sidebar = useSidebar();
</script>

<Ark
  as="div"
  {...props}
  bind:ref
  hidden={sidebar.collapsed}
  data-scope="sidebar"
  data-part="expanded-content"
  data-slot="sidebar-expanded-content"
/>