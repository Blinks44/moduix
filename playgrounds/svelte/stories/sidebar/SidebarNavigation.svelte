<script lang="ts">
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@/components/collapsible';
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@/components/menu';
  import {
    SidebarCollapsedContent,
    SidebarContent,
    SidebarExpandedContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupHeader,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInput,
    SidebarLabel,
    SidebarNavigationBadge,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarNavigationSubButton,
    SidebarNavigationSubItem,
    SidebarNavigationSubList,
    SidebarSeparator,
    SidebarTooltip,
    useSidebar,
  } from '@/components/sidebar';
  import { FileIcon, FolderIcon, PlusIcon } from '@/lib/moduix/icons/ui';
  import AccountMenu from './AccountMenu.svelte';
  import styles from './Sidebar.stories.module.css';
  import WorkspaceSelect from './WorkspaceSelect.svelte';

  const sidebar = useSidebar();
</script>

<SidebarHeader>
  <div class={styles.headerStack} style:width={sidebar.collapsed ? 'auto' : undefined}>
    <div class={styles.brand}>
      <span class={styles.brandMark} data-sidebar-icon>M</span>
      <SidebarLabel>moduix</SidebarLabel>
    </div>
    <SidebarInput aria-label="Search workspace" placeholder="Search" size="sm" />
  </div>
</SidebarHeader>
<SidebarContent>
  <SidebarGroup>
    <SidebarGroupHeader>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarGroupAction aria-label="Create workspace item" title="Create workspace item">
        <PlusIcon />
      </SidebarGroupAction>
    </SidebarGroupHeader>
    <SidebarNavigationList>
      <SidebarNavigationItem>
        <SidebarTooltip content="Overview">
          {#snippet children(tooltipProps)}
            <SidebarNavigationButton {...tooltipProps()} active>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="#overview"
                  ><FolderIcon /><SidebarLabel>Overview</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          {/snippet}
        </SidebarTooltip>
        <SidebarNavigationBadge>12</SidebarNavigationBadge>
      </SidebarNavigationItem>
      <SidebarNavigationItem>
        <SidebarExpandedContent>
          <Collapsible defaultOpen class={styles.collapsible}>
            <SidebarTooltip content="Projects">
              {#snippet children(tooltipProps)}
                <CollapsibleTrigger>
                  {#snippet asChild(triggerProps)}
                    <SidebarNavigationButton {...tooltipProps(triggerProps())}>
                      <FolderIcon /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator />
                    </SidebarNavigationButton>
                  {/snippet}
                </CollapsibleTrigger>
              {/snippet}
            </SidebarTooltip>
            <CollapsibleContent>
              <SidebarNavigationSubList>
                <SidebarNavigationSubItem>
                  <SidebarNavigationSubButton href="#website"
                    ><SidebarLabel>Website</SidebarLabel></SidebarNavigationSubButton
                  >
                  <SidebarNavigationBadge>3</SidebarNavigationBadge>
                </SidebarNavigationSubItem>
                <SidebarNavigationSubItem>
                  <SidebarNavigationSubButton href="#mobile"
                    ><SidebarLabel>Mobile app</SidebarLabel></SidebarNavigationSubButton
                  >
                </SidebarNavigationSubItem>
              </SidebarNavigationSubList>
            </CollapsibleContent>
          </Collapsible>
        </SidebarExpandedContent>
        <SidebarCollapsedContent>
          <Menu positioning={{ placement: 'right-start', gutter: 8, flip: false }}>
            <MenuTrigger>
              {#snippet asChild(triggerProps)}
                <SidebarNavigationButton
                  {...triggerProps()}
                  aria-label="Open projects"
                  title="Projects"
                >
                  <FolderIcon />
                </SidebarNavigationButton>
              {/snippet}
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent>
                <MenuViewport>
                  <MenuItem value="website">
                    {#snippet asChild(itemProps)}<a {...itemProps()} href="#website">Website</a
                      >{/snippet}
                  </MenuItem>
                  <MenuItem value="mobile">
                    {#snippet asChild(itemProps)}<a {...itemProps()} href="#mobile">Mobile app</a
                      >{/snippet}
                  </MenuItem>
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
        </SidebarCollapsedContent>
      </SidebarNavigationItem>
      <SidebarNavigationItem>
        <SidebarTooltip content="Documents">
          {#snippet children(tooltipProps)}
            <SidebarNavigationButton {...tooltipProps()}>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="#documents"
                  ><FileIcon /><SidebarLabel>Documents</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          {/snippet}
        </SidebarTooltip>
      </SidebarNavigationItem>
    </SidebarNavigationList>
  </SidebarGroup>
</SidebarContent>
<SidebarFooter class={styles.footerStack}>
  <SidebarSeparator />
  <SidebarNavigationList>
    <SidebarNavigationItem><WorkspaceSelect /></SidebarNavigationItem>
    <SidebarNavigationItem><AccountMenu /></SidebarNavigationItem>
  </SidebarNavigationList>
</SidebarFooter>