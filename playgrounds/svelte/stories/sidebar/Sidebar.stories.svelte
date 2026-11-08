<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
  } from '@/components/scroll-area';
  import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarInset,
    SidebarLabel,
    SidebarNavigationItem,
    SidebarNavigationList,
    SidebarPanel,
    SidebarResizeTrigger,
    SidebarTrigger,
  } from '@/components/sidebar';
  import AccountMenu from './AccountMenu.svelte';
  import PersistedSidebarLayout from './PersistedSidebarLayout.svelte';
  import ScrollAreaNavigation from './ScrollAreaNavigation.svelte';
  import styles from './Sidebar.stories.module.css';
  import SidebarMain from './SidebarMain.svelte';
  import SidebarNavigation from './SidebarNavigation.svelte';

  const { Story } = defineMeta({
    title: 'Components/Sidebar',
    component: Sidebar,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Sidebar class={styles.demo}>
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="Right Side" exportName="RightSide" asChild>
  <Sidebar side="right" class={styles.demo}>
    <SidebarInset><SidebarMain /></SidebarInset>
    <SidebarTrigger />
    <SidebarResizeTrigger />
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
  </Sidebar>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <Sidebar class={[styles.demo, styles.custom]}>
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="Custom Sizes" exportName="CustomSizes" asChild>
  <Sidebar defaultSize={['14rem']} class={styles.demo}>
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="Custom Panel Id" exportName="CustomPanelId" asChild>
  <Sidebar panelId="navigation" class={styles.demo}>
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="With Scroll Area" exportName="WithScrollArea" asChild>
  <Sidebar class={styles.demo}>
    <SidebarPanel>
      <SidebarHeader>
        <div class={styles.brand}>
          <span class={styles.brandMark} data-sidebar-icon>M</span>
          <SidebarLabel>moduix</SidebarLabel>
        </div>
      </SidebarHeader>
      <SidebarContent class={styles.scrollAreaContent}>
        <ScrollArea fade class={styles.sidebarScrollArea}>
          <ScrollAreaViewport>
            <ScrollAreaContent><ScrollAreaNavigation /></ScrollAreaContent>
          </ScrollAreaViewport>
          <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <SidebarNavigationList>
          <SidebarNavigationItem><AccountMenu /></SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarFooter>
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="Persisted Width Recipe" exportName="PersistedWidthRecipe" asChild>
  <PersistedSidebarLayout />
</Story>