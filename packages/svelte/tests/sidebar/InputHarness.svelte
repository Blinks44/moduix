<script lang="ts">
  import { SidebarInput, SidebarSeparator } from '@/components/sidebar';
  import Layout from './Layout.svelte';

  let value = $state('search');

  export const getValue = () => value;
</script>

<Layout>
  <SidebarInput bind:value size="sm" htmlSize={24} aria-label="Search" />
  <SidebarSeparator orientation="vertical" size="lg" variant="dotted">
    {#snippet asChild(props)}<hr {...props()} data-testid="sidebar-separator" />{/snippet}
  </SidebarSeparator>
</Layout>