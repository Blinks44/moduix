import { createListCollection } from '@ark-ui/react/collection';
import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState, type ComponentProps } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
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
import { Avatar } from '../../../src/components/avatar';
import { Button } from '../../../src/components/button';
import { Collapsible } from '../../../src/components/collapsible';
import { Drawer } from '../../../src/components/drawer';
import { Menu } from '../../../src/components/menu';
import { ScrollArea } from '../../../src/components/scroll-area';
import { Select } from '../../../src/components/select';
import { Sidebar } from '../../../src/components/sidebar/Sidebar';
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

const customPanels = [
  {
    id: 'sidebar',
    minSize: '10rem',
    maxSize: '17rem',
    collapsible: true,
    collapsedSize: '3rem',
  },
  { id: 'content' },
];

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
        <Sidebar.MenuButton size="lg" aria-label="Select workspace" title="Workspace">
          <span className={styles.workspaceMark} data-sidebar-icon>
            AC
          </span>
          <Sidebar.Label className={styles.workspaceLabel}>
            <Select.ValueText placeholder="Select workspace" />
          </Sidebar.Label>
          <Sidebar.Label className={styles.selectIndicator}>
            <Select.Indicator />
          </Sidebar.Label>
        </Sidebar.MenuButton>
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
        <Sidebar.MenuButton
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
        </Sidebar.MenuButton>
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
  return (
    <>
      <Sidebar.Header>
        <div className={styles.headerStack}>
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
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.Tooltip content="Overview">
                  <Sidebar.MenuButton asChild active>
                    <a href="#overview">
                      <FolderIcon />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Sidebar.Tooltip>
                <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Collapsible defaultOpen className={styles.collapsible}>
                  <Sidebar.Tooltip content="Projects">
                    <Collapsible.Trigger asChild>
                      <Sidebar.MenuButton>
                        <FolderIcon />
                        <Sidebar.Label>Projects</Sidebar.Label>
                        <Collapsible.Indicator />
                      </Sidebar.MenuButton>
                    </Collapsible.Trigger>
                  </Sidebar.Tooltip>
                  <Sidebar.MenuAction
                    aria-label="Rename project group"
                    title="Rename project group"
                  >
                    <PencilIcon />
                  </Sidebar.MenuAction>
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
                <Sidebar.Tooltip content="Documents">
                  <Sidebar.MenuButton asChild>
                    <a href="#documents">
                      <FileIcon />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Sidebar.Tooltip>
                <Sidebar.MenuBadge>12</Sidebar.MenuBadge>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.GroupContent>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer className={styles.footerStack}>
        <Sidebar.Separator />
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <WorkspaceSelect />
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <AccountMenu />
          </Sidebar.MenuItem>
        </Sidebar.Menu>
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
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton active>
              <FolderOpenIcon />
              <Sidebar.Label>Overview</Sidebar.Label>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <FolderIcon />
              <Sidebar.Label>Projects</Sidebar.Label>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <FileIcon />
              <Sidebar.Label>Documents</Sidebar.Label>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Recent projects</Sidebar.GroupLabel>
        <Sidebar.Menu>
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
            <Sidebar.MenuItem key={project}>
              <Sidebar.MenuButton>
                <FileIcon />
                <Sidebar.Label>{project}</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          ))}
        </Sidebar.Menu>
      </Sidebar.Group>
    </>
  );
}

function MobileDrawerSidebarNavigation() {
  return (
    <div className={styles.mobileSurface}>
      <Sidebar.Header>
        <div className={styles.headerStack}>
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
          <Sidebar.GroupContent>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton active>
                  <FolderOpenIcon />
                  <Sidebar.Label>Overview</Sidebar.Label>
                </Sidebar.MenuButton>
                <Sidebar.MenuBadge>3</Sidebar.MenuBadge>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Collapsible defaultOpen className={styles.collapsible}>
                  <Collapsible.Trigger asChild>
                    <Sidebar.MenuButton>
                      <FolderIcon />
                      <Sidebar.Label>Projects</Sidebar.Label>
                      <Collapsible.Indicator />
                    </Sidebar.MenuButton>
                  </Collapsible.Trigger>
                  <Sidebar.MenuAction
                    aria-label="Rename project group"
                    title="Rename project group"
                  >
                    <PencilIcon />
                  </Sidebar.MenuAction>
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
                <Sidebar.MenuButton>
                  <FileIcon />
                  <Sidebar.Label>Documents</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <FolderIcon />
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
                <FileIcon />
                <Sidebar.Label>Docs</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer className={styles.footerStack}>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <AccountMenu />
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Footer>
    </div>
  );
}

