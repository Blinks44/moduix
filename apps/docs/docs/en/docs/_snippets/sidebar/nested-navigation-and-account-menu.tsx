import { Avatar, Collapsible, Menu, Sidebar } from '@moduix/react';
import {
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

export default function AppSidebar() {
  return (
    <Sidebar
      style={{
        borderRadius: 'var(--moduix-radius-lg)',
        boxShadow: 'var(--moduix-shadow-sm)',
        height: '34rem',
        minHeight: '28rem',
      }}
    >
      <Sidebar.Panel>
        <Sidebar.Header>
          <div style={{ display: 'grid', gap: '0.75rem', width: '100%' }}>
            <div style={{ alignItems: 'center', display: 'flex', fontWeight: 600, gap: '0.5rem' }}>
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
                  <Sidebar.Tooltip content="Overview">
                    <Sidebar.MenuButton asChild active>
                      <a href="/overview">
                        <Gauge />
                        <Sidebar.Label>Overview</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.Tooltip>
                  <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Collapsible defaultOpen>
                    <Sidebar.Tooltip content="Projects">
                      <Collapsible.Trigger asChild>
                        <Sidebar.MenuButton>
                          <FolderOpen />
                          <Sidebar.Label>Projects</Sidebar.Label>
                          <Collapsible.Indicator />
                        </Sidebar.MenuButton>
                      </Collapsible.Trigger>
                    </Sidebar.Tooltip>
                    <Sidebar.MenuAction aria-label="Rename project group">
                      <Pencil />
                    </Sidebar.MenuAction>
                    <Collapsible.Content>
                      <Sidebar.MenuSub>
                        <Sidebar.MenuSubItem>
                          <Sidebar.MenuSubButton href="/projects/website">
                            Website
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                        <Sidebar.MenuSubItem>
                          <Sidebar.MenuSubButton href="/projects/mobile">
                            Mobile app
                          </Sidebar.MenuSubButton>
                        </Sidebar.MenuSubItem>
                      </Sidebar.MenuSub>
                    </Collapsible.Content>
                  </Collapsible>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.Tooltip content="Team">
                    <Sidebar.MenuButton asChild>
                      <a href="/team">
                        <Users />
                        <Sidebar.Label>Team</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.Tooltip>
                  <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
                </Sidebar.MenuItem>
                <Sidebar.MenuItem>
                  <Sidebar.Tooltip content="Documents">
                    <Sidebar.MenuButton asChild>
                      <a href="/documents">
                        <FileText />
                        <Sidebar.Label>Documents</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.Tooltip>
                </Sidebar.MenuItem>
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer style={{ display: 'grid', width: '100%' }}>
          <Sidebar.Separator />
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
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header
          style={{
            alignItems: 'center',
            borderBlockEnd: '1px solid var(--moduix-color-border)',
            display: 'flex',
            minHeight: '3.5rem',
            paddingInline: '1.5rem',
          }}
        >
          Dashboard
        </header>
        <main style={{ display: 'grid', gap: '1rem', padding: '1.5rem' }}>
          <strong>Project overview</strong>
          <section
            style={{
              border: '1px solid var(--moduix-color-border)',
              borderRadius: 'var(--moduix-radius-md)',
              padding: '1rem',
            }}
          >
            Your team has 3 updates ready to review.
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}