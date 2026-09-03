import { createListCollection } from '@ark-ui/react/collection';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState, type ComponentProps } from 'react';
import { Avatar } from '@/components/avatar';
import { Button } from '@/components/button';
import { Collapsible } from '@/components/collapsible';
import { Menu } from '@/components/menu';
import { ScrollArea } from '@/components/scroll-area';
import { Select } from '@/components/select';
import { Sidebar, useSidebar } from '@/components/sidebar/Sidebar';
import {
  ChevronUpDownIcon,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  PencilIcon,
  PlusIcon,
  RestartIcon,
  TrashIcon,
} from '@/lib/moduix/icons/ui';
import styles from './Sidebar.stories.module.css';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

const workspaces = createListCollection({
  items: [
    { label: 'Acme Inc.', value: 'acme' },
    { label: 'Northstar', value: 'northstar' },
    { label: 'Personal', value: 'personal' },
  ],
});

type SidebarSize = NonNullable<ComponentProps<typeof Sidebar.Root>['size']>;

const persistedSidebarStorageKey = 'moduix-storybook-sidebar-size';

const createDefaultPersistedSidebarSize = (): SidebarSize => ['16rem'];

const readPersistedSidebarSize = (): SidebarSize | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  const stored = window.localStorage.getItem(persistedSidebarStorageKey);
  if (!stored) {
    return null;
  }

  const nextSize = stored.split('|').filter(Boolean);
  return nextSize.length > 0 ? nextSize : null;
};

