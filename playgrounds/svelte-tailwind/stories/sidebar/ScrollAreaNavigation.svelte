<script lang="ts">
  import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarLabel,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
  } from '@/components/sidebar';
  import { FileIcon, FolderIcon, FolderOpenIcon } from '@/lib/moduix/icons/ui';

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
        ><FolderOpenIcon /><SidebarLabel>Overview</SidebarLabel></SidebarNavigationButton
      >
    </SidebarNavigationItem>
    <SidebarNavigationItem>
      <SidebarNavigationButton
        ><FolderIcon /><SidebarLabel>Projects</SidebarLabel></SidebarNavigationButton
      >
    </SidebarNavigationItem>
    <SidebarNavigationItem>
      <SidebarNavigationButton
        ><FileIcon /><SidebarLabel>Documents</SidebarLabel></SidebarNavigationButton
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
          ><FileIcon /><SidebarLabel>{project}</SidebarLabel></SidebarNavigationButton
        >
      </SidebarNavigationItem>
    {/each}
  </SidebarNavigationList>
</SidebarGroup>