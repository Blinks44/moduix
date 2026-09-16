import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Collapsible } from '@moduix/react/collapsible';
import { Menu } from '@moduix/react/menu';
import { Sidebar } from '@moduix/react/sidebar';
import { ChevronsUpDown, FileText, FolderOpen, Gauge, LogOut, Settings, Users } from 'lucide-react';
import styles from './sidebar-dashboard.module.css';

export function SidebarDashboard() {
  return (
    <Sidebar className={styles.root}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <a className={styles.brand} href="#overview">
            <span className={styles.brandMark} data-sidebar-icon>
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
                  <Sidebar.NavigationButton asChild active>
                    <a href="#overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.ExpandedContent>
                  <Collapsible defaultOpen>
                    <Sidebar.Tooltip content="Projects">
                      <Collapsible.Trigger asChild>
                        <Sidebar.NavigationButton>
                          <FolderOpen />
                          <Sidebar.Label>Projects</Sidebar.Label>
                          <Collapsible.Indicator />
                        </Sidebar.NavigationButton>
                      </Collapsible.Trigger>
                    </Sidebar.Tooltip>
                    <Collapsible.Content>
                      <Sidebar.NavigationSubList>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton href="#website">
                            Website
                          </Sidebar.NavigationSubButton>
                        </Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubItem>
                          <Sidebar.NavigationSubButton href="#mobile-app">
                            Mobile app
                          </Sidebar.NavigationSubButton>
                          <Sidebar.NavigationBadge>8</Sidebar.NavigationBadge>
                        </Sidebar.NavigationSubItem>
                      </Sidebar.NavigationSubList>
                    </Collapsible.Content>
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
                          <Menu.Item value="website" asChild>
                            <a href="#website">Website</a>
                          </Menu.Item>
                          <Menu.Item value="mobile-app" asChild>
                            <a href="#mobile-app">Mobile app</a>
                          </Menu.Item>
                        </Menu.Viewport>
                      </Menu.Content>
                    </Menu.Positioner>
                  </Menu>
                </Sidebar.CollapsedContent>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Documents">
                  <Sidebar.NavigationButton asChild>
                    <a href="#documents">
                      <FileText />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>

          <Sidebar.Group>
            <Sidebar.GroupLabel>Manage</Sidebar.GroupLabel>
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Team">
                  <Sidebar.NavigationButton asChild>
                    <a href="#team">
                      <Users />
                      <Sidebar.Label>Team</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Settings">
                  <Sidebar.NavigationButton asChild>
                    <a href="#settings">
                      <Settings />
                      <Sidebar.Label>Settings</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
          </Sidebar.Group>
        </Sidebar.Content>

        <Sidebar.Footer>
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <Menu.Trigger asChild>
                  <Sidebar.NavigationButton
                    size="lg"
                    aria-label="Open workspace menu"
                    title="Workspace"
                  >
                    <span className={styles.workspaceMark} data-sidebar-icon>
                      AC
                    </span>
                    <Sidebar.Label>Acme Inc.</Sidebar.Label>
                    <Menu.Indicator>
                      <ChevronsUpDown />
                    </Menu.Indicator>
                  </Sidebar.NavigationButton>
                </Menu.Trigger>
                <Menu.Positioner>
                  <Menu.Content className={styles.workspaceMenu}>
                    <Menu.Viewport>
                      <Menu.Item value="workspace-settings">
                        <Menu.ItemText>
                          <Menu.ItemTextContent>
                            <Menu.ItemTextIcon>
                              <Settings />
                            </Menu.ItemTextIcon>
                            <Menu.ItemTextLabel>Workspace settings</Menu.ItemTextLabel>
                          </Menu.ItemTextContent>
                        </Menu.ItemText>
                      </Menu.Item>
                      <Menu.Item value="manage-members">
                        <Menu.ItemText>
                          <Menu.ItemTextContent>
                            <Menu.ItemTextIcon>
                              <Users />
                            </Menu.ItemTextIcon>
                            <Menu.ItemTextLabel>Manage members</Menu.ItemTextLabel>
                          </Menu.ItemTextContent>
                        </Menu.ItemText>
                      </Menu.Item>
                      <Menu.Separator />
                      <Menu.Item value="sign-out" tone="destructive">
                        <Menu.ItemText>
                          <Menu.ItemTextContent>
                            <Menu.ItemTextIcon>
                              <LogOut />
                            </Menu.ItemTextIcon>
                            <Menu.ItemTextLabel>Sign out</Menu.ItemTextLabel>
                          </Menu.ItemTextContent>
                        </Menu.ItemText>
                      </Menu.Item>
                    </Menu.Viewport>
                  </Menu.Content>
                </Menu.Positioner>
              </Menu>
            </Sidebar.NavigationItem>
          </Sidebar.NavigationList>
        </Sidebar.Footer>
      </Sidebar.Panel>

      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />

      <Sidebar.Inset>
        <main className={styles.content} id="overview">
          <header className={styles.header}>
            <div>
              <p className={styles.eyebrow}>Workspace</p>
              <h1>Overview</h1>
              <p className={styles.description}>
                Everything your team is working on, in one place.
              </p>
            </div>
            <Button size="sm">New project</Button>
          </header>

          <section className={styles.metrics} id="projects" aria-label="Workspace summary">
            <Card size="sm">
              <Card.Body className={styles.metric}>
                <span>Active projects</span>
                <strong>12</strong>
              </Card.Body>
            </Card>
            <Card size="sm">
              <Card.Body className={styles.metric}>
                <span>Team members</span>
                <strong>8</strong>
              </Card.Body>
            </Card>
            <Card size="sm">
              <Card.Body className={styles.metric}>
                <span>Open tasks</span>
                <strong>24</strong>
              </Card.Body>
            </Card>
          </section>

          <Card className={styles.activity} size="sm">
            <Card.Body className={styles.activityBody}>
              <strong>Keep moving</strong>
              <span>Create a project to start sharing work with your team.</span>
            </Card.Body>
          </Card>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}