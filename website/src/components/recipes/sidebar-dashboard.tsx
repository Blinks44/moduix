import { Button } from '@moduix/react/button';
import { Card, CardBody } from '@moduix/react/card';
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleIndicator,
  CollapsibleContent,
} from '@moduix/react/collapsible';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuSeparator,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
} from '@moduix/react/menu';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarHeader,
  SidebarContent,
  SidebarExpandedContent,
  SidebarCollapsedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarTooltip,
  SidebarNavigationButton,
  SidebarNavigationBadge,
  SidebarNavigationSubList,
  SidebarNavigationSubItem,
  SidebarNavigationSubButton,
} from '@moduix/react/sidebar';
import { ChevronsUpDown, FileText, FolderOpen, Gauge, LogOut, Settings, Users } from 'lucide-react';
import styles from './sidebar-dashboard.module.css';

export function SidebarDashboard() {
  return (
    <Sidebar className={styles.root}>
      <SidebarPanel>
        <SidebarHeader>
          <a className={styles.brand} href="#overview">
            <span className={styles.brandMark} data-sidebar-icon>
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
                  <SidebarNavigationButton asChild active>
                    <a href="#overview">
                      <Gauge />
                      <SidebarLabel>Overview</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarExpandedContent>
                  <Collapsible defaultOpen>
                    <SidebarTooltip content="Projects">
                      <CollapsibleTrigger asChild>
                        <SidebarNavigationButton>
                          <FolderOpen />
                          <SidebarLabel>Projects</SidebarLabel>
                          <CollapsibleIndicator />
                        </SidebarNavigationButton>
                      </CollapsibleTrigger>
                    </SidebarTooltip>
                    <CollapsibleContent>
                      <SidebarNavigationSubList>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="#website">
                            Website
                          </SidebarNavigationSubButton>
                        </SidebarNavigationSubItem>
                        <SidebarNavigationSubItem>
                          <SidebarNavigationSubButton href="#mobile-app">
                            Mobile app
                          </SidebarNavigationSubButton>
                          <SidebarNavigationBadge>8</SidebarNavigationBadge>
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
                          <MenuItem value="website" asChild>
                            <a href="#website">Website</a>
                          </MenuItem>
                          <MenuItem value="mobile-app" asChild>
                            <a href="#mobile-app">Mobile app</a>
                          </MenuItem>
                        </MenuViewport>
                      </MenuContent>
                    </MenuPositioner>
                  </Menu>
                </SidebarCollapsedContent>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  <SidebarNavigationButton asChild>
                    <a href="#documents">
                      <FileText />
                      <SidebarLabel>Documents</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Manage</SidebarGroupLabel>
            <SidebarNavigationList>
              <SidebarNavigationItem>
                <SidebarTooltip content="Team">
                  <SidebarNavigationButton asChild>
                    <a href="#team">
                      <Users />
                      <SidebarLabel>Team</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Settings">
                  <SidebarNavigationButton asChild>
                    <a href="#settings">
                      <Settings />
                      <SidebarLabel>Settings</SidebarLabel>
                    </a>
                  </SidebarNavigationButton>
                </SidebarTooltip>
              </SidebarNavigationItem>
            </SidebarNavigationList>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                <MenuTrigger asChild>
                  <SidebarNavigationButton
                    size="lg"
                    aria-label="Open workspace menu"
                    title="Workspace"
                  >
                    <span className={styles.workspaceMark} data-sidebar-icon>
                      AC
                    </span>
                    <SidebarLabel>Acme Inc.</SidebarLabel>
                    <MenuIndicator>
                      <ChevronsUpDown />
                    </MenuIndicator>
                  </SidebarNavigationButton>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent className={styles.workspaceMenu}>
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
                      <MenuSeparator />
                      <MenuItem value="sign-out" tone="destructive">
                        <MenuItemText>
                          <MenuItemTextContent>
                            <MenuItemTextIcon>
                              <LogOut />
                            </MenuItemTextIcon>
                            <MenuItemTextLabel>Sign out</MenuItemTextLabel>
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
              <CardBody className={styles.metric}>
                <span>Active projects</span>
                <strong>12</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody className={styles.metric}>
                <span>Team members</span>
                <strong>8</strong>
              </CardBody>
            </Card>
            <Card size="sm">
              <CardBody className={styles.metric}>
                <span>Open tasks</span>
                <strong>24</strong>
              </CardBody>
            </Card>
          </section>

          <Card className={styles.activity} size="sm">
            <CardBody className={styles.activityBody}>
              <strong>Keep moving</strong>
              <span>Create a project to start sharing work with your team.</span>
            </CardBody>
          </Card>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}