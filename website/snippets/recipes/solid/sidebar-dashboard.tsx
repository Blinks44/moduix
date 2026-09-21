import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import { Collapsible } from '@moduix/solid/collapsible';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuItemText, MenuItemTextContent, MenuItemTextIcon, MenuItemTextLabel } from '@moduix/solid/menu';
import { Sidebar } from '@moduix/solid/sidebar';
import { ChevronsUpDown, FileText, FolderOpen, Gauge, Settings, Users } from 'lucide-solid';
import styles from './sidebar-dashboard.module.css';

export function SidebarDashboard() {
  return (
    <Sidebar class={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <a class={styles.brand} href="#overview">
            <span class={styles.brandMark} data-sidebar-icon>
              M
            </span>
            <Sidebar.Label>Moduix</Sidebar.Label>
          </a>
        </Sidebar.Header>

        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Overview">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      active
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#overview">
                          <Gauge />
                          <Sidebar.Label>Overview</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Collapsible defaultOpen>
                  <Sidebar.Tooltip content="Projects">
                    {(props) => (
                      <Collapsible.Trigger
                        {...props()}
                        asChild={(triggerProps) => <Sidebar.NavigationButton {...triggerProps()} />}
                      >
                        <FolderOpen />
                        <Sidebar.Label>Projects</Sidebar.Label>
                        <Collapsible.Indicator />
                      </Collapsible.Trigger>
                    )}
                  </Sidebar.Tooltip>
                  <Collapsible.Content>
                    <Sidebar.NavigationSubList>
                      <Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubButton
                          asChild={(props) => <a {...props()} href="#website" />}
                        >
                          Website
                        </Sidebar.NavigationSubButton>
                      </Sidebar.NavigationSubItem>
                      <Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubButton
                          asChild={(props) => <a {...props()} href="#mobile-app" />}
                        >
                          Mobile app
                        </Sidebar.NavigationSubButton>
                      </Sidebar.NavigationSubItem>
                    </Sidebar.NavigationSubList>
                  </Collapsible.Content>
                </Collapsible>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Documents">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#documents">
                          <FileText />
                          <Sidebar.Label>Documents</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>

          <Sidebar.Group>
            <Sidebar.GroupLabel>Manage</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Team">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#team">
                          <Users />
                          <Sidebar.Label>Team</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Settings">
                  {(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#settings">
                          <Settings />
                          <Sidebar.Label>Settings</Sidebar.Label>
                        </a>
                      )}
                    />
                  )}
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>

        <Sidebar.Footer>
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger
                  asChild={(props) => (
                    <Sidebar.NavigationButton
                      {...props()}
                      size="lg"
                      aria-label="Open workspace menu"
                      title="Workspace"
                    />
                  )}
                >
                  <span class={styles.workspaceMark} data-sidebar-icon>
                    AC
                  </span>
                  <Sidebar.Label>Acme Inc.</Sidebar.Label>
                  <MenuIndicator>
                    <ChevronsUpDown />
                  </MenuIndicator>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent class={styles.workspaceMenu}>
                    <MenuViewport>
                      <MenuItem value="workspace-settings">
                        <MenuItemText>
                          <MenuItemTextContent>
                            <MenuItemTextIcon>
                              <Settings />
                            </MenuItemTextIcon>
                            <MenuItemTextLabel>Workspace settings</MenuItemTextLabel>
                          </MenuItemTextContent>
                        </MenuItemText>
                      </MenuItem>
                      <MenuItem value="manage-members">
                        <MenuItemText>
                          <MenuItemTextContent>
                            <MenuItemTextIcon>
                              <Users />
                            </MenuItemTextIcon>
                            <MenuItemTextLabel>Manage members</MenuItemTextLabel>
                          </MenuItemTextContent>
                        </MenuItemText>
                      </MenuItem>
                    </MenuViewport>
                  </MenuContent>
                </MenuPositioner>
              </Menu>
            </Sidebar.NavigationItem>
          </Sidebar.NavigationList>
        </Sidebar.Footer>
      </Sidebar.Panel>

      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />

      <Sidebar.Inset>
        <main class={styles.content} id="overview">
          <header class={styles.header}>
            <div>
              <p class={styles.eyebrow}>Workspace</p>
              <h1>Overview</h1>
              <p class={styles.description}>Everything your team is working on, in one place.</p>
            </div>
            <Button size="sm">New project</Button>
          </header>

          <section class={styles.metrics} id="projects" aria-label="Workspace summary">
            <Card size="sm">
              <CardBody class={styles.metric}>
                <span>Active projects</span>
                <strong>12</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody class={styles.metric}>
                <span>Team members</span>
                <strong>8</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody class={styles.metric}>
                <span>Open tasks</span>
                <strong>24</strong>
              </CardBody>
            </Card>
          </section>

          <Card class={styles.activity} size="sm">
            <CardBody class={styles.activityBody}>
              <strong>Keep moving</strong>
              <span>Create a project to start sharing work with your team.</span>
            </CardBody>
          </Card>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
