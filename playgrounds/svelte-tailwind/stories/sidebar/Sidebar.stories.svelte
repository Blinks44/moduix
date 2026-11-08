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
  import { classes } from './classes';
  import PersistedSidebarLayout from './PersistedSidebarLayout.svelte';
  import ScrollAreaNavigation from './ScrollAreaNavigation.svelte';
  import SidebarMain from './SidebarMain.svelte';
  import SidebarNavigation from './SidebarNavigation.svelte';

  const { Story } = defineMeta({
    title: 'Components/Sidebar',
    component: Sidebar,
    parameters: { layout: 'centered' },
  });
</script>

<Story name="Basic" asChild>
  <Sidebar class={classes.demo}>
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="Right Side" exportName="RightSide" asChild>
  <Sidebar side="right" class={classes.demo}>
    <SidebarInset><SidebarMain /></SidebarInset>
    <SidebarTrigger />
    <SidebarResizeTrigger />
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
  </Sidebar>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <Sidebar class={classes.demo}>
    <SidebarPanel class={classes.customPanel}>
      <SidebarNavigation accentClass={classes.customAccent} />
    </SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="Custom Sizes" exportName="CustomSizes" asChild>
  <Sidebar defaultSize={['14rem']} class={classes.demo}>
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="Custom Panel Id" exportName="CustomPanelId" asChild>
  <Sidebar panelId="navigation" class={classes.demo}>
    <SidebarPanel><SidebarNavigation /></SidebarPanel>
    <SidebarResizeTrigger />
    <SidebarTrigger />
    <SidebarInset><SidebarMain /></SidebarInset>
  </Sidebar>
</Story>

<Story name="With Scroll Area" exportName="WithScrollArea" asChild>
  <Sidebar class={classes.demo}>
    <SidebarPanel>
      <SidebarHeader>
        <div class={classes.brand}>
          <span class={classes.brandMark} data-sidebar-icon>M</span>
          <SidebarLabel>moduix</SidebarLabel>
        </div>
      </SidebarHeader>
      <SidebarContent class={classes.scrollAreaContent}>
        <ScrollArea fade class={classes.sidebarScrollArea}>
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