<script setup lang="ts">
import { ChevronsUpDown, FileText, FolderOpen, Gauge, LogOut, Plus, Users } from '@lucide/vue';
import { Avatar, AvatarFallback } from '@moduix/vue/avatar';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
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
} from '@moduix/vue/menu';
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
  SidebarInset,
  SidebarInput,
  SidebarLabel,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarSeparator,
  SidebarResizeTrigger,
  SidebarTooltip,
  SidebarTrigger,
} from '@moduix/vue/sidebar';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation-and-account-menu.module.css';
</script>

<template>
  <Sidebar :class="styles.root">
    <SidebarPanel>
      <SidebarHeader>
        <div :class="styles.headerContent">
          <div :class="styles.brand">
            <strong data-sidebar-icon :class="styles.brandMark">M</strong>
            <SidebarLabel>Moduix</SidebarLabel>
          </div>
          <SidebarInput aria-label="Search workspace" placeholder="Search" size="sm" />
        </div>
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
                <SidebarNavigationButton active as-child>
                  <a href="/overview"><Gauge /><SidebarLabel>Overview</SidebarLabel></a>
                </SidebarNavigationButton>
              </SidebarTooltip>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarExpandedContent>
                <Collapsible default-open>
                  <SidebarTooltip content="Projects">
                    <CollapsibleTrigger as-child>
                      <SidebarNavigationButton>
                        <FolderOpen /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator />
                      </SidebarNavigationButton>
                    </CollapsibleTrigger>
                  </SidebarTooltip>
                  <CollapsibleContent>
                    <SidebarNavigationSubList>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton as-child
                          ><a href="/projects/website">Website</a></SidebarNavigationSubButton
                        >
                      </SidebarNavigationSubItem>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton as-child
                          ><a href="/projects/mobile">Mobile app</a></SidebarNavigationSubButton
                        >
                      </SidebarNavigationSubItem>
                    </SidebarNavigationSubList>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarExpandedContent>
              <SidebarCollapsedContent>
                <Menu :positioning="{ placement: 'right-start', gutter: 8 }">
                  <MenuTrigger as-child>
                    <SidebarNavigationButton aria-label="Open projects" title="Projects"
                      ><FolderOpen
                    /></SidebarNavigationButton>
                  </MenuTrigger>
                  <MenuPositioner>
                    <MenuContent
                      ><MenuViewport>
                        <MenuItem value="website" as-child
                          ><a href="/projects/website">Website</a></MenuItem
                        >
                        <MenuItem value="mobile-app" as-child
                          ><a href="/projects/mobile">Mobile app</a></MenuItem
                        >
                      </MenuViewport></MenuContent
                    >
                  </MenuPositioner>
                </Menu>
              </SidebarCollapsedContent>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarTooltip content="Team">
                <SidebarNavigationButton as-child>
                  <a href="/team"><Users /><SidebarLabel>Team</SidebarLabel></a>
                </SidebarNavigationButton>
              </SidebarTooltip>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarTooltip content="Documents">
                <SidebarNavigationButton as-child>
                  <a href="/documents"><FileText /><SidebarLabel>Documents</SidebarLabel></a>
                </SidebarNavigationButton>
              </SidebarTooltip>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter :class="styles.footer">
        <SidebarSeparator />
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <Menu :positioning="{ placement: 'right-end', gutter: 8, flip: false }">
              <MenuTrigger as-child>
                <SidebarNavigationButton
                  size="lg"
                  aria-label="Open account menu"
                  :class="styles.accountButton"
                  title="Account"
                >
                  <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
                  <SidebarLabel :class="styles.accountLabel">
                    <strong :class="styles.accountName">Alex Morgan</strong>
                    <span :class="styles.accountEmail">alex@acme.dev</span>
                  </SidebarLabel>
                  <MenuIndicator><ChevronsUpDown /></MenuIndicator>
                </SidebarNavigationButton>
              </MenuTrigger>
              <MenuPositioner>
                <MenuContent :class="styles.menuContent"
                  ><MenuViewport>
                    <MenuItem value="profile"><MenuItemText>Profile</MenuItemText></MenuItem>
                    <MenuItem value="settings"><MenuItemText>Settings</MenuItemText></MenuItem>
                    <MenuSeparator />
                    <MenuItem value="sign-out" tone="destructive"
                      ><MenuItemText><LogOut /> Sign out</MenuItemText></MenuItem
                    >
                  </MenuViewport></MenuContent
                >
              </MenuPositioner>
            </Menu>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarFooter>
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset>
      <header :class="styles.header">Dashboard</header>
      <main :class="styles.content">
        <strong>Project overview</strong>
        <section :class="styles.card">Your team has 3 updates ready to review.</section>
      </main>
    </SidebarInset>
  </Sidebar>
</template>