function WorkspaceSelect() {
  return (
    <Select
      collection={workspaces}
      defaultValue={['acme']}
      positioning={{ placement: 'right-start', gutter: 8, flip: false }}
    >
      <Select.Trigger asChild>
        <Sidebar.NavigationButton size="lg" aria-label="Select workspace" title="Workspace">
          <span className={styles.workspaceMark} data-sidebar-icon>
            AC
          </span>
          <Sidebar.Label className={styles.workspaceLabel}>
            <Select.ValueText placeholder="Select workspace" />
          </Sidebar.Label>
          <Select.Indicator />
        </Sidebar.NavigationButton>
      </Select.Trigger>
      <Select.Positioner>
        <Select.Content>
          {workspaces.items.map((workspace) => (
            <Select.Item key={workspace.value} item={workspace}>
              <Select.ItemText>{workspace.label}</Select.ItemText>
              <Select.ItemIndicator />
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Positioner>
    </Select>
  );
}

function AccountMenu() {
  return (
    <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
      <Menu.Trigger asChild>
        <Sidebar.NavigationButton
          size="lg"
          aria-label="Open account menu"
          title="Account"
          className={styles.accountButton}
        >
          <Avatar size="sm" data-sidebar-icon>
            <Avatar.Fallback>AM</Avatar.Fallback>
          </Avatar>
          <Sidebar.Label className={styles.accountMeta}>
            <strong>Alex Morgan</strong>
            <span>alex@acme.dev</span>
          </Sidebar.Label>
          <Menu.Indicator>
            <ChevronUpDownIcon />
          </Menu.Indicator>
        </Sidebar.NavigationButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.accountMenu}>
          <Menu.ItemGroup>
            <Menu.ItemGroupLabel>Acme Inc.</Menu.ItemGroupLabel>
            <Menu.Item value="profile">
              <Menu.ItemText>
                <Menu.ItemTextContent>
                  <Menu.ItemTextIcon>
                    <PencilIcon />
                  </Menu.ItemTextIcon>
                  <Menu.ItemTextLabel>Profile</Menu.ItemTextLabel>
                </Menu.ItemTextContent>
              </Menu.ItemText>
            </Menu.Item>
            <Menu.Item value="settings">
              <Menu.ItemText>
                <Menu.ItemTextContent>
                  <Menu.ItemTextIcon>
                    <RestartIcon />
                  </Menu.ItemTextIcon>
                  <Menu.ItemTextLabel>Settings</Menu.ItemTextLabel>
                </Menu.ItemTextContent>
              </Menu.ItemText>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.Separator />
          <Menu.Item value="sign-out" tone="destructive">
            <Menu.ItemText>
              <Menu.ItemTextContent>
                <Menu.ItemTextIcon>
                  <TrashIcon />
                </Menu.ItemTextIcon>
                <Menu.ItemTextLabel>Sign out</Menu.ItemTextLabel>
              </Menu.ItemTextContent>
            </Menu.ItemText>
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

function SidebarNavigation() {
  const { collapsed } = useSidebar();

  return (
    <>
      <Sidebar.Header>
        <div className={styles.headerStack} style={{ width: collapsed ? 'auto' : undefined }}>
          <div className={styles.brand}>
            <span className={styles.brandMark} data-sidebar-icon>
              M
            </span>
            <Sidebar.Label>Moduix</Sidebar.Label>
          </div>
          <Sidebar.Input aria-label="Search workspace" placeholder="Search" size="sm" />
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
          <Sidebar.GroupAction aria-label="Create workspace item" title="Create workspace item">
            <PlusIcon />
          </Sidebar.GroupAction>
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <Sidebar.Tooltip content="Overview">
                <Sidebar.NavigationButton asChild active>
                  <a href="#overview">
                    <FolderIcon />
                    <Sidebar.Label>Overview</Sidebar.Label>
                  </a>
                </Sidebar.NavigationButton>
              </Sidebar.Tooltip>
              <Sidebar.NavigationBadge>3</Sidebar.NavigationBadge>
            </Sidebar.NavigationItem>
            <Sidebar.NavigationItem>
              <Sidebar.ExpandedContent>
                <Collapsible defaultOpen className={styles.collapsible}>
                  <Sidebar.Tooltip content="Projects">
                    <Collapsible.Trigger asChild>
                      <Sidebar.NavigationButton>
                        <FolderIcon />
                        <Sidebar.Label>Projects</Sidebar.Label>
                        <Collapsible.Indicator />
                      </Sidebar.NavigationButton>
                    </Collapsible.Trigger>
                  </Sidebar.Tooltip>
                  <Sidebar.NavigationAction
                    aria-label="Rename project group"
                    title="Rename project group"
                  >
                    <PencilIcon />
                  </Sidebar.NavigationAction>
                  <Collapsible.Content>
                    <Sidebar.NavigationSubList>
                      <Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubButton href="#website">
                          Website
                        </Sidebar.NavigationSubButton>
                      </Sidebar.NavigationSubItem>
                      <Sidebar.NavigationSubItem>
                        <Sidebar.NavigationSubButton href="#mobile">
                          Mobile app
                        </Sidebar.NavigationSubButton>
                      </Sidebar.NavigationSubItem>
                    </Sidebar.NavigationSubList>
                  </Collapsible.Content>
                </Collapsible>
              </Sidebar.ExpandedContent>
              <Sidebar.CollapsedContent>
                <Menu positioning={{ placement: 'right-start', gutter: 8, flip: false }}>
                  <Menu.Trigger asChild>
                    <Sidebar.NavigationButton aria-label="Open projects" title="Projects">
                      <FolderIcon />
                    </Sidebar.NavigationButton>
                  </Menu.Trigger>
                  <Menu.Positioner>
                    <Menu.Content>
                      <Menu.Item asChild value="website">
                        <a href="#website">Website</a>
                      </Menu.Item>
                      <Menu.Item asChild value="mobile">
                        <a href="#mobile">Mobile app</a>
                      </Menu.Item>
                    </Menu.Content>
                  </Menu.Positioner>
                </Menu>
              </Sidebar.CollapsedContent>
            </Sidebar.NavigationItem>
            <Sidebar.NavigationItem>
              <Sidebar.Tooltip content="Documents">
                <Sidebar.NavigationButton asChild>
                  <a href="#documents">
                    <FileIcon />
                    <Sidebar.Label>Documents</Sidebar.Label>
                  </a>
                </Sidebar.NavigationButton>
              </Sidebar.Tooltip>
              <Sidebar.NavigationBadge>12</Sidebar.NavigationBadge>
            </Sidebar.NavigationItem>
          </Sidebar.NavigationList>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer className={styles.footerStack}>
        <Sidebar.Separator />
        <Sidebar.NavigationList>
          <Sidebar.NavigationItem>
            <WorkspaceSelect />
          </Sidebar.NavigationItem>
          <Sidebar.NavigationItem>
            <AccountMenu />
          </Sidebar.NavigationItem>
        </Sidebar.NavigationList>
      </Sidebar.Footer>
    </>
  );
}

function SidebarMain() {
  return (
    <>
      <div className={styles.topbar}>
        <strong>Dashboard</strong>
      </div>
      <main className={styles.main}>
        <h2>Overview</h2>
        <p>Resize with the divider or collapse the sidebar from the floating control.</p>
        <div className={styles.placeholder} />
      </main>
    </>
  );
}

function PersistedSidebarMain({ size, onReset }: { size: SidebarSize; onReset: () => void }) {
  return (
    <>
      <div className={styles.topbar}>
        <strong>Dashboard</strong>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset saved width
        </Button>
      </div>
      <main className={styles.main}>
        <h2>Persisted width</h2>
        <p>Resize the sidebar and reload Storybook to restore the last desktop width.</p>
        <p>Saved width: {size[0] ?? '16rem'}</p>
        <div className={styles.placeholder} />
      </main>
    </>
  );
}

function PersistedSidebarLayout() {
  const [size, setSize] = useState<SidebarSize>(createDefaultPersistedSidebarSize);

  useEffect(() => {
    const persistedSize = readPersistedSidebarSize();
    if (persistedSize) {
      setSize(persistedSize);
    }
  }, []);

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(persistedSidebarStorageKey);
    }

    setSize(createDefaultPersistedSidebarSize());
  };

  return (
    <Sidebar
      size={size}
      onResize={(details) => setSize(details.size)}
      onResizeEnd={(details) => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(persistedSidebarStorageKey, details.size.join('|'));
        }
      }}
      className={styles.demo}
    >
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <PersistedSidebarMain size={size} onReset={handleReset} />
      </Sidebar.Inset>
    </Sidebar>
  );
}

