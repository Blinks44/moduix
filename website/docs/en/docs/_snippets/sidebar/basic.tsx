import { Sidebar } from '@moduix/react/sidebar';
import { FileText, Gauge } from 'lucide-react';

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
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
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
          </Sidebar.Group>
        </Sidebar.Content>
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
          <div>
            <strong>Workspace overview</strong>
            <p style={{ color: 'var(--moduix-color-muted-foreground)', marginBlock: '0.25rem 0' }}>
              Keep navigation, content, and resizing in one responsive shell.
            </p>
          </div>
          <section
            style={{
              border: '1px solid var(--moduix-color-border)',
              borderRadius: 'var(--moduix-radius-md)',
              padding: '1rem',
            }}
          >
            <strong>12 open tasks</strong>
            <p style={{ color: 'var(--moduix-color-muted-foreground)', marginBlock: '0.25rem 0' }}>
              Your team is on track for this week.
            </p>
          </section>
          <div
            style={{
              display: 'grid',
              gap: '1rem',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
            }}
          >
            <section
              style={{
                border: '1px solid var(--moduix-color-border)',
                borderRadius: 'var(--moduix-radius-md)',
                padding: '1rem',
              }}
            >
              <strong>8</strong>
              <p
                style={{ color: 'var(--moduix-color-muted-foreground)', marginBlock: '0.25rem 0' }}
              >
                In review
              </p>
            </section>
            <section
              style={{
                border: '1px solid var(--moduix-color-border)',
                borderRadius: 'var(--moduix-radius-md)',
                padding: '1rem',
              }}
            >
              <strong>4</strong>
              <p
                style={{ color: 'var(--moduix-color-muted-foreground)', marginBlock: '0.25rem 0' }}
              >
                Due today
              </p>
            </section>
          </div>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}