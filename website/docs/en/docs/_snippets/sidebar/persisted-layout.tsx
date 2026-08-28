import { Button } from '@moduix/react/button';
import { Sidebar } from '@moduix/react/sidebar';
import { FileText, Gauge } from 'lucide-react';
import { useEffect, useState, type ComponentProps } from 'react';

const storageKey = 'my-app-sidebar-size';
type SidebarSize = NonNullable<ComponentProps<typeof Sidebar>['size']>;

const defaultSize: SidebarSize = ['16rem'];

const readPersistedSize = (): SidebarSize | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return null;
  }

  const nextSize = stored.split('|').filter(Boolean);
  return nextSize.length > 0 ? nextSize : null;
};

export default function PersistedSidebar() {
  const [size, setSize] = useState<SidebarSize>(defaultSize);

  useEffect(() => {
    const persistedSize = readPersistedSize();
    if (persistedSize) {
      setSize(persistedSize);
    }
  }, []);

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKey);
    }

    setSize(defaultSize);
  };

  return (
    <Sidebar
      size={size}
      onResize={(details) => setSize(details.size)}
      onResizeEnd={(details) => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(storageKey, details.size.join('|'));
        }
      }}
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
            <Sidebar.NavigationList>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Overview">
                  <Sidebar.NavigationButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
              <Sidebar.NavigationItem>
                <Sidebar.Tooltip content="Documents">
                  <Sidebar.NavigationButton asChild>
                    <a href="/documents">
                      <FileText />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.NavigationButton>
                </Sidebar.Tooltip>
              </Sidebar.NavigationItem>
            </Sidebar.NavigationList>
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
            justifyContent: 'space-between',
            minHeight: '3.5rem',
            paddingInline: '1.5rem',
          }}
        >
          Dashboard
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset saved width
          </Button>
        </header>
        <main style={{ display: 'grid', gap: '1rem', padding: '1.5rem' }}>
          <strong>Saved layout</strong>
          <section
            style={{
              border: '1px solid var(--moduix-color-border)',
              borderRadius: 'var(--moduix-radius-md)',
              padding: '1rem',
            }}
          >
            Resize the sidebar and reload to restore the saved width.
          </section>
        </main>
      </Sidebar.Inset>
    </Sidebar>
  );
}