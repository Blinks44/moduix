<script setup lang="ts">
import { FileText as FileTextIcon, Gauge as GaugeIcon } from '@lucide/vue';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarHeader,
  SidebarTooltip,
  SidebarTrigger,
} from '@moduix/vue/sidebar';
import styles from '@/components/examples/sidebar/sidebar-basic.module.css';
</script>

<template>
  <Sidebar :class="styles.root">
    <SidebarPanel>
      <SidebarHeader>
        <strong data-sidebar-icon>M</strong>
        <SidebarLabel>Moduix</SidebarLabel>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarTooltip content="Overview">
                <SidebarNavigationButton active as-child>
                  <a href="/overview"><GaugeIcon /><SidebarLabel>Overview</SidebarLabel></a>
                </SidebarNavigationButton>
              </SidebarTooltip>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarTooltip content="Documents">
                <SidebarNavigationButton as-child>
                  <a href="/documents"><FileTextIcon /><SidebarLabel>Documents</SidebarLabel></a>
                </SidebarNavigationButton>
              </SidebarTooltip>
              <SidebarNavigationBadge>12</SidebarNavigationBadge>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset>
      <header :class="styles.header">Dashboard</header>
      <main :class="styles.content">
        <div>
          <strong>Workspace overview</strong>
          <p :class="styles.muted">
            Keep navigation, content, and resizing in one responsive shell.
          </p>
        </div>
        <section :class="styles.card">
          <strong>12 open tasks</strong>
          <p :class="styles.muted">Your team is on track for this week.</p>
        </section>
        <div :class="styles.stats">
          <section :class="styles.card">
            <strong>8</strong>
            <p :class="styles.muted">In review</p>
          </section>
          <section :class="styles.card">
            <strong>4</strong>
            <p :class="styles.muted">Due today</p>
          </section>
        </div>
      </main>
    </SidebarInset>
  </Sidebar>
</template>