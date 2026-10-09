<script setup lang="ts">
import {
  FileText as FileTextIcon,
  FolderOpen as FolderOpenIcon,
  Gauge as GaugeIcon,
} from '@lucide/vue';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@moduix/vue/scroll-area';
import {
  Sidebar,
  SidebarContent,
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
import styles from '@/components/examples/sidebar/sidebar-custom-scroll-area.module.css';

const projects = [
  'Website',
  'Mobile app',
  'Design system',
  'Marketing',
  'Internal tools',
  'Customer portal',
  'Analytics',
  'Documentation',
  'Onboarding',
  'Research',
  'Experiments',
  'Archive',
];
</script>

<template>
  <Sidebar :class="styles.root">
    <SidebarPanel>
      <SidebarHeader>
        <strong data-sidebar-icon>M</strong>
        <SidebarLabel>Moduix</SidebarLabel>
      </SidebarHeader>
      <SidebarContent :class="styles.sidebarContent">
        <ScrollArea fade>
          <ScrollAreaViewport>
            <ScrollAreaContent>
              <SidebarGroup>
                <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                <SidebarNavigationList>
                  <SidebarNavigationItem>
                    <SidebarNavigationButton active
                      ><GaugeIcon /><SidebarLabel>Overview</SidebarLabel></SidebarNavigationButton
                    >
                  </SidebarNavigationItem>
                  <SidebarNavigationItem>
                    <SidebarNavigationButton
                      ><FolderOpenIcon /><SidebarLabel
                        >Projects</SidebarLabel
                      ></SidebarNavigationButton
                    >
                  </SidebarNavigationItem>
                </SidebarNavigationList>
              </SidebarGroup>
              <SidebarGroup>
                <SidebarGroupLabel>Recent projects</SidebarGroupLabel>
                <SidebarNavigationList>
                  <SidebarNavigationItem v-for="project in projects" :key="project">
                    <SidebarNavigationButton
                      ><FileTextIcon /><SidebarLabel>{{
                        project
                      }}</SidebarLabel></SidebarNavigationButton
                    >
                  </SidebarNavigationItem>
                </SidebarNavigationList>
              </SidebarGroup>
            </ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        </ScrollArea>
      </SidebarContent>
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset>
      <header :class="styles.header">Project dashboard</header>
      <main :class="styles.content">
        <strong>Recent activity</strong>
        <section :class="styles.card">
          <strong>18 active projects</strong>
          <p :class="styles.muted">
            Scroll the project list independently from the application content.
          </p>
        </section>
      </main>
    </SidebarInset>
  </Sidebar>
</template>