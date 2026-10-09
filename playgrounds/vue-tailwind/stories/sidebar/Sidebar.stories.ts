import { createListCollection } from '@ark-ui/vue/collection';
import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { defineComponent, onMounted, ref } from 'vue';
import type { Component } from 'vue';
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
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
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
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
} from '@/components/select';
import {
  Sidebar,
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarSeparator,
  SidebarTooltip,
  SidebarTrigger,
  type SidebarProps,
} from '@/components/sidebar';
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
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;
type SidebarSize = NonNullable<SidebarProps['size']>;

const classes = {
  accountButton: 'h-auto',
  accountMenu: 'min-w-56 max-w-72',
  accountMeta:
    'grid flex-1 text-start [&>strong]:truncate [&>strong]:font-medium [&>span]:truncate [&>span]:text-xs [&>span]:leading-5 [&>span]:text-muted-foreground',
  brand: 'flex min-w-0 items-center gap-2 font-semibold',
  brandMark:
    'grid size-control-sm flex-none place-items-center rounded-sm bg-primary text-xs text-primary-foreground',
  collapsible: 'w-full max-w-full text-inherit',
  customAccent:
    'data-active:bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-accent))] [&:not(:disabled):not([aria-disabled=true])]:hover:bg-[color-mix(in_oklab,var(--color-primary)_14%,var(--color-accent))]',
  customPanel: 'bg-[color-mix(in_oklab,var(--color-primary)_5%,var(--color-card))]',
  demo: 'h-152 w-[min(68rem,calc(100vw-4rem))] rounded-lg shadow-md',
  footerStack: 'grid w-full',
  headerStack: 'grid w-full gap-3',
  main: 'grid gap-4 p-6 [&>h2]:m-0 [&>p]:m-0',
  placeholder: 'min-h-72 rounded-lg border border-dashed border-border bg-muted/55',
  scrollAreaContent: 'overflow-hidden',
  sidebarScrollArea: 'rounded-none',
  topbar: 'flex min-h-14 items-center gap-3 border-b border-border px-6',
  workspaceMark:
    'grid size-control-sm flex-none place-items-center rounded-sm bg-accent text-xs font-semibold text-accent-foreground',
  workspaceSelect: 'w-full',
};

const workspaces = createListCollection({
  items: [
    { label: 'Acme Inc.', value: 'acme' },
    { label: 'Northstar', value: 'northstar' },
    { label: 'Personal', value: 'personal' },
  ],
});

const persistedSidebarStorageKey = 'moduix-storybook-sidebar-size';
const defaultPersistedSidebarSize: SidebarSize = ['16rem'];

const readPersistedSidebarSize = (): SidebarSize | null => {
  if (typeof window === 'undefined') return null;

  const stored = window.localStorage.getItem(persistedSidebarStorageKey);
  if (!stored) return null;

  const nextSize = stored.split('|').filter(Boolean);
  return nextSize.length > 0 ? nextSize : null;
};

const primitiveComponents = {
  ChevronUpDownIcon,
  Avatar,
  AvatarFallback,
  Button,
  Collapsible,
  CollapsibleContent,
  CollapsibleIndicator,
  CollapsibleTrigger,
  FileIcon,
  FolderIcon,
  FolderOpenIcon,
  Menu,
  MenuContent,
  MenuIndicator,
  MenuItem,
  MenuItemGroup,
  MenuItemGroupLabel,
  MenuItemText,
  MenuItemTextContent,
  MenuItemTextIcon,
  MenuItemTextLabel,
  MenuPositioner,
  MenuSeparator,
  MenuTrigger,
  MenuViewport,
  PencilIcon,
  PlusIcon,
  RestartIcon,
  ScrollArea,
  ScrollAreaContent,
  ScrollAreaScrollbar,
  ScrollAreaThumb,
  ScrollAreaViewport,
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectItemIndicator,
  SelectItemText,
  SelectPositioner,
  SelectTrigger,
  SelectValueText,
  Sidebar,
  SidebarCollapsedContent,
  SidebarContent,
  SidebarExpandedContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupHeader,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarInput,
  SidebarLabel,
  SidebarNavigationBadge,
  SidebarNavigationButton,
  SidebarNavigationItem,
  SidebarNavigationList,
  SidebarNavigationSubButton,
  SidebarNavigationSubItem,
  SidebarNavigationSubList,
  SidebarPanel,
  SidebarResizeTrigger,
  SidebarSeparator,
  SidebarTooltip,
  SidebarTrigger,
  TrashIcon,
} as unknown as Record<string, Component>;

