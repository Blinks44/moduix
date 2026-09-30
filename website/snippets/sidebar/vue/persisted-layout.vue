<script setup lang="ts">
import { FileText as FileTextIcon, Gauge as GaugeIcon } from '@lucide/vue';
import { Button } from '@moduix/vue/button';
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
  SidebarTooltip,
  SidebarTrigger,
  type SidebarProps,
} from '@moduix/vue/sidebar';
import { onMounted, ref } from 'vue';
import styles from '@/components/examples/sidebar/sidebar-persisted-layout.module.css';

const storageKey = 'my-app-sidebar-size';
type SidebarSize = NonNullable<SidebarProps['size']>;
const defaultSize: SidebarSize = ['16rem'];
const size = ref<SidebarSize>(defaultSize);

const readPersistedSize = (): SidebarSize | null => {
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) return null;

  const nextSize = stored.split('|').filter(Boolean);
  return nextSize.length > 0 ? nextSize : null;
};

onMounted(() => {
  const persistedSize = readPersistedSize();
  if (persistedSize) size.value = persistedSize;
});

const handleResize = (details: { size: SidebarSize }) => {
  size.value = details.size;
};

const handleResizeEnd = (details: { size: SidebarSize }) => {
  window.localStorage.setItem(storageKey, details.size.join('|'));
};

const handleReset = () => {
  window.localStorage.removeItem(storageKey);
  size.value = [...defaultSize];
};
</script>

<template>
  <Sidebar :class="styles.root" :size="size" @resize="handleResize" @resize-end="handleResizeEnd">
    <SidebarPanel>
      <SidebarHeader
        ><strong data-sidebar-icon>M</strong><SidebarLabel>Moduix</SidebarLabel></SidebarHeader
      >
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
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset>
      <header :class="styles.header">
        Dashboard
        <Button variant="outline" size="sm" @click="handleReset">Reset saved width</Button>
      </header>
      <main :class="styles.content">
        <strong>Saved layout</strong>
        <section :class="styles.card">
          Resize the sidebar and reload to restore the saved width.
        </section>
      </main>
    </SidebarInset>
  </Sidebar>
</template>