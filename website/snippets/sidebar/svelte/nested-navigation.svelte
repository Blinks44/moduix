<script lang="ts">
  import { FolderOpen as FolderOpenIcon } from '@lucide/svelte';
  import {
    Collapsible,
    CollapsibleContent,
    CollapsibleIndicator,
    CollapsibleTrigger,
  } from '@moduix/svelte/collapsible';
  import {
    Menu,
    MenuContent,
    MenuItem,
    MenuPositioner,
    MenuTrigger,
    MenuViewport,
  } from '@moduix/svelte/menu';
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
  } from '@moduix/svelte/sidebar';
  import styles from '@/components/examples/sidebar/sidebar-nested-navigation.module.css';
</script>

<Sidebar class={styles.root}>
  <SidebarPanel>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarExpandedContent>
              <Collapsible defaultOpen>
                <CollapsibleTrigger>
                  {#snippet asChild(triggerProps)}
                    <SidebarNavigationButton {...triggerProps()}>
                      <FolderOpenIcon /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator
                      />
                    </SidebarNavigationButton>
                  {/snippet}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarNavigationSubList>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="/projects/website">
                        <SidebarLabel>Website</SidebarLabel>
                      </SidebarNavigationSubButton>
                    </SidebarNavigationSubItem>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="/projects/mobile">
                        <SidebarLabel>Mobile app</SidebarLabel>
                      </SidebarNavigationSubButton>
                    </SidebarNavigationSubItem>
                  </SidebarNavigationSubList>
                </CollapsibleContent>
              </Collapsible>
            </SidebarExpandedContent>
            <SidebarCollapsedContent>
              <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                <MenuTrigger>
                  {#snippet asChild(triggerProps)}
                    <SidebarNavigationButton
                      {...triggerProps()}
                      aria-label="Open projects"
                      title="Projects"
                    >
                      <FolderOpenIcon />
                    </SidebarNavigationButton>
                  {/snippet}
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent>
                    <MenuViewport>
                      <MenuItem value="website">
                        {#snippet asChild(itemProps)}
                          <a {...itemProps()} href="/projects/website">Website</a>
                        {/snippet}
                      </MenuItem>
                      <MenuItem value="mobile-app">
                        {#snippet asChild(itemProps)}
                          <a {...itemProps()} href="/projects/mobile">Mobile app</a>
                        {/snippet}
                      </MenuItem>
                    </MenuViewport>
                  </MenuContent>
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
    <main class={styles.content}>
      <strong>Project overview</strong>
      <p class={styles.description}>Collapse the sidebar to open the same links in a popup menu.</p>
    </main>
  </SidebarInset>
</Sidebar>