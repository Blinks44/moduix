<script setup lang="ts">
import {
  FileSearch,
  History,
  MessageSquare,
  PanelRight,
  Settings,
  SlidersHorizontal,
} from '@lucide/vue';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuPositioner,
  MenuTrigger,
  MenuViewport,
} from '@moduix/vue/menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarLabel,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarTrigger,
} from '@moduix/vue/sidebar';
import styles from '@/components/examples/sidebar/sidebar-right-sidebar.module.css';
</script>

<template>
  <Sidebar side="right" :class="styles.root">
    <SidebarInset>
      <header :class="styles.header">Dashboard</header>
      <main :class="styles.content">
        <strong>Page settings</strong>
        <section :class="styles.card">Select an Inspector tool to edit this page.</section>
      </main>
    </SidebarInset>
    <SidebarTrigger />
    <SidebarResizeTrigger />
    <SidebarPanel>
      <SidebarHeader
        ><strong data-sidebar-icon>IN</strong><SidebarLabel>Inspector</SidebarLabel></SidebarHeader
      >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tools</SidebarGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem
              ><SidebarNavigationButton active
                ><PanelRight /><SidebarLabel>Properties</SidebarLabel></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton
                ><SlidersHorizontal /><SidebarLabel
                  >Appearance</SidebarLabel
                ></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton
                ><FileSearch /><SidebarLabel>Accessibility</SidebarLabel></SidebarNavigationButton
              ></SidebarNavigationItem
            >
          </SidebarNavigationList>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Activity</SidebarGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem
              ><SidebarNavigationButton
                ><History /><SidebarLabel>Version history</SidebarLabel></SidebarNavigationButton
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem
              ><SidebarNavigationButton
                ><MessageSquare /><SidebarLabel>Comments</SidebarLabel></SidebarNavigationButton
              ></SidebarNavigationItem
            >
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Menu :positioning="{ placement: 'right-end', gutter: 8, flip: false }">
          <MenuTrigger as-child>
            <SidebarNavigationButton
              ><Settings /><SidebarLabel>Inspector settings</SidebarLabel></SidebarNavigationButton
            >
          </MenuTrigger>
          <MenuPositioner>
            <MenuContent
              ><MenuViewport>
                <MenuItem value="preferences">Preferences</MenuItem>
                <MenuItem value="shortcuts">Keyboard shortcuts</MenuItem>
                <MenuItem value="reset">Reset panels</MenuItem>
              </MenuViewport></MenuContent
            >
          </MenuPositioner>
        </Menu>
      </SidebarFooter>
    </SidebarPanel>
  </Sidebar>
</template>