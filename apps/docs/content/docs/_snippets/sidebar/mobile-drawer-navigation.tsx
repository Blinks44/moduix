/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Avatar, Button, Collapsible, Drawer, Menu, Sidebar } from '@moduix/react';
import {
  CalendarDays,
  ChevronsUpDown,
  FileText,
  FolderOpen,
  Gauge,
  LogOut,
  Pencil,
  Plus,
  RotateCcw,
  Users,
} from 'lucide-react';

export function MobileDrawerSidebar() {
  return (
    <Drawer.Root swipeDirection="start">
      <Drawer.Trigger asChild>
        <Button variant="outline" className="mobile-trigger">
          Open mobile navigation
        </Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content className="mobile-drawer" draggable={false}>
          <Drawer.Header className="mobile-drawer-header">
            <Drawer.Title>Navigation</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>
              Use Drawer for compact-screen overlay navigation.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className="mobile-drawer-body">
            <div className="mobile-sidebar-surface">
              <Sidebar.Header>
                <div className="app-header-stack">
                  <div className="app-brand">
                    <strong className="app-brand-mark" data-sidebar-icon>
                      M
                    </strong>
                    <Sidebar.Label>Moduix</Sidebar.Label>
                  </div>
                  <Sidebar.Input aria-label="Search workspace" placeholder="Search" size="sm" />
                </div>
              </Sidebar.Header>
              <Sidebar.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
                  <Sidebar.GroupAction aria-label="Create workspace item">
                    <Plus />
                  </Sidebar.GroupAction>
                  <Sidebar.GroupContent>
                    <Sidebar.Menu>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton active>
                          <Gauge />
                          <Sidebar.Label>Overview</Sidebar.Label>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Collapsible defaultOpen className="app-collapsible">
                          <Collapsible.Trigger asChild>
                            <Sidebar.MenuButton>
                              <FolderOpen />
                              <Sidebar.Label>Projects</Sidebar.Label>
                              <Collapsible.Indicator />
                            </Sidebar.MenuButton>
                          </Collapsible.Trigger>
                          <Sidebar.MenuAction aria-label="Rename project group">
                            <Pencil />
                          </Sidebar.MenuAction>
                          <Collapsible.Content>
                            <Sidebar.MenuSub>
                              <Sidebar.MenuSubItem>
                                <Sidebar.MenuSubButton href="#website">
                                  Website
                                </Sidebar.MenuSubButton>
                              </Sidebar.MenuSubItem>
                              <Sidebar.MenuSubItem>
                                <Sidebar.MenuSubButton href="#mobile">
                                  Mobile app
                                </Sidebar.MenuSubButton>
                              </Sidebar.MenuSubItem>
                            </Sidebar.MenuSub>
                          </Collapsible.Content>
                        </Collapsible>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <CalendarDays />
                          <Sidebar.Label>Calendar</Sidebar.Label>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                      <Sidebar.MenuItem>
                        <Sidebar.MenuButton>
                          <Users />
                          <Sidebar.Label>Team</Sidebar.Label>
                        </Sidebar.MenuButton>
                        <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
                      </Sidebar.MenuItem>
                    </Sidebar.Menu>
                  </Sidebar.GroupContent>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Library</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <FileText />
                        <Sidebar.Label>Documents</Sidebar.Label>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.Group>
              </Sidebar.Content>
              <Sidebar.Footer className="app-footer-stack">
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                      <Menu.Trigger asChild>
                        <Sidebar.MenuButton
                          size="lg"
                          aria-label="Open account menu"
                          title="Account"
                          className="app-account-button"
                        >
                          <Avatar size="sm" data-sidebar-icon>
                            <Avatar.Fallback>AM</Avatar.Fallback>
                          </Avatar>
                          <Sidebar.Label className="app-account-meta">
                            <strong>Alex Morgan</strong>
                            <span>alex@acme.dev</span>
                          </Sidebar.Label>
                          <Menu.Indicator>
                            <ChevronsUpDown />
                          </Menu.Indicator>
                        </Sidebar.MenuButton>
                      </Menu.Trigger>
                      <Menu.Positioner>
                        <Menu.Content className="app-account-menu">
                          <Menu.Item value="profile">
                            <Menu.ItemText>
                              <Menu.ItemTextContent>
                                <Menu.ItemTextIcon>
                                  <Pencil />
                                </Menu.ItemTextIcon>
                                <Menu.ItemTextLabel>Profile</Menu.ItemTextLabel>
                              </Menu.ItemTextContent>
                            </Menu.ItemText>
                          </Menu.Item>
                          <Menu.Item value="settings">
                            <Menu.ItemText>
                              <Menu.ItemTextContent>
                                <Menu.ItemTextIcon>
                                  <RotateCcw />
                                </Menu.ItemTextIcon>
                                <Menu.ItemTextLabel>Settings</Menu.ItemTextLabel>
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
                        </Menu.Content>
                      </Menu.Positioner>
                    </Menu>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Footer>
            </div>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}

//#endregion