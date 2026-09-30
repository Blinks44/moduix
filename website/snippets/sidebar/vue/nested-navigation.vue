<script setup lang="ts">
import { FolderOpen as FolderOpenIcon } from '@lucide/vue';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/vue/collapsible';
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
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarGroup,
  SidebarGroupLabel,
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
  SidebarTrigger,
} from '@moduix/vue/sidebar';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation.module.css';
</script>

<template>
  <Sidebar :class="styles.root">
    <SidebarPanel>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarExpandedContent>
                <Collapsible default-open>
                  <CollapsibleTrigger as-child>
                    <SidebarNavigationButton>
                      <FolderOpenIcon /><SidebarLabel>Projects</SidebarLabel
                      ><CollapsibleIndicator />
                    </SidebarNavigationButton>
                  </CollapsibleTrigger>
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
                      ><FolderOpenIcon
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
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset>
      <main :class="styles.content">
        <strong>Project overview</strong>
        <p :class="styles.description">
          Collapse the sidebar to open the same links in a popup menu.
        </p>
      </main>
    </SidebarInset>
  </Sidebar>
</template>