import { createListCollection } from '@ark-ui/react/collection';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState, type ComponentProps } from 'react';
import { Avatar, AvatarFallback } from '@/components/avatar';
import { Button } from '@/components/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@/components/collapsible';
import {
  Menu,
  MenuTrigger,
  MenuIndicator,
  MenuPositioner,
  MenuContent,
  MenuViewport,
  MenuItem,
  MenuSeparator,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
} from '@/components/menu';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/components/scroll-area';
import {
  Select,
  SelectTrigger,
  SelectValueText,
  SelectIndicator,
  SelectPositioner,
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectItemIndicator,
} from '@/components/select';
import {
  Sidebar,
  SidebarPanel,
  SidebarInset,
  SidebarResizeTrigger,
  SidebarTrigger,
  SidebarLabel,
  SidebarInput,
  SidebarHeader,
  SidebarContent,
  SidebarExpandedContent,
  SidebarCollapsedContent,
  SidebarFooter,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarGroupAction,
  SidebarNavigationList,
  SidebarNavigationItem,
  SidebarTooltip,
  SidebarNavigationButton,
  SidebarNavigationBadge,
  SidebarNavigationSubList,
  SidebarNavigationSubItem,
  SidebarNavigationSubButton,
} from '@/components/sidebar/Sidebar';
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

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

const demoClassName = 'h-152 w-[min(68rem,calc(100vw-4rem))] rounded-lg shadow-md';
const customPanelClassName = 'bg-[color-mix(in_oklab,var(--color-primary)_5%,var(--color-card))]';
const customAccentInteractiveClassName =
  'data-active:bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-accent))] [&:not(:disabled):not([aria-disabled=true])]:hover:bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-accent))]';
const brandClassName = 'flex min-w-0 items-center gap-2 font-semibold';
const headerStackClassName = 'grid w-full gap-3';
const footerStackClassName = 'grid w-full';
const brandMarkClassName =
  'grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground';
const collapsibleClassName = 'w-full max-w-full text-inherit';
const scrollAreaContentClassName = 'overflow-hidden';
const sidebarScrollAreaClassName = 'rounded-none';
const topbarClassName = 'flex min-h-14 items-center gap-3 border-b border-border px-6';
const mainClassName = 'grid gap-4 p-6 [&>h2]:m-0 [&>p]:m-0';
const placeholderClassName = 'min-h-72 rounded-lg border border-dashed border-border bg-muted/55';
const accountButtonClassName = 'h-auto';
const workspaceMarkClassName =
  'grid size-control-sm flex-none place-items-center rounded-sm bg-accent text-xs font-semibold text-accent-foreground';
const accountMenuClassName = 'min-w-56 max-w-72';
const accountMetaClassName =
  'grid flex-1 text-start [&>strong]:truncate [&>strong]:font-medium [&>span]:truncate [&>span]:text-xs [&>span]:leading-5 [&>span]:text-muted-foreground';

const workspaces = createListCollection({
  items: [
    { label: 'Acme Inc.', value: 'acme' },
    { label: 'Northstar', value: 'northstar' },
    { label: 'Personal', value: 'personal' },
  ],
});

type SidebarSize = NonNullable<ComponentProps<typeof Sidebar>['size']>;

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

function WorkspaceSelect({ accentClassName }: { accentClassName?: string } = {}) {
  return (
    <Select
      className="w-full"
      collection={workspaces}
      defaultValue={['acme']}
      positioning={{ placement: 'right-start', gutter: 8, flip: false }}
    >
      <SelectTrigger asChild>
        <SidebarNavigationButton
          size="lg"
          aria-label="Select workspace"
          title="Workspace"
          className={accentClassName}
        >
          <span className={workspaceMarkClassName} data-sidebar-icon>
            AC
          </span>
          <SidebarLabel className={accountMetaClassName}>
            <strong>
              <SelectValueText placeholder="Select workspace" />
            </strong>
            <span>Workspace</span>
          </SidebarLabel>
          <SelectIndicator />
        </SidebarNavigationButton>
      </SelectTrigger>
      <SelectPositioner>
        <SelectContent>
          {workspaces.items.map((workspace) => (
            <SelectItem key={workspace.value} item={workspace}>
              <SelectItemText>{workspace.label}</SelectItemText>
              <SelectItemIndicator />
            </SelectItem>
          ))}
        </SelectContent>
      </SelectPositioner>
    </Select>
  );
}

