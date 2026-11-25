<script lang="ts">
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarLabel,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
  } from '@/components/sidebar';
  import { UiIcon } from '@/lib/moduix/icons/ui';

  const projects = [
    'Website',
    'Mobile app',
    'Design system',
    'Marketing',
    'Internal tools',
    'Customer portal',
    'Analytics',
    'Documentation',
    'Onboarding',
    'Research',
    'Experiments',
    'Archive',
  ];
</script>

<SidebarGroup>
  <SidebarGroupLabel>Workspace</SidebarGroupLabel>
  <SidebarNavigationList>
    <SidebarNavigationItem>
      <SidebarNavigationButton active
        ><UiIcon icon="folder-open" /><SidebarLabel>Overview</SidebarLabel></SidebarNavigationButton
      >
    </SidebarNavigationItem>
    <SidebarNavigationItem>
      <SidebarNavigationButton
        ><UiIcon icon="folder" /><SidebarLabel>Projects</SidebarLabel></SidebarNavigationButton
      >
    </SidebarNavigationItem>
    <SidebarNavigationItem>
      <SidebarNavigationButton
        ><UiIcon icon="file" /><SidebarLabel>Documents</SidebarLabel></SidebarNavigationButton
      >
    </SidebarNavigationItem>
  </SidebarNavigationList>
</SidebarGroup>
<SidebarGroup>
  <SidebarGroupLabel>Recent projects</SidebarGroupLabel>
  <SidebarNavigationList>
    {#each projects as project (project)}
      <SidebarNavigationItem>
        <SidebarNavigationButton
          ><UiIcon icon="file" /><SidebarLabel>{project}</SidebarLabel></SidebarNavigationButton
        >
      </SidebarNavigationItem>
    {/each}
  </SidebarNavigationList>
</SidebarGroup>