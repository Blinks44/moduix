import { Button } from '@moduix/solid/button';
import { Card, CardBody } from '@moduix/solid/card';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleIndicator,
  CollapsibleContent,
} from '@moduix/solid/collapsible';
import { Menu, MenuTrigger, MenuIndicator, MenuPositioner, MenuContent, MenuViewport, MenuItem, MenuItemText, MenuItemTextContent, MenuItemTextIcon, MenuItemTextLabel } from '@moduix/solid/menu';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarTooltip,
  SidebarNavigationButton,
  SidebarNavigationSubList,
  SidebarNavigationSubItem,
  SidebarNavigationSubButton,
} from '@moduix/solid/sidebar';
import { ChevronsUpDown, FileText, FolderOpen, Gauge, Settings, Users } from 'lucide-solid';
import styles from './sidebar-dashboard.module.css';

export function SidebarDashboard() {
  return (
    <Sidebar class={styles.root}>
      <SidebarPanel>
        <SidebarHeader>
          <a class={styles.brand} href="#overview">
            <span class={styles.brandMark} data-sidebar-icon>
              M
            </span>
            <SidebarLabel>Moduix</SidebarLabel>
          </a>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarTooltip content="Overview">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      active
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#overview">
                          <Gauge />
                          <SidebarLabel>Overview</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <Collapsible defaultOpen>
                  <SidebarTooltip content="Projects">
                    {(props) => (
                      <CollapsibleTrigger
                        {...props()}
                        asChild={(triggerProps) => <SidebarNavigationButton {...triggerProps()} />}
                      >
                        <FolderOpen />
                        <SidebarLabel>Projects</SidebarLabel>
                        <CollapsibleIndicator />
                      </CollapsibleTrigger>
                    )}
                  </SidebarTooltip>
                  <CollapsibleContent>
                    <SidebarNavigationSubList>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton
                          asChild={(props) => <a {...props()} href="#website" />}
                        >
                          Website
                        </SidebarNavigationSubButton>
                      </SidebarNavigationSubItem>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton
                          asChild={(props) => <a {...props()} href="#mobile-app" />}
                        >
                          Mobile app
                        </SidebarNavigationSubButton>
                      </SidebarNavigationSubItem>
                    </SidebarNavigationSubList>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#documents">
                          <FileText />
                          <SidebarLabel>Documents</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarTooltip content="Team">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#team">
                          <Users />
                          <SidebarLabel>Team</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Settings">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="#settings">
                          <Settings />
                          <SidebarLabel>Settings</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger
                  asChild={(props) => (
                    <SidebarNavigationButton
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
                  <SidebarLabel>Acme Inc.</SidebarLabel>
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
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarFooter>
      </SidebarPanel>

      <SidebarResizeTrigger />
      <SidebarTrigger />

      <SidebarInset>
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
      </SidebarInset>
    </Sidebar>
  );
}
