<script setup lang="ts">
import { createListCollection } from '@ark-ui/vue/collection';
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
} from '@lucide/vue';
import { Avatar, AvatarFallback } from '@moduix/vue/avatar';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuItemText,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from '@moduix/vue/select';
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
} from '@moduix/vue/sidebar';
import styles from '@/components/examples/sidebar/sidebar-workspace-select.module.css';

const workspaces = createListCollection({
  items: [
    { label: 'Acme Inc.', value: 'acme' },
    { label: 'Northstar', value: 'northstar' },
    { label: 'Personal', value: 'personal' },
  ],
});
</script>

<template>
  <Sidebar :class="styles.root">
    <SidebarPanel>
      <SidebarHeader>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <Select
              :class="styles.workspaceSelect"
              :collection="workspaces"
              :default-value="['acme']"
              :positioning="{ placement: 'right-start', gutter: 8, flip: false }"
            >
              <SelectTrigger as-child>
                <SidebarNavigationButton size="lg" aria-label="Select workspace">
                  <span data-sidebar-icon :class="styles.workspaceMark">AC</span>
                  <SidebarLabel :class="styles.accountLabel">
                    <strong :class="styles.accountName"
                      ><SelectValueText placeholder="Select workspace"
                    /></strong>
                    <span :class="styles.accountEmail">Workspace</span>
                  </SidebarLabel>
                  <SelectIndicator />
                </SidebarNavigationButton>
              </SelectTrigger>
              <SelectPositioner>
                <SelectContent>
                  <SelectItem
                    v-for="workspace in workspaces.items"
                    :key="workspace.value"
                    :item="workspace"
                  >
                    <SelectItemText>{{ workspace.label }}</SelectItemText>
                    <SelectItemIndicator />
                  </SelectItem>
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
            <SidebarNavigationItem
              ><SidebarNavigationButton active as-child
                ><a href="/overview"
                  ><Gauge /><SidebarLabel>Overview</SidebarLabel></a
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton as-child
                ><a href="/calendar"
                  ><CalendarDays /><SidebarLabel>Calendar</SidebarLabel></a
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton as-child
                ><a href="/team"
                  ><Users /><SidebarLabel>Team</SidebarLabel></a
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
          </SidebarNavigationList>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Library</SidebarGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem
              ><SidebarNavigationButton as-child
                ><a href="/documents"
                  ><FileText /><SidebarLabel>Documents</SidebarLabel></a
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton as-child
                ><a href="/analytics"
                  ><BarChart3 /><SidebarLabel>Analytics</SidebarLabel></a
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton as-child
                ><a href="/notifications"
                  ><Bell /><SidebarLabel>Notifications</SidebarLabel></a
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton as-child
                ><a href="/settings"
                  ><Settings /><SidebarLabel>Settings</SidebarLabel></a
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter :class="styles.footer">
        <SidebarSeparator />
        <Menu :positioning="{ placement: 'right-end', gutter: 8, flip: false }">
          <MenuTrigger as-child>
            <SidebarNavigationButton size="lg" aria-label="Open account menu">
              <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
              <SidebarLabel :class="styles.accountLabel">
                <strong :class="styles.accountName">Alex Morgan</strong>
                <span :class="styles.accountEmail">alex@acme.dev</span>
              </SidebarLabel>
            </SidebarNavigationButton>
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent
              ><MenuViewport>
                <MenuItem value="profile">Profile</MenuItem>
                <MenuItem value="settings">Account settings</MenuItem>
                <MenuSeparator />
                <MenuItem value="sign-out" tone="destructive"
                  ><MenuItemText><LogOut /> Sign out</MenuItemText></MenuItem
                >
              </MenuViewport></MenuContent
            >
          </MenuPositioner>
        </Menu>
      </SidebarFooter>
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset>
      <header :class="styles.header">Dashboard</header>
      <main :class="styles.content">
        <strong>Acme Inc.</strong>
        <section :class="styles.card">
          Switch workspaces without changing the navigation shell.
        </section>
      </main>
    </SidebarInset>
  </Sidebar>
</template>