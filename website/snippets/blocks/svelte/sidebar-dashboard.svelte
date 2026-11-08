<script lang="ts">
  import ChevronsUpDown from '@lucide/svelte/icons/chevrons-up-down';
  import FileText from '@lucide/svelte/icons/file-text';
  import FolderOpen from '@lucide/svelte/icons/folder-open';
  import Gauge from '@lucide/svelte/icons/gauge';
  import Settings from '@lucide/svelte/icons/settings';
  import Users from '@lucide/svelte/icons/users';
  import { Button } from '@/components/ui/button';
  import { Card, CardBody } from '@/components/ui/card';
  import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleIndicator,
    CollapsibleContent,
  } from '@/components/ui/collapsible';
  import {
    Menu,
    MenuTrigger,
    MenuIndicator,
    MenuPositioner,
    MenuContent,
    MenuViewport,
    MenuItem,
    MenuItemText,
  } from '@/components/ui/menu';
  import {
    Sidebar,
    SidebarPanel,
    SidebarInset,
    SidebarResizeTrigger,
    SidebarTrigger,
    SidebarLabel,
    SidebarHeader,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarNavigationList,
    SidebarNavigationItem,
    SidebarTooltip,
    SidebarNavigationButton,
    SidebarNavigationSubList,
    SidebarNavigationSubItem,
    SidebarNavigationSubButton,
  } from '@/components/ui/sidebar';
  import styles from './sidebar-dashboard.module.css';

  const manageItems = [
    { label: 'Team', href: '#team', icon: Users },
    { label: 'Settings', href: '#settings', icon: Settings },
  ];
</script>

<Sidebar class={styles.root}>
  <SidebarPanel>
    <SidebarHeader>
      <a class={styles.brand} href="#overview">
        <span class={styles.brandMark} data-sidebar-icon>M</span>
        <SidebarLabel>moduix</SidebarLabel>
      </a>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarTooltip content="Overview">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()} active>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="#overview">
                      <Gauge /><SidebarLabel>Overview</SidebarLabel>
                    </a>
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <Collapsible defaultOpen>
              <SidebarTooltip content="Projects">
                {#snippet children(tooltipProps)}
                  <CollapsibleTrigger>
                    {#snippet asChild(triggerProps)}
                      <SidebarNavigationButton {...tooltipProps(triggerProps())}>
                        <FolderOpen /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator />
                      </SidebarNavigationButton>
                    {/snippet}
                  </CollapsibleTrigger>
                {/snippet}
              </SidebarTooltip>
              <CollapsibleContent>
                <SidebarNavigationSubList>
                  <SidebarNavigationSubItem>
                    <SidebarNavigationSubButton>
                      {#snippet asChild(props)}
                        <a {...props()} href="#website"><SidebarLabel>Website</SidebarLabel></a>
                      {/snippet}
                    </SidebarNavigationSubButton>
                  </SidebarNavigationSubItem>
                  <SidebarNavigationSubItem>
                    <SidebarNavigationSubButton>
                      {#snippet asChild(props)}
                        <a {...props()} href="#mobile-app"
                          ><SidebarLabel>Mobile app</SidebarLabel></a
                        >
                      {/snippet}
                    </SidebarNavigationSubButton>
                  </SidebarNavigationSubItem>
                </SidebarNavigationSubList>
              </CollapsibleContent>
            </Collapsible>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarTooltip content="Documents">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()}>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="#documents">
                      <FileText /><SidebarLabel>Documents</SidebarLabel>
                    </a>
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Manage</SidebarGroupLabel>
        <SidebarNavigationList>
          {#each manageItems as item (item.href)}
            <SidebarNavigationItem>
              <SidebarTooltip content={item.label}>
                {#snippet children(tooltipProps)}
                  <SidebarNavigationButton {...tooltipProps()}>
                    {#snippet asChild(buttonProps)}
                      <a {...buttonProps()} href={item.href}>
                        <item.icon /><SidebarLabel>{item.label}</SidebarLabel>
                      </a>
                    {/snippet}
                  </SidebarNavigationButton>
                {/snippet}
              </SidebarTooltip>
            </SidebarNavigationItem>
          {/each}
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter>
      <SidebarNavigationList>
        <SidebarNavigationItem>
          <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
            <MenuTrigger>
              {#snippet asChild(triggerProps)}
                <SidebarNavigationButton
                  {...triggerProps()}
                  size="lg"
                  aria-label="Open workspace menu"
                  title="Workspace"
                >
                  <span class={styles.workspaceMark} data-sidebar-icon>AC</span>
                  <SidebarLabel>Acme Inc.</SidebarLabel>
                  <MenuIndicator><ChevronsUpDown /></MenuIndicator>
                </SidebarNavigationButton>
              {/snippet}
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent class={styles.workspaceMenu}>
                <MenuViewport>
                  <MenuItem value="workspace-settings">
                    <MenuItemText><Settings />Workspace settings</MenuItemText>
                  </MenuItem>
                  <MenuItem value="manage-members">
                    <MenuItemText><Users />Manage members</MenuItemText>
                  </MenuItem>
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
        </SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarFooter>
  </SidebarPanel>
  <SidebarResizeTrigger /><SidebarTrigger />
  <SidebarInset>
    <main class={styles.content} id="overview">
      <header class={styles.header}>
        <div>
          <p class={styles.eyebrow}>Workspace</p>
          <h1>Overview</h1>
          <p class={styles.description}>Everything your team is working on, in one place.</p>
        </div>
        <Button size="sm">New project</Button>
      </header>
      <section class={styles.metrics} id="projects" aria-label="Workspace summary">
        <Card size="sm">
          <CardBody class={styles.metric}><span>Active projects</span><strong>12</strong></CardBody>
        </Card>
        <Card size="sm">
          <CardBody class={styles.metric}><span>Team members</span><strong>8</strong></CardBody>
        </Card>
        <Card size="sm">
          <CardBody class={styles.metric}><span>Open tasks</span><strong>24</strong></CardBody>
        </Card>
      </section>
      <Card class={styles.activity} size="sm">
        <CardBody class={styles.activityBody}>
          <strong>Keep moving</strong>
          <span>Create a project to start sharing work with your team.</span>
        </CardBody>
      </Card>
    </main>
  </SidebarInset>
</Sidebar>