function AccountMenu({ accentClassName }: { accentClassName?: string } = {}) {
  return (
    <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
      <MenuTrigger asChild>
        <SidebarNavigationButton
          size="lg"
          aria-label="Open account menu"
          title="Account"
          className={[accountButtonClassName, accentClassName].filter(Boolean).join(' ')}
        >
          <Avatar size="sm" data-sidebar-icon>
            <AvatarFallback>AM</AvatarFallback>
          </Avatar>
          <SidebarLabel className={accountMetaClassName}>
            <strong>Alex Morgan</strong>
            <span>alex@acme.dev</span>
          </SidebarLabel>
          <MenuIndicator>
            <ChevronUpDownIcon />
          </MenuIndicator>
        </SidebarNavigationButton>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent className={accountMenuClassName}>
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Acme Inc.</MenuItemGroupLabel>
              <MenuItem value="profile">
                <MenuItemText>
                  <MenuItemTextContent>
                    <MenuItemTextIcon>
                      <PencilIcon />
                    </MenuItemTextIcon>
                    <MenuItemTextLabel>Profile</MenuItemTextLabel>
                  </MenuItemTextContent>
                </MenuItemText>
              </MenuItem>
              <MenuItem value="settings">
                <MenuItemText>
                  <MenuItemTextContent>
                    <MenuItemTextIcon>
                      <RestartIcon />
                    </MenuItemTextIcon>
                    <MenuItemTextLabel>Settings</MenuItemTextLabel>
                  </MenuItemTextContent>
                </MenuItemText>
              </MenuItem>
            </MenuItemGroup>
            <MenuSeparator />
            <MenuItem value="sign-out" tone="destructive">
              <MenuItemText>
                <MenuItemTextContent>
                  <MenuItemTextIcon>
                    <TrashIcon />
                  </MenuItemTextIcon>
                  <MenuItemTextLabel>Sign out</MenuItemTextLabel>
                </MenuItemTextContent>
              </MenuItemText>
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  );
}

function SidebarNavigation({ accentClassName }: { accentClassName?: string } = {}) {
  return (
    <>
      <SidebarHeader>
        <div className={headerStackClassName}>
          <div className={brandClassName}>
            <span className={brandMarkClassName} data-sidebar-icon>
              M
            </span>
            <SidebarLabel>Moduix</SidebarLabel>
          </div>
          <SidebarInput aria-label="Search workspace" placeholder="Search" size="sm" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupHeader>
            <SidebarGroupLabel>Workspace</SidebarGroupLabel>
            <SidebarGroupAction
              aria-label="Create workspace item"
              title="Create workspace item"
              className={accentClassName}
            >
              <PlusIcon />
            </SidebarGroupAction>
          </SidebarGroupHeader>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarTooltip content="Overview">
                <SidebarNavigationButton asChild active className={accentClassName}>
                  <a href="#overview">
                    <FolderIcon />
                    <SidebarLabel>Overview</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarTooltip>
              <SidebarNavigationBadge>12</SidebarNavigationBadge>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarExpandedContent>
                <Collapsible defaultOpen className={collapsibleClassName}>
                  <SidebarTooltip content="Projects">
                    <CollapsibleTrigger asChild>
                      <SidebarNavigationButton className={accentClassName}>
                        <FolderIcon />
                        <SidebarLabel>Projects</SidebarLabel>
                        <CollapsibleIndicator />
                      </SidebarNavigationButton>
                    </CollapsibleTrigger>
                  </SidebarTooltip>
                  <CollapsibleContent>
                    <SidebarNavigationSubList>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton href="#website" className={accentClassName}>
                          Website
                        </SidebarNavigationSubButton>
                        <SidebarNavigationBadge>3</SidebarNavigationBadge>
                      </SidebarNavigationSubItem>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton href="#mobile" className={accentClassName}>
                          Mobile app
                        </SidebarNavigationSubButton>
                      </SidebarNavigationSubItem>
                    </SidebarNavigationSubList>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarExpandedContent>
              <SidebarCollapsedContent>
                <Menu positioning={{ placement: 'right-start', gutter: 8, flip: false }}>
                  <MenuTrigger asChild>
                    <SidebarNavigationButton
                      aria-label="Open projects"
                      title="Projects"
                      className={accentClassName}
                    >
                      <FolderIcon />
                    </SidebarNavigationButton>
                  </MenuTrigger>
                  <MenuPositioner>
                    <MenuContent>
                      <MenuViewport>
                        <MenuItem asChild value="website">
                          <a href="#website">Website</a>
                        </MenuItem>
                        <MenuItem asChild value="mobile">
                          <a href="#mobile">Mobile app</a>
                        </MenuItem>
                      </MenuViewport>
                    </MenuContent>
                  </MenuPositioner>
                </Menu>
              </SidebarCollapsedContent>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarTooltip content="Documents">
                <SidebarNavigationButton asChild className={accentClassName}>
                  <a href="#documents">
                    <FileIcon />
                    <SidebarLabel>Documents</SidebarLabel>
                  </a>
                </SidebarNavigationButton>
              </SidebarTooltip>
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={footerStackClassName}>
        <SidebarSeparator />
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <WorkspaceSelect accentClassName={accentClassName} />
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <AccountMenu accentClassName={accentClassName} />
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarFooter>
    </>
  );
}

