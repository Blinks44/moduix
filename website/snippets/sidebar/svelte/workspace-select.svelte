<script lang="ts">
  import { createListCollection } from '@ark-ui/svelte/collection';
  import {
    BarChart3,
    Bell,
    CalendarDays,
    FileText,
    Gauge,
    LogOut,
    Plus,
    Settings,
    Users,
  } from '@lucide/svelte';
  import { Avatar, AvatarFallback } from '@moduix/svelte/avatar';
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuItemText,
    MenuPositioner,
    MenuSeparator,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
  import {
    Select,
    SelectContent,
    SelectIndicator,
    SelectOption,
    SelectPositioner,
    SelectTrigger,
    SelectValueText,
  } from '@moduix/svelte/select';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupAction,
    SidebarGroupHeader,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarInset,
    SidebarLabel,
    SidebarNavigationButton,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarSeparator,
    SidebarTrigger,
  } from '@moduix/svelte/sidebar';
  import styles from '@/components/examples/sidebar/sidebar-workspace-select.module.css';

  const workspaces = createListCollection({
    items: [
      { label: 'Acme Inc.', value: 'acme' },
      { label: 'Northstar', value: 'northstar' },
      { label: 'Personal', value: 'personal' },
    ],
  });
</script>

<Sidebar class={styles.root}>
  <SidebarPanel>
    <SidebarHeader>
      <SidebarNavigationList>
        <SidebarNavigationItem>
          <Select
            class={styles.workspaceSelect}
            collection={workspaces}
            defaultValue={['acme']}
            positioning={{ placement: 'right-start', gutter: 8, flip: false }}
          >
            <SelectTrigger>
              {#snippet asChild(triggerProps)}
                <SidebarNavigationButton
                  {...triggerProps()}
                  size="lg"
                  aria-label="Select workspace"
                >
                  <span data-sidebar-icon class={styles.workspaceMark}>AC</span>
                  <SidebarLabel class={styles.accountLabel}>
                    <strong class={styles.accountName}>
                      <SelectValueText placeholder="Select workspace" />
                    </strong>
                    <span class={styles.accountEmail}>Workspace</span>
                  </SidebarLabel>
                  <SelectIndicator />
                </SidebarNavigationButton>
              {/snippet}
            </SelectTrigger>
            <SelectPositioner>
              <SelectContent>
                {#each workspaces.items as workspace (workspace.value)}
                  <SelectOption item={workspace}>{workspace.label}</SelectOption>
                {/each}
              </SelectContent>
            </SelectPositioner>
          </Select>
        </SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupHeader>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Create workspace item"><Plus /></SidebarGroupAction>
        </SidebarGroupHeader>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarNavigationButton active>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="/overview"
                  ><Gauge /><SidebarLabel>Overview</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="/calendar"
                  ><CalendarDays /><SidebarLabel>Calendar</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="/team"><Users /><SidebarLabel>Team</SidebarLabel></a>
              {/snippet}
            </SidebarNavigationButton>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Library</SidebarGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="/documents"
                  ><FileText /><SidebarLabel>Documents</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="/analytics"
                  ><BarChart3 /><SidebarLabel>Analytics</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="/notifications"
                  ><Bell /><SidebarLabel>Notifications</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              {#snippet asChild(buttonProps)}
                <a {...buttonProps()} href="/settings"
                  ><Settings /><SidebarLabel>Settings</SidebarLabel></a
                >
              {/snippet}
            </SidebarNavigationButton>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter class={styles.footer}>
      <SidebarSeparator />
      <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
        <MenuTrigger>
          {#snippet asChild(triggerProps)}
            <SidebarNavigationButton {...triggerProps()} size="lg" aria-label="Open account menu">
              <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
              <SidebarLabel class={styles.accountLabel}>
                <strong class={styles.accountName}>Alex Morgan</strong>
                <span class={styles.accountEmail}>alex@acme.dev</span>
              </SidebarLabel>
            </SidebarNavigationButton>
          {/snippet}
        </MenuTrigger>
        <MenuPositioner>
          <MenuContent>
            <MenuViewport>
              <MenuItem value="profile">Profile</MenuItem>
              <MenuItem value="settings">Account settings</MenuItem>
              <MenuSeparator />
              <MenuItem value="sign-out" tone="destructive">
                <MenuItemText><LogOut /> Sign out</MenuItemText>
              </MenuItem>
            </MenuViewport>
          </MenuContent>
        </MenuPositioner>
      </Menu>
    </SidebarFooter>
  </SidebarPanel>
  <SidebarResizeTrigger />
  <SidebarTrigger />
  <SidebarInset>
    <header class={styles.header}>Dashboard</header>
    <main class={styles.content}>
      <strong>Acme Inc.</strong>
      <section class={styles.card}>
        Switch workspaces without changing the navigation shell.
      </section>
    </main>
  </SidebarInset>
</Sidebar>