function ScrollAreaNavigation() {
  return (
    <>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
        <Sidebar.NavigationList>
          <Sidebar.NavigationItem>
            <Sidebar.NavigationButton active>
              <FolderOpenIcon />
              <Sidebar.Label>Overview</Sidebar.Label>
            </Sidebar.NavigationButton>
          </Sidebar.NavigationItem>
          <Sidebar.NavigationItem>
            <Sidebar.NavigationButton>
              <FolderIcon />
              <Sidebar.Label>Projects</Sidebar.Label>
            </Sidebar.NavigationButton>
          </Sidebar.NavigationItem>
          <Sidebar.NavigationItem>
            <Sidebar.NavigationButton>
              <FileIcon />
              <Sidebar.Label>Documents</Sidebar.Label>
            </Sidebar.NavigationButton>
          </Sidebar.NavigationItem>
        </Sidebar.NavigationList>
      </Sidebar.Group>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Recent projects</Sidebar.GroupLabel>
        <Sidebar.NavigationList>
          {[
            'Website',
            'Mobile app',
            'Design system',
            'Marketing',
            'Internal tools',
            'Customer portal',
            'Analytics',
            'Documentation',
            'Onboarding',
            'Research',
            'Experiments',
            'Archive',
          ].map((project) => (
            <Sidebar.NavigationItem key={project}>
              <Sidebar.NavigationButton>
                <FileIcon />
                <Sidebar.Label>{project}</Sidebar.Label>
              </Sidebar.NavigationButton>
            </Sidebar.NavigationItem>
          ))}
        </Sidebar.NavigationList>
      </Sidebar.Group>
    </>
  );
}

export const Basic: Story = {
  render: (args) => (
    <Sidebar {...args} className={styles.demo}>
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <SidebarMain />
      </Sidebar.Inset>
    </Sidebar>
  ),
};

export const RightSide: Story = {
  render: () => (
    <Sidebar side="right" className={styles.demo}>
      <Sidebar.Inset>
        <SidebarMain />
      </Sidebar.Inset>
      <Sidebar.Trigger />
      <Sidebar.ResizeTrigger />
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
    </Sidebar>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Sidebar className={`${styles.demo} ${styles.custom}`}>
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <SidebarMain />
      </Sidebar.Inset>
    </Sidebar>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <Sidebar defaultSize={['14rem']} className={styles.demo}>
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <SidebarMain />
      </Sidebar.Inset>
    </Sidebar>
  ),
};

export const CustomPanelId: Story = {
  render: () => (
    <Sidebar panelId="navigation" className={styles.demo}>
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <SidebarMain />
      </Sidebar.Inset>
    </Sidebar>
  ),
};

export const WithScrollArea: Story = {
  render: () => (
    <Sidebar className={styles.demo}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <div className={styles.brand}>
            <span className={styles.brandMark} data-sidebar-icon>
              M
            </span>
            <Sidebar.Label>Moduix</Sidebar.Label>
          </div>
        </Sidebar.Header>
        <Sidebar.Content className={styles.scrollAreaContent}>
          <ScrollArea fade className={styles.sidebarScrollArea}>
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <ScrollAreaNavigation />
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Sidebar.NavigationList>
            <Sidebar.NavigationItem>
              <AccountMenu />
            </Sidebar.NavigationItem>
          </Sidebar.NavigationList>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <SidebarMain />
      </Sidebar.Inset>
    </Sidebar>
  ),
};

export const PersistedWidthRecipe: Story = {
  render: () => <PersistedSidebarLayout />,
};