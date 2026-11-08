<script lang="ts">
  import {
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupHeader,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarSeparator,
  } from '@/components/sidebar';
  import Layout from './Layout.svelte';

  let inputRef: Element | null = $state(null);
  let separatorRef: Element | null = $state(null);

  export const getRefs = () => ({ inputRef, separatorRef });
</script>

<Layout>
  <SidebarHeader>
    <SidebarInput bind:ref={inputRef} placeholder="Search" />
  </SidebarHeader>
  <SidebarContent>
    <SidebarGroup>
      <SidebarGroupHeader>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarGroupAction aria-label="Create workspace item">+</SidebarGroupAction>
      </SidebarGroupHeader>
      <SidebarNavigationList>
        <SidebarNavigationItem>
          <SidebarNavigationButton>Overview</SidebarNavigationButton>
        </SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarGroup>
  </SidebarContent>
  <SidebarFooter><SidebarSeparator bind:ref={separatorRef} /></SidebarFooter>
</Layout>