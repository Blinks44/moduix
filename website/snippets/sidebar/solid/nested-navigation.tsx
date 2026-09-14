import { Collapsible } from '@moduix/solid/collapsible';
import { Menu } from '@moduix/solid/menu';
import { Sidebar } from '@moduix/solid/sidebar';
import { FolderOpen } from 'lucide-solid';
import styles from '@/components/examples/sidebar/sidebar-nested-navigation.module.css';

export default function NestedNavigation() {
  return (
    <Sidebar class={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.ExpandedContent>
                  <Collapsible defaultOpen>
                    <Collapsible.Trigger
                      asChild={(props) => <Sidebar.NavigationButton {...props()} />}
                    >
                      <FolderOpen />
                      <Sidebar.Label>Projects</Sidebar.Label>
                      <Collapsible.Indicator />
                    </Collapsible.Trigger>
                    <Collapsible.Content>
                      <Sidebar.NavigationSubList>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton
                            asChild={(props) => <a {...props()} href="/projects/website" />}
                          >
                            Website
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton
                            asChild={(props) => <a {...props()} href="/projects/mobile" />}
                          >
                            Mobile app
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                      </Sidebar.NavigationSubList>
                    </Collapsible.Content>
                  </Collapsible>
                </Sidebar.ExpandedContent>
                <Sidebar.CollapsedContent>
                  <Menu positioning={{ placement: 'right-start', gutter: 8 }}>
                    <Menu.Trigger
                      asChild={(props) => (
                        <Sidebar.NavigationButton
                          {...props()}
                          aria-label="Open projects"
                          title="Projects"
                        />
                      )}
                    >
                      <FolderOpen />
                    </Menu.Trigger>
                    <Menu.Positioner>
                      <Menu.Content>
                        <Menu.Viewport>
                          <Menu.Item
                            value="website"
                            asChild={(props) => <a {...props()} href="/projects/website" />}
                          >
                            Website
                          </Menu.Item>
                          <Menu.Item
                            value="mobile-app"
                            asChild={(props) => <a {...props()} href="/projects/mobile" />}
                          >
                            Mobile app
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
        <main class={styles.content}>
          <strong>Project overview</strong>
          <p class={styles.description}>
            Collapse the sidebar to open the same links in a popup menu.
          </p>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}