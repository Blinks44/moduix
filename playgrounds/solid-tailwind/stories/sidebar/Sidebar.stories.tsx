import { createListCollection } from '@ark-ui/solid/collection';
import type { ComponentProps } from 'solid-js';
import { createSignal, onMount } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Avatar, AvatarFallback } from '@/components/avatar/Avatar';
import { Button } from '@/components/button/Button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
} from '@/components/collapsible/Collapsible';
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
} from '@/components/menu/Menu';
import {
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
} from '@/components/scroll-area/ScrollArea';
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
} from '@/components/select/Select';
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
} from '@/internal/icons/ui/Icons';

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
      class="w-full"
      collection={workspaces}
      defaultValue={['acme']}
      positioning={{ placement: 'right-start', gutter: 8, flip: false }}
    >
      <SelectTrigger
        asChild={(props) => (
          <SidebarNavigationButton
            {...props()}
            size="lg"
            aria-label="Select workspace"
            title="Workspace"
            class={accentClassName}
          >
            <span class={workspaceMarkClassName} data-sidebar-icon>
              AC
            </span>
            <SidebarLabel class={accountMetaClassName}>
              <strong>
                <SelectValueText placeholder="Select workspace" />
              </strong>
              <span>Workspace</span>
            </SidebarLabel>
            <SelectIndicator />
          </SidebarNavigationButton>
        )}
      />
      <SelectPositioner>
        <SelectContent>
          {workspaces.items.map((workspace) => (
            <SelectItem item={workspace}>
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
      <MenuTrigger
        asChild={(props) => (
          <SidebarNavigationButton
            {...props()}
            size="lg"
            aria-label="Open account menu"
            title="Account"
            class={[accountButtonClassName, accentClassName].filter(Boolean).join(' ')}
          >
            <Avatar size="sm" data-sidebar-icon>
              <AvatarFallback>AM</AvatarFallback>
            </Avatar>
            <SidebarLabel class={accountMetaClassName}>
              <strong>Alex Morgan</strong>
              <span>alex@acme.dev</span>
            </SidebarLabel>
            <MenuIndicator>
              <ChevronUpDownIcon />
            </MenuIndicator>
          </SidebarNavigationButton>
        )}
      />
      <MenuPositioner>
        <MenuContent class={accountMenuClassName}>
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
        <div class={headerStackClassName}>
          <div class={brandClassName}>
            <span class={brandMarkClassName} data-sidebar-icon>
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
              class={accentClassName}
            >
              <PlusIcon />
            </SidebarGroupAction>
          </SidebarGroupHeader>
          <SidebarNavigationList>
            <SidebarNavigationItem>
              <SidebarTooltip content="Overview">
                {(props) => (
                  <SidebarNavigationButton
                    {...props()}
                    active
                    class={accentClassName}
                    asChild={(buttonProps) => (
                      <a {...buttonProps()} href="#overview">
                        <FolderIcon />
                        <SidebarLabel>Overview</SidebarLabel>
                      </a>
                    )}
                  />
                )}
              </SidebarTooltip>
              <SidebarNavigationBadge>12</SidebarNavigationBadge>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarExpandedContent>
                <Collapsible defaultOpen class={collapsibleClassName}>
                  <SidebarTooltip content="Projects">
                    {(tooltipProps) => (
                      <CollapsibleTrigger
                        asChild={(triggerProps) => (
                          <SidebarNavigationButton
                            {...tooltipProps()}
                            {...triggerProps()}
                            class={accentClassName}
                          >
                            <FolderIcon />
                            <SidebarLabel>Projects</SidebarLabel>
                            <CollapsibleIndicator />
                          </SidebarNavigationButton>
                        )}
                      />
                    )}
                  </SidebarTooltip>
                  <CollapsibleContent>
                    <SidebarNavigationSubList>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton href="#website" class={accentClassName}>
                          Website
                        </SidebarNavigationSubButton>
                        <SidebarNavigationBadge>3</SidebarNavigationBadge>
                      </SidebarNavigationSubItem>
                      <SidebarNavigationSubItem>
                        <SidebarNavigationSubButton href="#mobile" class={accentClassName}>
                          Mobile app
                        </SidebarNavigationSubButton>
                      </SidebarNavigationSubItem>
                    </SidebarNavigationSubList>
                  </CollapsibleContent>
                </Collapsible>
              </SidebarExpandedContent>
              <SidebarCollapsedContent>
                <Menu positioning={{ placement: 'right-start', gutter: 8, flip: false }}>
                  <MenuTrigger
                    asChild={(props) => (
                      <SidebarNavigationButton
                        {...props()}
                        aria-label="Open projects"
                        title="Projects"
                        class={accentClassName}
                      >
                        <FolderIcon />
                      </SidebarNavigationButton>
                    )}
                  />
                  <MenuPositioner>
                    <MenuContent>
                      <MenuViewport>
                        <MenuItem
                          value="website"
                          asChild={(props) => (
                            <a {...props()} href="#website">
                              Website
                            </a>
                          )}
                        />
                        <MenuItem
                          value="mobile"
                          asChild={(props) => (
                            <a {...props()} href="#mobile">
                              Mobile app
                            </a>
                          )}
                        />
                      </MenuViewport>
                    </MenuContent>
                  </MenuPositioner>
                </Menu>
              </SidebarCollapsedContent>
            </SidebarNavigationItem>
            <SidebarNavigationItem>
              <SidebarTooltip content="Documents">
                {(props) => (
                  <SidebarNavigationButton
                    {...props()}
                    class={accentClassName}
                    asChild={(buttonProps) => (
                      <a {...buttonProps()} href="#documents">
                        <FileIcon />
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
      <SidebarFooter class={footerStackClassName}>
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
      <div class={topbarClassName}>
        <strong>Dashboard</strong>
      </div>
      <main class={mainClassName}>
        <h2>Overview</h2>
        <p>Resize with the divider or collapse the sidebar from the floating control.</p>
        <div class={placeholderClassName} />
      </main>
    </>
  );
}

function PersistedSidebarMain(props: { size: SidebarSize; onReset: () => void }) {
  return (
    <>
      <div class={topbarClassName}>
        <strong>Dashboard</strong>
        <Button variant="outline" size="sm" onClick={props.onReset}>
          Reset saved width
        </Button>
      </div>
      <main class={mainClassName}>
        <h2>Persisted width</h2>
        <p>Resize the sidebar and reload Storybook to restore the last desktop width.</p>
        <p>Saved width: {props.size[0] ?? '16rem'}</p>
        <div class={placeholderClassName} />
      </main>
    </>
  );
}

function PersistedSidebarLayout() {
  const [size, setSize] = createSignal<SidebarSize>(createDefaultPersistedSidebarSize());

  onMount(() => {
    const persistedSize = readPersistedSidebarSize();
    if (persistedSize) {
      setSize(persistedSize);
    }
  });

  const handleReset = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(persistedSidebarStorageKey);
    }

    setSize(createDefaultPersistedSidebarSize());
  };

  return (
    <Sidebar
      size={size()}
      onResize={(details) => setSize(details.size)}
      onResizeEnd={(details) => {
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(persistedSidebarStorageKey, details.size.join('|'));
        }
      }}
      class={demoClassName}
    >
      <SidebarPanel>
        <SidebarNavigation />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <PersistedSidebarMain size={size()} onReset={handleReset} />
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
            <SidebarNavigationItem>
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
    <Sidebar {...args} class={demoClassName}>
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
    <Sidebar side="right" class={demoClassName}>
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
    <Sidebar class={demoClassName}>
      <SidebarPanel class={customPanelClassName}>
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
    <Sidebar defaultSize={['14rem']} class={demoClassName}>
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
    <Sidebar panelId="navigation" class={demoClassName}>
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
    <Sidebar class={demoClassName}>
      <SidebarPanel>
        <SidebarHeader>
          <div class={brandClassName}>
            <span class={brandMarkClassName} data-sidebar-icon>
              M
            </span>
            <SidebarLabel>Moduix</SidebarLabel>
          </div>
        </SidebarHeader>
        <SidebarContent class={scrollAreaContentClassName}>
          <ScrollArea fade class={sidebarScrollAreaClassName}>
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