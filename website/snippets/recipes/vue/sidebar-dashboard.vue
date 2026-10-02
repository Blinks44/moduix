<script setup lang="ts">
import { ChevronsUpDown, FileText, FolderOpen, Gauge, Settings, Users } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
import { Card, CardBody } from '@moduix/vue/card';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleIndicator,
  CollapsibleContent,
} from '@moduix/vue/collapsible';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
} from '@moduix/vue/menu';
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
} from '@moduix/vue/sidebar';
import styles from './sidebar-dashboard.module.css';
const manageItems = [
  { label: 'Team', href: '#team', icon: Users },
  { label: 'Settings', href: '#settings', icon: Settings },
];
</script>
<template>
  <Sidebar :class="styles.root">
    <SidebarPanel>
      <SidebarHeader
        ><a :class="styles.brand" href="#overview"
          ><span :class="styles.brandMark" data-sidebar-icon>M</span
          ><SidebarLabel>Moduix</SidebarLabel></a
        ></SidebarHeader
      >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem
              ><SidebarTooltip content="Overview"
                ><SidebarNavigationButton active as-child
                  ><a href="#overview"
                    ><Gauge /><SidebarLabel>Overview</SidebarLabel></a
                  ></SidebarNavigationButton
                ></SidebarTooltip
              ></SidebarNavigationItem
            >
            <SidebarNavigationItem>
              <Collapsible default-open>
                <SidebarTooltip content="Projects"
                  ><CollapsibleTrigger as-child
                    ><SidebarNavigationButton
                      ><FolderOpen /><SidebarLabel>Projects</SidebarLabel
                      ><CollapsibleIndicator /></SidebarNavigationButton></CollapsibleTrigger
                ></SidebarTooltip>
                <CollapsibleContent
                  ><SidebarNavigationSubList>
                    <SidebarNavigationSubItem
                      ><SidebarNavigationSubButton as-child
                        ><a href="#website">Website</a></SidebarNavigationSubButton
                      ></SidebarNavigationSubItem
                    >
                    <SidebarNavigationSubItem
                      ><SidebarNavigationSubButton as-child
                        ><a href="#mobile-app">Mobile app</a></SidebarNavigationSubButton
                      ></SidebarNavigationSubItem
                    >
                  </SidebarNavigationSubList></CollapsibleContent
                >
              </Collapsible>
            </SidebarNavigationItem>
            <SidebarNavigationItem
              ><SidebarTooltip content="Documents"
                ><SidebarNavigationButton as-child
                  ><a href="#documents"
                    ><FileText /><SidebarLabel>Documents</SidebarLabel></a
                  ></SidebarNavigationButton
                ></SidebarTooltip
              ></SidebarNavigationItem
            >
          </SidebarNavigationList>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Manage</SidebarGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem v-for="item in manageItems" :key="item.href"
              ><SidebarTooltip :content="item.label"
                ><SidebarNavigationButton as-child
                  ><a :href="item.href"
                    ><component :is="item.icon" /><SidebarLabel>{{ item.label }}</SidebarLabel></a
                  ></SidebarNavigationButton
                ></SidebarTooltip
              ></SidebarNavigationItem
            >
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter
        ><SidebarNavigationList
          ><SidebarNavigationItem>
            <Menu :positioning="{ placement: 'right-end', gutter: 8, flip: false }">
              <MenuTrigger as-child
                ><SidebarNavigationButton
                  size="lg"
                  aria-label="Open workspace menu"
                  title="Workspace"
                  ><span :class="styles.workspaceMark" data-sidebar-icon>AC</span
                  ><SidebarLabel>Acme Inc.</SidebarLabel
                  ><MenuIndicator><ChevronsUpDown /></MenuIndicator></SidebarNavigationButton
              ></MenuTrigger>
              <MenuPositioner
                ><MenuContent :class="styles.workspaceMenu"
                  ><MenuViewport>
                    <MenuItem value="workspace-settings"
                      ><MenuItemText
                        ><MenuItemTextContent
                          ><MenuItemTextIcon><Settings /></MenuItemTextIcon
                          ><MenuItemTextLabel
                            >Workspace settings</MenuItemTextLabel
                          ></MenuItemTextContent
                        ></MenuItemText
                      ></MenuItem
                    >
                    <MenuItem value="manage-members"
                      ><MenuItemText
                        ><MenuItemTextContent
                          ><MenuItemTextIcon><Users /></MenuItemTextIcon
                          ><MenuItemTextLabel
                            >Manage members</MenuItemTextLabel
                          ></MenuItemTextContent
                        ></MenuItemText
                      ></MenuItem
                    >
                  </MenuViewport></MenuContent
                ></MenuPositioner
              >
            </Menu>
          </SidebarNavigationItem></SidebarNavigationList
        ></SidebarFooter
      >
    </SidebarPanel>
    <SidebarResizeTrigger /><SidebarTrigger />
    <SidebarInset>
      <main :class="styles.content" id="overview">
        <header :class="styles.header">
          <div>
            <p :class="styles.eyebrow">Workspace</p>
            <h1>Overview</h1>
            <p :class="styles.description">Everything your team is working on, in one place.</p>
          </div>
          <Button size="sm">New project</Button>
        </header>
        <section :class="styles.metrics" id="projects" aria-label="Workspace summary">
          <Card size="sm"
            ><CardBody :class="styles.metric"
              ><span>Active projects</span><strong>12</strong></CardBody
            ></Card
          >
          <Card size="sm"
            ><CardBody :class="styles.metric"
              ><span>Team members</span><strong>8</strong></CardBody
            ></Card
          >
          <Card size="sm"
            ><CardBody :class="styles.metric"
              ><span>Open tasks</span><strong>24</strong></CardBody
            ></Card
          >
        </section>
        <Card :class="styles.activity" size="sm"
          ><CardBody :class="styles.activityBody"
            ><strong>Keep moving</strong
            ><span>Create a project to start sharing work with your team.</span></CardBody
          ></Card
        >
      </main>
    </SidebarInset>
  </Sidebar>
</template>