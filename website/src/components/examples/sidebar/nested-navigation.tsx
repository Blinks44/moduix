import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@moduix/react/collapsible';
import { Menu } from '@moduix/react/menu';
import { Sidebar } from '@moduix/react/sidebar';
import { FolderOpen } from 'lucide-react';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation.module.css';

export default function NestedNavigation() {
  return (
    <Sidebar className={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.ExpandedContent>
                  <Collapsible defaultOpen>
                    <CollapsibleTrigger asChild>
                      <Sidebar.NavigationButton>
                        <FolderOpen />
                        <Sidebar.Label>Projects</Sidebar.Label>
                        <CollapsibleIndicator />
                      </Sidebar.NavigationButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <Sidebar.NavigationSubList>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton href="/projects/website">
                            Website
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton href="/projects/mobile">
                            Mobile app
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                      </Sidebar.NavigationSubList>
                    </CollapsibleContent>
                  </Collapsible>
                </Sidebar.ExpandedContent>
                <Sidebar.CollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <Menu.Trigger asChild>
                      <Sidebar.NavigationButton aria-label="Open projects" title="Projects">
                        <FolderOpen />
                      </Sidebar.NavigationButton>
                    </Menu.Trigger>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Viewport>
                          <Menu.Item asChild value="website">
                            <a href="/projects/website">Website</a>
                          </Menu.Item>
                          <Menu.Item asChild value="mobile-app">
                            <a href="/projects/mobile">Mobile app</a>
                          </Menu.Item>
                        </Menu.Viewport>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Menu>
                </Sidebar.CollapsedContent>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <main className={styles.content}>
          <strong>Project overview</strong>
          <p className={styles.description}>
            Collapse the sidebar to open the same links in a popup menu.
          </p>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}