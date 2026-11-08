<script lang="ts">
  import { ChevronsUpDown, FileText, FolderOpen, Gauge, LogOut, Plus, Users } from '@lucide/svelte';
  import { Avatar, AvatarFallback } from '@moduix/svelte/avatar';
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import {
    Menu,
    MenuContent,
    MenuIndicator,
    MenuItem,
    MenuItemText,
    MenuPositioner,
    MenuSeparator,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
  import {
    Sidebar,
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
    SidebarInset,
    SidebarLabel,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarNavigationSubButton,
    SidebarNavigationSubItem,
    SidebarNavigationSubList,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarSeparator,
    SidebarTooltip,
    SidebarTrigger,
  } from '@moduix/svelte/sidebar';
  import { Stack } from '@moduix/svelte/stack';
  import styles from '@/components/examples/sidebar/sidebar-nested-navigation-and-account-menu.module.css';
</script>

<Sidebar class={styles.root}>
  <SidebarPanel>
    <SidebarHeader>
      <Stack gap="0.75rem">
        <div class={styles.brand}>
          <strong data-sidebar-icon class={styles.brandMark}>M</strong>
          <SidebarLabel>moduix</SidebarLabel>
        </div>
        <SidebarInput aria-label="Search workspace" placeholder="Search" size="sm" />
      </Stack>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupHeader>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Create workspace item"><Plus /></SidebarGroupAction>
        </SidebarGroupHeader>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarTooltip content="Overview">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()} active>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="/overview"
                      ><Gauge /><SidebarLabel>Overview</SidebarLabel></a
                    >
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarExpandedContent>
              <Collapsible defaultOpen>
                <SidebarTooltip content="Projects">
                  {#snippet children(tooltipProps)}
                    <CollapsibleTrigger>
                      {#snippet asChild(triggerProps)}
                        <SidebarNavigationButton {...tooltipProps(triggerProps())}>
                          <FolderOpen /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator
                          />
                        </SidebarNavigationButton>
                      {/snippet}
                    </CollapsibleTrigger>
                  {/snippet}
                </SidebarTooltip>
                <CollapsibleContent>
                  <SidebarNavigationSubList>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="/projects/website">
                        <SidebarLabel>Website</SidebarLabel>
                      </SidebarNavigationSubButton>
                    </SidebarNavigationSubItem>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="/projects/mobile">
                        <SidebarLabel>Mobile app</SidebarLabel>
                      </SidebarNavigationSubButton>
                    </SidebarNavigationSubItem>
                  </SidebarNavigationSubList>
                </CollapsibleContent>
              </Collapsible>
            </SidebarExpandedContent>
            <SidebarCollapsedContent>
              <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                <MenuTrigger>
                  {#snippet asChild(triggerProps)}
                    <SidebarNavigationButton
                      {...triggerProps()}
                      aria-label="Open projects"
                      title="Projects"
                    >
                      <FolderOpen />
                    </SidebarNavigationButton>
                  {/snippet}
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent>
                    <MenuViewport>
                      <MenuItem value="website">
                        {#snippet asChild(itemProps)}
                          <a {...itemProps()} href="/projects/website">Website</a>
                        {/snippet}
                      </MenuItem>
                      <MenuItem value="mobile-app">
                        {#snippet asChild(itemProps)}
                          <a {...itemProps()} href="/projects/mobile">Mobile app</a>
                        {/snippet}
                      </MenuItem>
                    </MenuViewport>
                  </MenuContent>
                </MenuPositioner>
              </Menu>
            </SidebarCollapsedContent>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarTooltip content="Team">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()}>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="/team"><Users /><SidebarLabel>Team</SidebarLabel></a
                    >
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarTooltip content="Documents">
              {#snippet children(tooltipProps)}
                <SidebarNavigationButton {...tooltipProps()}>
                  {#snippet asChild(buttonProps)}
                    <a {...buttonProps()} href="/documents">
                      <FileText /><SidebarLabel>Documents</SidebarLabel>
                    </a>
                  {/snippet}
                </SidebarNavigationButton>
              {/snippet}
            </SidebarTooltip>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter class={styles.footer}>
      <SidebarSeparator />
      <SidebarNavigationList>
        <SidebarNavigationItem>
          <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
            <MenuTrigger>
              {#snippet asChild(triggerProps)}
                <SidebarNavigationButton
                  {...triggerProps()}
                  size="lg"
                  aria-label="Open account menu"
                  class={styles.accountButton}
                  title="Account"
                >
                  <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
                  <SidebarLabel class={styles.accountLabel}>
                    <strong class={styles.accountName}>Alex Morgan</strong>
                    <span class={styles.accountEmail}>alex@acme.dev</span>
                  </SidebarLabel>
                  <MenuIndicator><ChevronsUpDown /></MenuIndicator>
                </SidebarNavigationButton>
              {/snippet}
            </MenuTrigger>
            <MenuPositioner>
              <MenuContent class={styles.menuContent}>
                <MenuViewport>
                  <MenuItem value="profile"><MenuItemText>Profile</MenuItemText></MenuItem>
                  <MenuItem value="settings"><MenuItemText>Settings</MenuItemText></MenuItem>
                  <MenuSeparator />
                  <MenuItem value="sign-out" tone="destructive">
                    <MenuItemText><LogOut /> Sign out</MenuItemText>
                  </MenuItem>
                </MenuViewport>
              </MenuContent>
            </MenuPositioner>
          </Menu>
        </SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarFooter>
  </SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset>
    <header class={styles.header}>Dashboard</header>
    <main class={styles.content}>
      <strong>Project overview</strong>
      <section class={styles.card}>Your team has 3 updates ready to review.</section>
    </main>
  </SidebarInset>
</Sidebar>