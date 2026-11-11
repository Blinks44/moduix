<script lang="ts">
  import {
    SidebarCollapsedContent,
    SidebarExpandedContent,
    SidebarNavigationItem,
    SidebarNavigationList,
  } from '@/components/sidebar';
  import Layout from './Layout.svelte';
</script>

<Layout>
  <SidebarNavigationList>
    <SidebarNavigationItem>
      <SidebarExpandedContent data-testid="expanded-projects">
        <button type="button">Expanded projects</button>
      </SidebarExpandedContent>
      <SidebarCollapsedContent data-testid="collapsed-projects">
        <button type="button">Collapsed projects</button>
      </SidebarCollapsedContent>
    </SidebarNavigationItem>
  </SidebarNavigationList>
</Layout>