const WorkspaceSelect = defineComponent({
  components: primitiveComponents,
  props: { accentClass: { type: String, default: undefined } },
  setup(props) {
    return { classes, props, workspaces };
  },
  template: `
    <Select
      :class="classes.workspaceSelect"
      :collection="workspaces"
      :default-value="['acme']"
      :positioning="{ placement: 'right-start', gutter: 8, flip: false }"
    >
      <SelectTrigger as-child>
        <SidebarNavigationButton
          size="lg"
          aria-label="Select workspace"
          title="Workspace"
          :class="props.accentClass"
        >
          <span :class="classes.workspaceMark" data-sidebar-icon>AC</span>
          <SidebarLabel :class="classes.accountMeta">
            <strong><SelectValueText placeholder="Select workspace" /></strong>
            <span>Workspace</span>
          </SidebarLabel>
          <SelectIndicator />
        </SidebarNavigationButton>
      </SelectTrigger>
      <SelectPositioner>
        <SelectContent>
          <SelectItem v-for="workspace in workspaces.items" :key="workspace.value" :item="workspace">
            <SelectItemText>{{ workspace.label }}</SelectItemText>
            <SelectItemIndicator />
          </SelectItem>
        </SelectContent>
      </SelectPositioner>
    </Select>
  `,
});

const AccountMenu = defineComponent({
  components: primitiveComponents,
  props: { accentClass: { type: String, default: undefined } },
  setup(props) {
    return { classes, props };
  },
  template: `
    <Menu :positioning="{ placement: 'right-end', gutter: 8, flip: false }">
      <MenuTrigger as-child>
        <SidebarNavigationButton
          size="lg"
          aria-label="Open account menu"
          title="Account"
          :class="[classes.accountButton, props.accentClass]"
        >
          <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
          <SidebarLabel :class="classes.accountMeta">
            <strong>Alex Morgan</strong>
            <span>alex@acme.dev</span>
          </SidebarLabel>
          <MenuIndicator><ChevronUpDownIcon /></MenuIndicator>
        </SidebarNavigationButton>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent :class="classes.accountMenu">
          <MenuViewport>
            <MenuItemGroup>
              <MenuItemGroupLabel>Acme Inc.</MenuItemGroupLabel>
              <MenuItem value="profile">
                <MenuItemText>
                  <MenuItemTextContent>
                    <MenuItemTextIcon><PencilIcon /></MenuItemTextIcon>
                    <MenuItemTextLabel>Profile</MenuItemTextLabel>
                  </MenuItemTextContent>
                </MenuItemText>
              </MenuItem>
              <MenuItem value="settings">
                <MenuItemText>
                  <MenuItemTextContent>
                    <MenuItemTextIcon><RestartIcon /></MenuItemTextIcon>
                    <MenuItemTextLabel>Settings</MenuItemTextLabel>
                  </MenuItemTextContent>
                </MenuItemText>
              </MenuItem>
            </MenuItemGroup>
            <MenuSeparator />
            <MenuItem value="sign-out" tone="destructive">
              <MenuItemText>
                <MenuItemTextContent>
                  <MenuItemTextIcon><TrashIcon /></MenuItemTextIcon>
                  <MenuItemTextLabel>Sign out</MenuItemTextLabel>
                </MenuItemTextContent>
              </MenuItemText>
            </MenuItem>
          </MenuViewport>
        </MenuContent>
      </MenuPositioner>
    </Menu>
  `,
});

