import { Button } from '@moduix/react/button';
import { Collapsible } from '@moduix/react/collapsible';
import { Drawer } from '@moduix/react/drawer';
import { Input } from '@moduix/react/input';
import { Sidebar } from '@moduix/react/sidebar';
import { CalendarDays, FileText, FolderOpen, Gauge, LogOut, Users } from 'lucide-react';

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
          <Drawer.Body
            style={{
              display: 'flex',
              flex: '1 1 auto',
              flexDirection: 'column',
              gap: '0.75rem',
              marginBlockStart: 0,
              minHeight: 0,
              overflow: 'hidden',
              padding: 0,
            }}
          >
            <Input.Root
              aria-label="Search workspace"
              placeholder="Search"
              size="sm"
              style={{ flex: 'none', marginInline: '1rem', marginBlockStart: '0.75rem' }}
            />
            <nav aria-label="Primary" style={{ flex: '1 1 auto', minHeight: 0, overflow: 'auto' }}>
              <Sidebar.Group>
                <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton asChild active>
                      <a href="#overview">
                        <Gauge />
                        <Sidebar.Label>Overview</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
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
                      <Collapsible.Content>
                        <Sidebar.MenuSub>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton href="#website">Website</Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                          <Sidebar.MenuSubItem>
                            <Sidebar.MenuSubButton href="#mobile">Mobile app</Sidebar.MenuSubButton>
                          </Sidebar.MenuSubItem>
                        </Sidebar.MenuSub>
                      </Collapsible.Content>
                    </Collapsible>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton asChild>
                      <a href="#calendar">
                        <CalendarDays />
                        <Sidebar.Label>Calendar</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Group>
              <Sidebar.Group>
                <Sidebar.GroupLabel>Library</Sidebar.GroupLabel>
                <Sidebar.Menu>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton asChild>
                      <a href="#documents">
                        <FileText />
                        <Sidebar.Label>Documents</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                  <Sidebar.MenuItem>
                    <Sidebar.MenuButton asChild>
                      <a href="#team">
                        <Users />
                        <Sidebar.Label>Team</Sidebar.Label>
                      </a>
                    </Sidebar.MenuButton>
                  </Sidebar.MenuItem>
                </Sidebar.Menu>
              </Sidebar.Group>
            </nav>
          </Drawer.Body>
          <Drawer.Footer
            style={{
              borderBlockStart: '1px solid var(--moduix-color-border)',
              justifyContent: 'space-between',
              marginBlockStart: 0,
              padding: '0.75rem 1rem 0',
            }}
          >
            <span>Acme Inc.</span>
            <Button variant="ghost" size="sm">
              <LogOut />
              Sign out
            </Button>
          </Drawer.Footer>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  );
}