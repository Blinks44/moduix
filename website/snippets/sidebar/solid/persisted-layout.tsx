import { Button } from '@moduix/solid/button';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarTooltip,
  SidebarNavigationButton,
} from '@moduix/solid/sidebar';
import { FileText, Gauge } from 'lucide-solid';
import { onMount, type ComponentProps, createSignal } from 'solid-js';
import styles from '@/components/examples/sidebar/sidebar-persisted-layout.module.css';

const storageKey = 'my-app-sidebar-size';
type SidebarSize = NonNullable<ComponentProps<typeof Sidebar>['size']>;
const defaultSize: SidebarSize = ['16rem'];

const readPersistedSize = (): SidebarSize | null => {
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return null;
  }

  const nextSize = stored.split('|').filter(Boolean);
  return nextSize.length > 0 ? nextSize : null;
};

export default function PersistedSidebar() {
  const [size, setSize] = createSignal<SidebarSize>(defaultSize);

  onMount(() => {
    const persistedSize = readPersistedSize();
    if (persistedSize) {
      setSize(persistedSize);
    }
  });

  const handleReset = () => {
    window.localStorage.removeItem(storageKey);
    setSize(defaultSize);
  };

  return (
    <Sidebar
      class={styles.root}
      size={size()}
      onResize={(details) => setSize(details.size)}
      onResizeEnd={(details) => window.localStorage.setItem(storageKey, details.size.join('|'))}
    >
      <SidebarPanel>
        <SidebarHeader>
          <strong data-sidebar-icon>M</strong>
          <SidebarLabel>Moduix</SidebarLabel>
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
                        <a {...buttonProps()} href="/overview">
                          <Gauge />
                          <SidebarLabel>Overview</SidebarLabel>
                        </a>
                      )}
                    />
                  )}
                </SidebarTooltip>
              </SidebarNavigationItem>
              <SidebarNavigationItem>
                <SidebarTooltip content="Documents">
                  {(props) => (
                    <SidebarNavigationButton
                      {...props()}
                      asChild={(buttonProps) => (
                        <a {...buttonProps()} href="/documents">
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
        </SidebarContent>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <header class={styles.header}>
          Dashboard
          <Button variant="outline" size="sm" onClick={handleReset}>
            Reset saved width
          </Button>
        </header>
        <main class={styles.content}>
          <strong>Saved layout</strong>
          <section class={styles.card}>
            Resize the sidebar and reload to restore the saved width.
          </section>
        </main>
      </SidebarInset>
    </Sidebar>
  );
}