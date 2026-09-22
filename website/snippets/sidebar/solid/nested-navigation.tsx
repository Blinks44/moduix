import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/solid/collapsible';
import {
  Menu,
  MenuTrigger,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
} from '@moduix/solid/menu';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarContent,
  SidebarExpandedContent,
  SidebarCollapsedContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarNavigationButton,
  SidebarNavigationSubList,
  SidebarNavigationSubItem,
  SidebarNavigationSubButton,
} from '@moduix/solid/sidebar';
import { FolderOpen } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation.module.css';

export default function NestedNavigation() {
  return (
    <Sidebar class={styles.root}>
      <SidebarPanel>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarExpandedContent>
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger
                      asChild={(props) => <SidebarNavigationButton {...props()} />}
                    >
                      <FolderOpen />
                      <SidebarLabel>Projects</SidebarLabel>
                      <CollapsibleIndicator />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarNavigationSubList>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton
                            asChild={(props) => <a {...props()} href="/projects/website" />}
                          >
                            Website
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton
                            asChild={(props) => <a {...props()} href="/projects/mobile" />}
                          >
                            Mobile app
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                      </SidebarNavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarExpandedContent>
                <SidebarCollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <MenuTrigger
                      asChild={(props) => (
                        <SidebarNavigationButton
                          {...props()}
                          aria-label="Open projects"
                          title="Projects"
                        />
                      )}
                    >
                      <FolderOpen />
                    </MenuTrigger>
                    <MenuPositioner>
                      <MenuContent>
                        <MenuViewport>
                          <MenuItem
                            value="website"
                            asChild={(props) => <a {...props()} href="/projects/website" />}
                          >
                            Website
                          </MenuItem>
                          <MenuItem
                            value="mobile-app"
                            asChild={(props) => <a {...props()} href="/projects/mobile" />}
                          >
                            Mobile app
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
          <p class={styles.description}>
            Collapse the sidebar to open the same links in a popup menu.
          </p>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}