function SidebarMain() {
  return (
    <>
      <div className={topbarClassName}>
        <strong>Dashboard</strong>
      </div>
      <main className={mainClassName}>
        <h2>Overview</h2>
        <p>Resize with the divider or collapse the sidebar from the floating control.</p>
        <div className={placeholderClassName} />
      </main>
    </>
  );
}

function PersistedSidebarMain({ size, onReset }: { size: SidebarSize; onReset: () => void }) {
  return (
    <>
      <div className={topbarClassName}>
        <strong>Dashboard</strong>
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset saved width
        </Button>
      </div>
      <main className={mainClassName}>
        <h2>Persisted width</h2>
        <p>Resize the sidebar and reload Storybook to restore the last desktop width.</p>
        <p>Saved width: {size[0] ?? '16rem'}</p>
        <div className={placeholderClassName} />
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
      className={demoClassName}
    >
      <SidebarPanel>
        <SidebarNavigation />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <PersistedSidebarMain size={size} onReset={handleReset} />
      </SidebarInset>
    </Sidebar>
  );
}

function ScrollAreaNavigation() {
  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspace</SidebarGroupLabel>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarNavigationButton active>
              <FolderOpenIcon />
              <SidebarLabel>Overview</SidebarLabel>
            </SidebarNavigationButton>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              <FolderIcon />
              <SidebarLabel>Projects</SidebarLabel>
            </SidebarNavigationButton>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarNavigationButton>
              <FileIcon />
              <SidebarLabel>Documents</SidebarLabel>
            </SidebarNavigationButton>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
      <SidebarGroup>
        <SidebarGroupLabel>Recent projects</SidebarGroupLabel>
        <SidebarNavigationList>
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
            <SidebarNavigationItem key={project}>
              <SidebarNavigationButton>
                <FileIcon />
                <SidebarLabel>{project}</SidebarLabel>
              </SidebarNavigationButton>
            </SidebarNavigationItem>
          ))}
        </SidebarNavigationList>
      </SidebarGroup>
    </>
  );
}

export const Basic: Story = {
  render: (args) => (
    <Sidebar {...args} className={demoClassName}>
      <SidebarPanel>
        <SidebarNavigation />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <SidebarMain />
      </SidebarInset>
    </Sidebar>
  ),
};

export const RightSide: Story = {
  render: () => (
    <Sidebar side="right" className={demoClassName}>
      <SidebarInset>
        <SidebarMain />
      </SidebarInset>
      <SidebarTrigger />
      <SidebarResizeTrigger />
      <SidebarPanel>
        <SidebarNavigation />
      </SidebarPanel>
    </Sidebar>
  ),
};

export const CustomStyling: Story = {
  render: () => (
    <Sidebar className={demoClassName}>
      <SidebarPanel className={customPanelClassName}>
        <SidebarNavigation accentClassName={customAccentInteractiveClassName} />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <SidebarMain />
      </SidebarInset>
    </Sidebar>
  ),
};

export const CustomSizes: Story = {
  render: () => (
    <Sidebar defaultSize={['14rem']} className={demoClassName}>
      <SidebarPanel>
        <SidebarNavigation />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <SidebarMain />
      </SidebarInset>
    </Sidebar>
  ),
};

export const CustomPanelId: Story = {
  render: () => (
    <Sidebar panelId="navigation" className={demoClassName}>
      <SidebarPanel>
        <SidebarNavigation />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <SidebarMain />
      </SidebarInset>
    </Sidebar>
  ),
};

export const WithScrollArea: Story = {
  render: () => (
    <Sidebar className={demoClassName}>
      <SidebarPanel>
        <SidebarHeader>
          <div className={brandClassName}>
            <span className={brandMarkClassName} data-sidebar-icon>
              M
            </span>
            <SidebarLabel>Moduix</SidebarLabel>
          </div>
        </SidebarHeader>
        <SidebarContent className={scrollAreaContentClassName}>
          <ScrollArea fade className={sidebarScrollAreaClassName}>
            <ScrollAreaViewport>
              <ScrollAreaContent>
                <ScrollAreaNavigation />
              </ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar>
              <ScrollAreaThumb />
            </ScrollAreaScrollbar>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <AccountMenu />
            </SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarFooter>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <SidebarMain />
      </SidebarInset>
    </Sidebar>
  ),
};

export const PersistedWidthRecipe: Story = {
  render: () => <PersistedSidebarLayout />,
};