const SidebarNavigation = defineComponent({
  components: { ...primitiveComponents, AccountMenu, WorkspaceSelect },
  props: { accentClass: { type: String, default: undefined } },
  setup(props) {
    return { classes, props };
  },
  template: `
    <SidebarHeader>
      <div :class="classes.headerStack">
        <div :class="classes.brand">
          <span :class="classes.brandMark" data-sidebar-icon>M</span>
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
            :class="props.accentClass"
          ><PlusIcon /></SidebarGroupAction>
        </SidebarGroupHeader>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarTooltip content="Overview">
              <SidebarNavigationButton active as-child :class="props.accentClass">
                <a href="#overview"><FolderIcon /><SidebarLabel>Overview</SidebarLabel></a>
              </SidebarNavigationButton>
            </SidebarTooltip>
            <SidebarNavigationBadge>12</SidebarNavigationBadge>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarExpandedContent>
              <Collapsible default-open :class="classes.collapsible">
                <SidebarTooltip content="Projects">
                  <CollapsibleTrigger as-child>
                    <SidebarNavigationButton :class="props.accentClass">
                      <FolderIcon /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator />
                    </SidebarNavigationButton>
                  </CollapsibleTrigger>
                </SidebarTooltip>
                <CollapsibleContent>
                  <SidebarNavigationSubList>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="#website" :class="props.accentClass">Website</SidebarNavigationSubButton>
                      <SidebarNavigationBadge>3</SidebarNavigationBadge>
                    </SidebarNavigationSubItem>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="#mobile" :class="props.accentClass">Mobile app</SidebarNavigationSubButton>
                    </SidebarNavigationSubItem>
                  </SidebarNavigationSubList>
                </CollapsibleContent>
              </Collapsible>
            </SidebarExpandedContent>
            <SidebarCollapsedContent>
              <Menu :positioning="{ placement: 'right-start', gutter: 8, flip: false }">
                <MenuTrigger as-child>
                  <SidebarNavigationButton aria-label="Open projects" title="Projects" :class="props.accentClass">
                    <FolderIcon />
                  </SidebarNavigationButton>
                </MenuTrigger>
                <MenuPositioner>
                  <MenuContent>
                    <MenuViewport>
                      <MenuItem value="website" as-child><a href="#website">Website</a></MenuItem>
                      <MenuItem value="mobile" as-child><a href="#mobile">Mobile app</a></MenuItem>
                    </MenuViewport>
                  </MenuContent>
                </MenuPositioner>
              </Menu>
            </SidebarCollapsedContent>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarTooltip content="Documents">
              <SidebarNavigationButton as-child :class="props.accentClass">
                <a href="#documents"><FileIcon /><SidebarLabel>Documents</SidebarLabel></a>
              </SidebarNavigationButton>
            </SidebarTooltip>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter :class="classes.footerStack">
      <SidebarSeparator />
      <SidebarNavigationList>
        <SidebarNavigationItem><WorkspaceSelect :accent-class="props.accentClass" /></SidebarNavigationItem>
        <SidebarNavigationItem><AccountMenu :accent-class="props.accentClass" /></SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarFooter>
  `,
});

const SidebarMain = defineComponent({
  setup() {
    return { classes };
  },
  template: `
      <div :class="classes.topbar"><strong>Dashboard</strong></div>
      <main :class="classes.main">
        <h2>Overview</h2>
        <p>Resize with the divider or collapse the sidebar from the floating control.</p>
        <div :class="classes.placeholder" />
      </main>
  `,
});

