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
  useSidebar,
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
} from '@/lib/moduix/icons/ui/Icons';
import styles from './Sidebar.stories.module.css';

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;
type SidebarSize = NonNullable<SidebarProps['size']>;

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
  setup() {
    return { styles, workspaces };
  },
  template: `
    <Select
      :class="styles.workspaceSelect"
      :collection="workspaces"
      :default-value="['acme']"
      :positioning="{ placement: 'right-start', gutter: 8, flip: false }"
    >
      <SelectTrigger as-child>
        <SidebarNavigationButton size="lg" aria-label="Select workspace" title="Workspace">
          <span :class="styles.workspaceMark" data-sidebar-icon>AC</span>
          <SidebarLabel :class="styles.accountMeta">
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
  setup() {
    return { styles };
  },
  template: `
    <Menu :positioning="{ placement: 'right-end', gutter: 8, flip: false }">
      <MenuTrigger as-child>
        <SidebarNavigationButton
          size="lg"
          aria-label="Open account menu"
          title="Account"
          :class="styles.accountButton"
        >
          <Avatar size="sm" data-sidebar-icon><AvatarFallback>AM</AvatarFallback></Avatar>
          <SidebarLabel :class="styles.accountMeta">
            <strong>Alex Morgan</strong>
            <span>alex@acme.dev</span>
          </SidebarLabel>
          <MenuIndicator><ChevronUpDownIcon /></MenuIndicator>
        </SidebarNavigationButton>
      </MenuTrigger>
      <MenuPositioner>
        <MenuContent :class="styles.accountMenu">
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
  setup() {
    const sidebar = useSidebar();
    return { collapsed: sidebar.collapsed, styles };
  },
  template: `
    <SidebarHeader>
      <div :class="styles.headerStack" :style="{ width: collapsed ? 'auto' : undefined }">
        <div :class="styles.brand">
          <span :class="styles.brandMark" data-sidebar-icon>M</span>
          <SidebarLabel>Moduix</SidebarLabel>
        </div>
        <SidebarInput aria-label="Search workspace" placeholder="Search" size="sm" />
      </div>
    </SidebarHeader>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupHeader>
          <SidebarGroupLabel>Workspace</SidebarGroupLabel>
          <SidebarGroupAction aria-label="Create workspace item" title="Create workspace item">
            <PlusIcon />
          </SidebarGroupAction>
        </SidebarGroupHeader>
        <SidebarNavigationList>
          <SidebarNavigationItem>
            <SidebarTooltip content="Overview">
              <SidebarNavigationButton active as-child>
                <a href="#overview"><FolderIcon /><SidebarLabel>Overview</SidebarLabel></a>
              </SidebarNavigationButton>
            </SidebarTooltip>
            <SidebarNavigationBadge>12</SidebarNavigationBadge>
          </SidebarNavigationItem>
          <SidebarNavigationItem>
            <SidebarExpandedContent>
              <Collapsible default-open :class="styles.collapsible">
                <SidebarTooltip content="Projects">
                  <CollapsibleTrigger as-child>
                    <SidebarNavigationButton>
                      <FolderIcon /><SidebarLabel>Projects</SidebarLabel><CollapsibleIndicator />
                    </SidebarNavigationButton>
                  </CollapsibleTrigger>
                </SidebarTooltip>
                <CollapsibleContent>
                  <SidebarNavigationSubList>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="#website">Website</SidebarNavigationSubButton>
                      <SidebarNavigationBadge>3</SidebarNavigationBadge>
                    </SidebarNavigationSubItem>
                    <SidebarNavigationSubItem>
                      <SidebarNavigationSubButton href="#mobile">Mobile app</SidebarNavigationSubButton>
                    </SidebarNavigationSubItem>
                  </SidebarNavigationSubList>
                </CollapsibleContent>
              </Collapsible>
            </SidebarExpandedContent>
            <SidebarCollapsedContent>
              <Menu :positioning="{ placement: 'right-start', gutter: 8, flip: false }">
                <MenuTrigger as-child>
                  <SidebarNavigationButton aria-label="Open projects" title="Projects">
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
              <SidebarNavigationButton as-child>
                <a href="#documents"><FileIcon /><SidebarLabel>Documents</SidebarLabel></a>
              </SidebarNavigationButton>
            </SidebarTooltip>
          </SidebarNavigationItem>
        </SidebarNavigationList>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter :class="styles.footerStack">
      <SidebarSeparator />
      <SidebarNavigationList>
        <SidebarNavigationItem><WorkspaceSelect /></SidebarNavigationItem>
        <SidebarNavigationItem><AccountMenu /></SidebarNavigationItem>
      </SidebarNavigationList>
    </SidebarFooter>
  `,
});

const SidebarMain = defineComponent({
  components: { Button },
  setup() {
    return { styles };
  },
  template: `
      <div :class="styles.topbar"><strong>Dashboard</strong></div>
      <main :class="styles.main">
        <h2>Overview</h2>
        <p>Resize with the divider or collapse the sidebar from the floating control.</p>
        <div :class="styles.placeholder" />
      </main>
  `,
});

const ScrollAreaNavigation = defineComponent({
  components: primitiveComponents,
  setup() {
    return {
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

    return { resetSize, size, styles, updateSize, persistSize };
  },
  template: `
    <Sidebar :size="size" :class="styles.demo" @resize="updateSize" @resize-end="persistSize">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset>
        <div :class="styles.topbar">
          <strong>Dashboard</strong>
          <Button variant="outline" size="sm" @click="resetSize">Reset saved width</Button>
        </div>
        <main :class="styles.main">
          <h2>Persisted width</h2>
          <p>Resize the sidebar and reload Storybook to restore the last desktop width.</p>
          <p>Saved width: {{ size[0] ?? '16rem' }}</p>
          <div :class="styles.placeholder" />
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
        return { args, styles };
      },
      template,
    });
}

export const Basic: Story = {
  render: renderStory(`
    <Sidebar v-bind="args" :class="styles.demo">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const RightSide: Story = {
  render: renderStory(`
    <Sidebar side="right" :class="styles.demo">
      <SidebarInset><SidebarMain /></SidebarInset>
      <SidebarTrigger />
      <SidebarResizeTrigger />
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
    </Sidebar>
  `),
};

export const CustomStyling: Story = {
  render: renderStory(`
    <Sidebar :class="[styles.demo, styles.custom]">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const CustomSizes: Story = {
  render: renderStory(`
    <Sidebar :default-size="['14rem']" :class="styles.demo">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const CustomPanelId: Story = {
  render: renderStory(`
    <Sidebar panel-id="navigation" :class="styles.demo">
      <SidebarPanel><SidebarNavigation /></SidebarPanel>
      <SidebarResizeTrigger />
      <SidebarTrigger />
      <SidebarInset><SidebarMain /></SidebarInset>
    </Sidebar>
  `),
};

export const WithScrollArea: Story = {
  render: renderStory(`
    <Sidebar :class="styles.demo">
      <SidebarPanel>
        <SidebarHeader>
          <div :class="styles.brand">
            <span :class="styles.brandMark" data-sidebar-icon>M</span>
            <SidebarLabel>Moduix</SidebarLabel>
          </div>
        </SidebarHeader>
        <SidebarContent :class="styles.scrollAreaContent">
          <ScrollArea fade :class="styles.sidebarScrollArea">
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