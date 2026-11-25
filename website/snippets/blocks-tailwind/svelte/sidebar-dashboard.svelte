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

  const manageItems = [
    { label: 'Team', href: '#team', icon: Users },
    { label: 'Settings', href: '#settings', icon: Settings },
  ];
</script>

<Sidebar class="h-[38rem] min-h-[30rem] w-[min(100%,64rem)] rounded-lg shadow-sm">
  <SidebarPanel>
    <SidebarHeader>
      <a
        class="flex min-w-0 items-center gap-2 font-semibold text-inherit no-underline"
        href="#overview"
      >
        <span
          class="grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground"
          data-sidebar-icon>M</span
        >
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
                  <span
                    class="grid size-control-sm flex-none place-items-center rounded-sm bg-muted text-xs font-semibold text-foreground"
                    data-sidebar-icon>AC</span
                  >
                  <SidebarLabel>Acme Inc.</SidebarLabel>
                  <MenuIndicator><ChevronsUpDown /></MenuIndicator>
                </SidebarNavigationButton>
              {/snippet}
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent class="w-44 max-w-44 min-w-44">
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
    <main class="grid min-h-full gap-6 p-4 sm:p-6" id="overview">
      <header
        class="flex flex-wrap items-start justify-between gap-4 [&_h1]:m-0 [&_h1]:mt-1 [&_h1]:text-2xl [&_p]:m-0"
      >
        <div>
          <p class="text-sm font-medium text-muted-foreground">Workspace</p>
          <h1>Overview</h1>
          <p class="mt-2 text-muted-foreground">
            Everything your team is working on, in one place.
          </p>
        </div>
        <Button size="sm">New project</Button>
      </header>
      <section
        class="grid grid-cols-1 gap-4 sm:grid-cols-3"
        id="projects"
        aria-label="Workspace summary"
      >
        <Card size="sm">
          <CardBody
            class="grid justify-items-center gap-2 text-center [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl"
            ><span>Active projects</span><strong>12</strong></CardBody
          >
        </Card>
        <Card size="sm">
          <CardBody
            class="grid justify-items-center gap-2 text-center [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl"
            ><span>Team members</span><strong>8</strong></CardBody
          >
        </Card>
        <Card size="sm">
          <CardBody
            class="grid justify-items-center gap-2 text-center [&_span]:text-sm [&_span]:text-muted-foreground [&_strong]:text-3xl"
            ><span>Open tasks</span><strong>24</strong></CardBody
          >
        </Card>
      </section>
      <Card class="self-start" size="sm">
        <CardBody class="grid gap-1 [&_strong]:text-foreground">
          <strong>Keep moving</strong>
          <span>Create a project to start sharing work with your team.</span>
        </CardBody>
      </Card>
    </main>
  </SidebarInset>
</Sidebar>