const ScrollAreaNavigation = defineComponent({
  components: primitiveComponents,
  setup() {
    return {
      classes,
      projects: [
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
      ],
    };
  },
  template: `
    <SidebarGroup>
      <SidebarGroupLabel>Workspace</SidebarGroupLabel>
      <SidebarNavigationList>
        <SidebarNavigationItem>
          <SidebarNavigationButton active><FolderOpenIcon /><SidebarLabel>Overview</SidebarLabel></SidebarNavigationButton>
        </SidebarNavigationItem>
        <SidebarNavigationItem>
          <SidebarNavigationButton><FolderIcon /><SidebarLabel>Projects</SidebarLabel></SidebarNavigationButton>
        </SidebarNavigationItem>
        <SidebarNavigationItem>
          <SidebarNavigationButton><FileIcon /><SidebarLabel>Documents</SidebarLabel></SidebarNavigationButton>
        </SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarGroup>
    <SidebarGroup>
      <SidebarGroupLabel>Recent projects</SidebarGroupLabel>
      <SidebarNavigationList>
        <SidebarNavigationItem v-for="project in projects" :key="project">
          <SidebarNavigationButton><FileIcon /><SidebarLabel>{{ project }}</SidebarLabel></SidebarNavigationButton>
        </SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarGroup>
  `,
});

const PersistedSidebarLayout = defineComponent({
  components: { ...primitiveComponents, SidebarNavigation },
  setup() {
    const size = ref<SidebarSize>(defaultPersistedSidebarSize);

    onMounted(() => {
      const persistedSize = readPersistedSidebarSize();
      if (persistedSize) size.value = persistedSize;
    });

    const updateSize = (details: { size: SidebarSize }) => {
      size.value = details.size;
    };

    const persistSize = (details: { size: SidebarSize }) => {
      window.localStorage.setItem(persistedSidebarStorageKey, details.size.join('|'));
    };

    const resetSize = () => {
      window.localStorage.removeItem(persistedSidebarStorageKey);
      size.value = [...defaultPersistedSidebarSize];
    };

    return { classes, resetSize, size, updateSize, persistSize };
  },
  template: `
    <Sidebar :size="size" :class="classes.demo" @resize="updateSize" @resize-end="persistSize">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <div :class="classes.topbar">
          <strong>Dashboard</strong>
          <Button variant="outline" size="sm" @click="resetSize">Reset saved width</Button>
        </div>
        <main :class="classes.main">
          <h2>Persisted width</h2>
          <p>Resize the sidebar and reload Storybook to restore the last desktop width.</p>
          <p>Saved width: {{ size[0] ?? '16rem' }}</p>
          <div :class="classes.placeholder" />
        </main>
      </SidebarInset>
    </Sidebar>
  `,
});

const storyComponents = {
  ...primitiveComponents,
  AccountMenu,
  PersistedSidebarLayout,
  ScrollAreaNavigation,
  SidebarMain,
  SidebarNavigation,
  WorkspaceSelect,
};

function renderStory(template: string) {
  return (args: SidebarProps) =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { args, classes };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Sidebar v-bind="args" :class="classes.demo">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const RightSide: Story = {
  render: renderStory(`
    <Sidebar side="right" :class="classes.demo">
      <SidebarInset><SidebarMain /></SidebarInset>
      <SidebarTrigger />
      <SidebarResizeTrigger />
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
    </Sidebar>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Sidebar :class="classes.demo">
      <SidebarPanel :class="classes.customPanel">
        <SidebarNavigation :accent-class="classes.customAccent" />
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const CustomSizes: Story = {
  render: renderStory(`
    <Sidebar :default-size="['14rem']" :class="classes.demo">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const CustomPanelId: Story = {
  render: renderStory(`
    <Sidebar panel-id="navigation" :class="classes.demo">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const WithScrollArea: Story = {
  render: renderStory(`
    <Sidebar :class="classes.demo">
      <SidebarPanel>
        <SidebarHeader>
          <div :class="classes.brand">
            <span :class="classes.brandMark" data-sidebar-icon>M</span>
            <SidebarLabel>Moduix</SidebarLabel>
          </div>
        </SidebarHeader>
        <SidebarContent :class="classes.scrollAreaContent">
          <ScrollArea fade :class="classes.sidebarScrollArea">
            <ScrollAreaViewport>
              <ScrollAreaContent><ScrollAreaNavigation /></ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter>
          <SidebarNavigationList>
            <SidebarNavigationItem><AccountMenu /></SidebarNavigationItem>
          </SidebarNavigationList>
        </SidebarFooter>
      </SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const PersistedWidthRecipe: Story = {
  render: renderStory('<PersistedSidebarLayout />'),
};