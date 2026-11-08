<script lang="ts">
  import {
    SidebarLabel,
    SidebarNavigationBadge,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarNavigationSubButton,
    SidebarNavigationSubItem,
    SidebarNavigationSubList,
  } from '@/components/sidebar';
  import Layout from './Layout.svelte';
</script>

<Layout>
  <SidebarNavigationList>
    <SidebarNavigationItem>
      <SidebarNavigationButton active size="sm">
        {#snippet asChild(props)}<a {...props()} href="#overview">Overview</a>{/snippet}
      </SidebarNavigationButton>
      <SidebarNavigationBadge data-testid="primary-badge">12</SidebarNavigationBadge>
      <SidebarNavigationSubList>
        <SidebarNavigationSubItem>
          <SidebarNavigationSubButton active>
            {#snippet asChild(props)}<a {...props()} href="#details">Details</a>{/snippet}
          </SidebarNavigationSubButton>
          <SidebarNavigationBadge data-testid="nested-badge">3</SidebarNavigationBadge>
        </SidebarNavigationSubItem>
        <SidebarNavigationSubItem>
          <SidebarNavigationSubButton href="#very-long-item">
            <svg data-testid="nested-icon"></svg>
            <SidebarLabel>A very long nested navigation item</SidebarLabel>
          </SidebarNavigationSubButton>
        </SidebarNavigationSubItem>
      </SidebarNavigationSubList>
    </SidebarNavigationItem>
  </SidebarNavigationList>
</Layout>