import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import { Menu, MenuTrigger, MenuPositioner, MenuContent, MenuViewport, MenuItem } from '@moduix/react/menu';
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
} from '@moduix/react/sidebar';
import { FolderOpen } from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation.module.css';

export default function NestedNavigation() {
  return (
    <Sidebar className={styles.root}>
      <SidebarPanel>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarExpandedContent>
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger asChild>
                      <SidebarNavigationButton>
                        <FolderOpen />
                        <SidebarLabel>Projects</SidebarLabel>
                        <CollapsibleIndicator />
                      </SidebarNavigationButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarNavigationSubList>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="/projects/website">
                            Website
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="/projects/mobile">
                            Mobile app
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                      </SidebarNavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </SidebarExpandedContent>
                <SidebarCollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <MenuTrigger asChild>
                      <SidebarNavigationButton aria-label="Open projects" title="Projects">
                        <FolderOpen />
                      </SidebarNavigationButton>
                    </MenuTrigger>
                    <MenuPositioner>
                      <MenuContent>
                        <MenuViewport>
                          <MenuItem asChild value="website">
                            <a href="/projects/website">Website</a>
                          </MenuItem>
                          <MenuItem asChild value="mobile-app">
                            <a href="/projects/mobile">Mobile app</a>
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
        <main className={styles.content}>
          <strong>Project overview</strong>
          <p className={styles.description}>
            Collapse the sidebar to open the same links in a popup menu.
          </p>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}
