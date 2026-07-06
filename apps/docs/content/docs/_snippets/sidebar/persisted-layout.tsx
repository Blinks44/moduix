/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Sidebar } from '@moduix/react';
import { FileText, Gauge } from 'lucide-react';
import { useEffect, useState } from 'react';

const storageKey = 'my-app-sidebar-size';
const defaultSize = ['16rem'];

const readPersistedSize = () => {
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

export function PersistedSidebar() {
  const [size, setSize] = useState(defaultSize);

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
      className="app-sidebar"
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
        <header className="app-topbar">
          Dashboard
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset saved width
          </Button>
        </header>
        <main className="app-main">Resize the sidebar and reload to restore the saved width.</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}

//#endregion