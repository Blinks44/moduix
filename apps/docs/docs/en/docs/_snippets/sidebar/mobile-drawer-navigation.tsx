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

export default function MobileDrawerSidebar() {
  return (
    <Drawer.Root swipeDirection="start">
      <Drawer.Trigger asChild>
        <Button variant="outline" style={{ marginBlockEnd: '1rem' }}>
          Open mobile navigation
        </Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content
          draggable={false}
          style={{ maxWidth: '20rem', width: 'min(20rem, calc(100vw - 2rem))' }}
        >
          <Drawer.Header style={{ paddingInline: '1rem' }}>
            <Drawer.Title>Navigation</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>
              Use Drawer for compact-screen overlay navigation.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body style={{ minHeight: 0, padding: 0, overflow: 'hidden' }}>
            <div
              style={{
                backgroundColor: 'var(--moduix-color-card)',
                display: 'flex',
                flex: '1 1 auto',
                flexDirection: 'column',
                minHeight: 0,
              }}
            >
              <Sidebar.Header>
                <div style={{ display: 'grid', gap: '0.75rem', width: '100%' }}>
                  <div
                    style={{
                      alignItems: 'center',
                      display: 'flex',
                      fontWeight: 600,
                      gap: '0.5rem',
                    }}
                  >
                    <strong
                      data-sidebar-icon
                      style={{
                        alignItems: 'center',
                        backgroundColor: 'var(--moduix-color-primary)',
                        borderRadius: 'var(--moduix-radius-sm)',
                        color: 'var(--moduix-color-primary-foreground)',
                        display: 'inline-flex',
                        height: '2rem',
                        justifyContent: 'center',
                        width: '2rem',
                      }}
                    >
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
                        <Collapsible defaultOpen>
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
              <Sidebar.Footer style={{ display: 'grid', width: '100%' }}>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
                      <Menu.Trigger asChild>
                        <Sidebar.MenuButton
                          size="lg"
                          aria-label="Open account menu"
                          style={{ height: 'auto' }}
                          title="Account"
                        >
                          <Avatar size="sm" data-sidebar-icon>
                            <Avatar.Fallback>AM</Avatar.Fallback>
                          </Avatar>
                          <Sidebar.Label style={{ display: 'grid', flex: 1, textAlign: 'start' }}>
                            <strong
                              style={{
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              Alex Morgan
                            </strong>
                            <span
                              style={{
                                color: 'var(--moduix-color-muted-foreground)',
                                fontSize: 'var(--moduix-text-xs)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              alex@acme.dev
                            </span>
                          </Sidebar.Label>
                          <Menu.Indicator>
                            <ChevronsUpDown />
                          </Menu.Indicator>
                        </Sidebar.MenuButton>
                      </Menu.Trigger>
                      <Menu.Positioner>
                        <Menu.Content style={{ maxWidth: '18rem', minWidth: '14rem' }}>
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