export const Basic: Story = {
  args: {
    onCollapse: fn<NonNullable<ComponentProps<typeof Sidebar>['onCollapse']>>(),
    onExpand: fn<NonNullable<ComponentProps<typeof Sidebar>['onExpand']>>(),
  },
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const page = within(canvasElement.ownerDocument.body);
    const trigger = canvasElement.querySelector('[data-slot="sidebar-trigger"]');
    if (!(trigger instanceof HTMLButtonElement)) {
      throw new Error('Sidebar trigger was not rendered');
    }

    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await expect(args.onCollapse).toHaveBeenCalledTimes(1);
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'true');
    await expect(args.onExpand).toHaveBeenCalledTimes(1);

    await userEvent.click(canvas.getByRole('button', { name: 'Open account menu' }));
    await expect(await page.findByRole('menuitem', { name: 'Profile' })).toBeVisible();
    await userEvent.keyboard('{Escape}');

    await userEvent.click(canvas.getByRole('combobox', { name: 'Select workspace' }));
    await expect(await page.findByRole('option', { name: 'Northstar' })).toBeVisible();
    await userEvent.keyboard('{Escape}');
  },
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
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('[data-slot="sidebar-trigger"]');
    if (!(trigger instanceof HTMLButtonElement)) {
      throw new Error('Sidebar trigger was not rendered');
    }

    await expect(trigger).toHaveAttribute('data-side', 'right');
    await userEvent.click(trigger);
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  },
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
    <Sidebar panels={customPanels} defaultSize={['14rem']} className={styles.demo}>
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
  play: async ({ canvasElement }) => {
    const sidebarPanel = canvasElement.querySelector('[data-slot="sidebar-panel"]');
    const insetPanel = canvasElement.querySelector('[data-slot="sidebar-inset"]');
    const resizeTrigger = canvasElement.querySelector('[data-slot="sidebar-resize-trigger"]');
    if (!sidebarPanel || !insetPanel || !resizeTrigger) {
      throw new Error('Sidebar panel anatomy was not rendered');
    }

    await expect(sidebarPanel).toHaveAttribute('data-id', 'sidebar');
    await expect(insetPanel).toHaveAttribute('data-id', 'content');
    await expect(resizeTrigger).toHaveAttribute('data-id', 'sidebar:content');
  },
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
  play: async ({ canvasElement }) => {
    const sidebarPanel = canvasElement.querySelector('[data-slot="sidebar-panel"]');
    const resizeTrigger = canvasElement.querySelector('[data-slot="sidebar-resize-trigger"]');
    if (!sidebarPanel || !resizeTrigger) {
      throw new Error('Sidebar custom panel anatomy was not rendered');
    }

    await expect(sidebarPanel).toHaveAttribute('data-id', 'navigation');
    await expect(resizeTrigger).toHaveAttribute('data-id', 'navigation:content');
  },
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
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <AccountMenu />
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <SidebarMain />
      </Sidebar.Inset>
    </Sidebar>
  ),
  play: async ({ canvasElement }) => {
    const viewport = canvasElement.querySelector('[data-slot="scroll-area-viewport"]');
    const scrollbar = canvasElement.querySelector('[data-slot="scroll-area-scrollbar"]');
    const thumb = canvasElement.querySelector('[data-slot="scroll-area-thumb"]');
    if (!(viewport instanceof HTMLElement) || !scrollbar || !(thumb instanceof HTMLElement)) {
      throw new Error('ScrollArea anatomy was not rendered');
    }

    await expect(viewport.scrollHeight).toBeGreaterThan(viewport.clientHeight);
    await expect(scrollbar).toHaveAttribute('data-orientation', 'vertical');

    await userEvent.hover(viewport);
    await waitFor(() => {
      expect(scrollbar).toHaveAttribute('data-hover');
    });

    const widthBeforeHover = thumb.getBoundingClientRect().width;
    await userEvent.hover(thumb);
    await waitFor(() => {
      expect(thumb.getBoundingClientRect().width).toBeGreaterThan(widthBeforeHover);
    });
  },
};

export const MobileDrawerComposition: Story = {
  render: () => (
    <Drawer.Root swipeDirection="start">
      <Drawer.Trigger asChild>
        <Button variant="outline" className={styles.mobileTrigger}>
          Open mobile navigation
        </Button>
      </Drawer.Trigger>
      <Drawer.Backdrop />
      <Drawer.Positioner>
        <Drawer.Content className={styles.mobileDrawer} draggable={false}>
          <Drawer.Header className={styles.mobileDrawerHeader}>
            <Drawer.Title>Navigation</Drawer.Title>
            <Drawer.CloseIcon />
            <Drawer.Description>
              Use Drawer for compact-screen overlay navigation.
            </Drawer.Description>
          </Drawer.Header>
          <Drawer.Body className={styles.mobileDrawerBody}>
            <MobileDrawerSidebarNavigation />
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Positioner>
    </Drawer.Root>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Open mobile navigation' }));
    await expect(
      await within(canvasElement.ownerDocument.body).findByText('Navigation'),
    ).toBeVisible();
  },
};

export const PersistedWidthRecipe: Story = {
  render: () => <PersistedSidebarLayout />,
};