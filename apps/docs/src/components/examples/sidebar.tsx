import { createListCollection } from '@ark-ui/react/collection';
import {
  Avatar,
  Collapsible,
  Menu,
  ScrollArea,
  Select,
  Sidebar,
  Tooltip,
  useSidebar,
} from '@moduix/react';
import {
  BarChart3 as BarChartIcon,
  Bell as BellIcon,
  CalendarDays as CalendarIcon,
  ChevronsUpDown as ChevronUpDownIcon,
  CircleHelp as HelpIcon,
  FileSearch as FileSearchIcon,
  FileText as FileTextIcon,
  FolderOpen as FolderIcon,
  Gauge as DashboardIcon,
  History as HistoryIcon,
  LogOut as LogOutIcon,
  MessageSquare as MessagesIcon,
  PanelRight as PanelRightIcon,
  Pencil as PencilIcon,
  RotateCcw as RestartIcon,
  Search as SearchIcon,
  Settings as SettingsIcon,
  SlidersHorizontal as ControlsIcon,
  Users as UsersIcon,
} from 'lucide-react';
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './sidebar.module.css';

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

const scrollAreaProjects = [
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
];

const sidebarCssDefaults = {
  '--sidebar-accent-bg': 'var(--color-accent)',
  '--sidebar-accent-color': 'var(--color-accent-foreground)',
  '--sidebar-active-font-weight': 'var(--weight-medium)',
  '--sidebar-bg': 'var(--color-card)',
  '--sidebar-border-color': 'var(--color-border)',
  '--sidebar-border-width': 'var(--border-width-sm)',
  '--sidebar-collapsed-item-size': 'var(--size-md)',
  '--sidebar-collapsed-padding-x': 'var(--spacing-1)',
  '--sidebar-color': 'var(--color-card-foreground)',
  '--sidebar-disabled-opacity': 'var(--opacity-disabled)',
  '--sidebar-focus-ring-color': 'var(--color-ring)',
  '--sidebar-focus-ring-offset': 'var(--spacing-1)',
  '--sidebar-focus-ring-width': 'var(--border-width-md)',
  '--sidebar-gap': 'var(--spacing-2)',
  '--sidebar-group-gap': 'var(--spacing-1)',
  '--sidebar-group-label-font-size': 'var(--text-xs)',
  '--sidebar-group-label-font-weight': 'var(--weight-medium)',
  '--sidebar-group-label-line-height': 'var(--line-height-text-xs)',
  '--sidebar-group-label-padding-x': 'var(--spacing-2)',
  '--sidebar-group-label-text-transform': 'none',
  '--sidebar-group-padding': 'var(--spacing-3)',
  '--sidebar-header-footer-padding': 'var(--spacing-3)',
  '--sidebar-height': '100dvh',
  '--sidebar-icon-size': '1rem',
  '--sidebar-inset-bg': 'var(--color-background)',
  '--sidebar-inset-color': 'var(--color-foreground)',
  '--sidebar-menu-button-border-width': '0',
  '--sidebar-menu-button-font-size': 'var(--text-sm)',
  '--sidebar-menu-button-font-size-sm': 'var(--text-xs)',
  '--sidebar-menu-button-gap': 'var(--spacing-2)',
  '--sidebar-menu-button-height': 'var(--size-md)',
  '--sidebar-menu-button-height-lg': 'var(--size-lg)',
  '--sidebar-menu-button-height-sm': 'var(--size-sm)',
  '--sidebar-menu-button-line-height': 'var(--line-height-text-sm)',
  '--sidebar-menu-button-padding-x': 'var(--spacing-2)',
  '--sidebar-menu-button-padding-y': 'var(--spacing-1)',
  '--sidebar-menu-button-radius': 'var(--radius-md)',
  '--sidebar-menu-gap': 'var(--spacing-1)',
  '--sidebar-menu-sub-border-width': 'var(--border-width-sm)',
  '--sidebar-menu-sub-button-font-size': 'var(--text-sm)',
  '--sidebar-menu-sub-button-gap': 'var(--spacing-2)',
  '--sidebar-menu-sub-button-height': 'var(--size-sm)',
  '--sidebar-menu-sub-button-line-height': 'var(--line-height-text-sm)',
  '--sidebar-menu-sub-button-padding-x': 'var(--spacing-2)',
  '--sidebar-menu-sub-margin-x': 'var(--spacing-4)',
  '--sidebar-menu-sub-margin-y': 'var(--spacing-1)',
  '--sidebar-menu-sub-padding-x': 'var(--spacing-2)',
  '--sidebar-min-height': '24rem',
  '--sidebar-muted-color': 'var(--color-muted-foreground)',
  '--sidebar-radius': '0',
  '--sidebar-resize-color-dragging':
    'color-mix(in oklab, var(--color-border) 72%, var(--color-muted-foreground))',
  '--sidebar-resize-color-focus':
    'color-mix(in oklab, var(--color-border) 72%, var(--color-muted-foreground))',
  '--sidebar-resize-color-hover':
    'color-mix(in oklab, var(--color-border) 72%, var(--color-muted-foreground))',
  '--sidebar-resize-hit-area': '0.75rem',
  '--sidebar-section-border-width': '0',
  '--sidebar-shadow': 'none',
  '--sidebar-transition': 'var(--transition-default)',
  '--sidebar-trigger-bg': 'var(--color-background)',
  '--sidebar-trigger-border-color': 'var(--color-border)',
  '--sidebar-trigger-border-width': 'var(--border-width-sm)',
  '--sidebar-trigger-offset-y': 'var(--spacing-4)',
  '--sidebar-trigger-radius': 'var(--radius-full)',
  '--sidebar-trigger-shadow': 'var(--shadow-sm)',
  '--sidebar-trigger-size': '1.75rem',
  '--sidebar-width': '100%',
} satisfies Record<`--sidebar-${string}`, string>;

export const sidebarOverrideCssProperties: CssProperty[] = Object.entries(sidebarCssDefaults).map(
  ([name, defaultValue]) => ({
    name: name as `--${string}`,
    defaultValue,
    description: `Controls the Sidebar ${name.slice('--sidebar-'.length).replaceAll('-', ' ')}.`,
  }),
);

export const sidebarInteractiveCode = `
import {
  ChevronsUpDown,
  FileText,
  FolderOpen,
  Gauge,
  LogOut,
  Pencil,
  RotateCcw,
} from "lucide-react";
import {
  Avatar,
  Collapsible,
  Menu,
  Sidebar,
  Tooltip,
  useSidebar,
} from "@moduix/react";

function SidebarNavigation() {
  const { collapsed, side } = useSidebar();
  const tooltipPlacement = side === "left" ? "right" : "left";

  return (
    <>
      <Sidebar.Header>
        <div className="app-brand">
          <strong className="app-brand-mark" data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Tooltip
                disabled={!collapsed}
                openDelay={200}
                closeDelay={0}
                positioning={{ placement: tooltipPlacement, gutter: 8 }}
              >
                <Tooltip.Trigger asChild>
                  <Sidebar.MenuButton asChild active>
                    <a href="/overview">
                      <Gauge />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>
                    Overview
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Collapsible defaultOpen className="app-collapsible">
                <Tooltip
                  disabled={!collapsed}
                  openDelay={200}
                  closeDelay={0}
                  positioning={{ placement: tooltipPlacement, gutter: 8 }}
                >
                  <Tooltip.Trigger asChild>
                    <Collapsible.Trigger asChild>
                      <Sidebar.MenuButton>
                        <FolderOpen />
                        <Sidebar.Label>Projects</Sidebar.Label>
                        <Collapsible.Indicator />
                      </Sidebar.MenuButton>
                    </Collapsible.Trigger>
                  </Tooltip.Trigger>
                  <Tooltip.Positioner>
                    <Tooltip.Content>
                      Projects
                      <Tooltip.Arrow />
                    </Tooltip.Content>
                  </Tooltip.Positioner>
                </Tooltip>
                <Collapsible.Content>
                  <Sidebar.MenuSub>
                    <Sidebar.MenuSubItem>
                      <Sidebar.MenuSubButton href="/projects/website">
                        Website
                      </Sidebar.MenuSubButton>
                    </Sidebar.MenuSubItem>
                  </Sidebar.MenuSub>
                </Collapsible.Content>
              </Collapsible>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Tooltip
                disabled={!collapsed}
                openDelay={200}
                closeDelay={0}
                positioning={{ placement: tooltipPlacement, gutter: 8 }}
              >
                <Tooltip.Trigger asChild>
                  <Sidebar.MenuButton asChild>
                    <a href="/documents">
                      <FileText />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>
                    Documents
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Menu positioning={{ placement: "right-end", gutter: 8, flip: false }}>
              <Menu.Trigger asChild>
                <Sidebar.MenuButton
                  size="lg"
                  aria-label="Open account menu"
                  title="Account"
                  className="app-account-button"
                >
                  <Avatar size="sm" data-sidebar-icon>
                    <Avatar.Fallback>AM</Avatar.Fallback>
                  </Avatar>
                  <Sidebar.Label className="app-account-meta">
                    <strong>Alex Morgan</strong>
                    <span>alex@acme.dev</span>
                  </Sidebar.Label>
                  <Sidebar.Label className="app-account-chevron">
                    <ChevronsUpDown />
                  </Sidebar.Label>
                </Sidebar.MenuButton>
              </Menu.Trigger>
              <Menu.Positioner>
                <Menu.Content className="app-account-menu">
                  <Menu.Item value="profile">
                    <Pencil />
                    Profile
                  </Menu.Item>
                  <Menu.Item value="settings">
                    <RotateCcw />
                    Settings
                  </Menu.Item>
                  <Menu.Separator />
                  <Menu.Item value="sign-out" tone="destructive">
                    <LogOut />
                    Sign out
                  </Menu.Item>
                </Menu.Content>
              </Menu.Positioner>
            </Menu>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Footer>
    </>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
`;

export const sidebarExampleCss = `
.app-sidebar {
  --sidebar-width: min(64rem, 100%);
  --sidebar-height: 34rem;
  --sidebar-min-height: 28rem;
  --sidebar-radius: var(--radius-lg);
  --sidebar-shadow: var(--shadow-sm);
}

.app-sidebar [data-slot="sidebar-content"] {
  scrollbar-color: var(--color-border) transparent;
  scrollbar-width: thin;
}

.app-brand {
  display: flex;
  align-items: center;
  gap: var(--spacing-2);
  min-width: 0;
}

.app-brand-mark {
  display: grid;
  place-items: center;
  width: var(--size-sm);
  height: var(--size-sm);
  border-radius: var(--radius-sm);
  background-color: var(--color-primary);
  color: var(--color-primary-foreground);
  font-size: var(--text-xs);
}

.app-workspace-mark {
  display: grid;
  place-items: center;
  width: var(--size-sm);
  height: var(--size-sm);
  border-radius: var(--radius-sm);
  background-color: var(--color-accent);
  font-size: var(--text-xs);
}

.app-collapsible {
  --collapsible-width: 100%;
  --collapsible-max-width: 100%;
  --collapsible-color: inherit;
  --collapsible-content-color: inherit;
}

.app-account-button {
  height: auto;
}

.app-account-meta {
  display: grid;
  flex: 1;
  text-align: start;
}

.app-account-meta > strong,
.app-account-meta > span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-account-meta > span {
  color: var(--color-muted-foreground);
  font-size: var(--text-xs);
}

.app-account-chevron {
  display: inline-flex;
  margin-inline-start: auto;
}

.app-account-menu {
  --menu-popup-min-width: 14rem;
  --menu-popup-max-width: 18rem;
}

.app-account-menu [data-part="item"] > svg {
  flex: none;
  width: 1rem;
  height: 1rem;
}

.app-topbar {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
  min-height: 3.5rem;
  padding-inline: var(--spacing-6);
  border-block-end: var(--border-width-sm) solid var(--color-border);
}

.app-main {
  padding: var(--spacing-6);
}
`;

export const sidebarSimpleCss = `
.app-sidebar {
  --sidebar-width: min(64rem, 100%);
  --sidebar-height: 34rem;
  --sidebar-min-height: 28rem;
  --sidebar-radius: var(--radius-lg);
  --sidebar-shadow: var(--shadow-sm);
}

.app-sidebar [data-slot="sidebar-content"] {
  scrollbar-color: var(--color-border) transparent;
  scrollbar-width: thin;
}

.app-topbar {
  min-height: 3.5rem;
  padding-inline: var(--spacing-6);
  border-block-end: var(--border-width-sm) solid var(--color-border);
}

.app-main {
  padding: var(--spacing-6);
}
`;

export const sidebarRightCode = `
import {
  FileSearch,
  History,
  MessageSquare,
  PanelRight,
  Settings,
  SlidersHorizontal,
} from "lucide-react";
import { Menu, Sidebar } from "@moduix/react";

export function RightSidebar() {
  return (
    <Sidebar side="right" className="app-sidebar">
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Main content</main>
      </Sidebar.Inset>
      <Sidebar.Trigger />
      <Sidebar.ResizeTrigger />
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>IN</strong>
          <Sidebar.Label>Inspector</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Tools</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton active>
                  <PanelRight />
                  <Sidebar.Label>Properties</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <SlidersHorizontal />
                  <Sidebar.Label>Appearance</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <FileSearch />
                  <Sidebar.Label>Accessibility</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Activity</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <History />
                  <Sidebar.Label>Version history</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <MessageSquare />
                  <Sidebar.Label>Comments</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Menu positioning={{ placement: "right-end", gutter: 8, flip: false }}>
            <Menu.Trigger asChild>
              <Sidebar.MenuButton>
                <Settings />
                <Sidebar.Label>Inspector settings</Sidebar.Label>
              </Sidebar.MenuButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="preferences">Preferences</Menu.Item>
                <Menu.Item value="shortcuts">Keyboard shortcuts</Menu.Item>
                <Menu.Item value="reset">Reset panels</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
    </Sidebar>
  );
}
`;

export const sidebarSimpleCode = `
import { FileText, Gauge } from "lucide-react";
import { Sidebar, Tooltip, useSidebar } from "@moduix/react";

function Navigation() {
  const { collapsed, side } = useSidebar();
  const placement = side === "left" ? "right" : "left";

  return (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <Tooltip disabled={!collapsed} positioning={{ placement, gutter: 8 }}>
            <Tooltip.Trigger asChild>
              <Sidebar.MenuButton asChild active>
                <a href="/overview">
                  <Gauge />
                  <Sidebar.Label>Overview</Sidebar.Label>
                </a>
              </Sidebar.MenuButton>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content>Overview</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip>
        </Sidebar.MenuItem>
        <Sidebar.MenuItem>
          <Tooltip disabled={!collapsed} positioning={{ placement, gutter: 8 }}>
            <Tooltip.Trigger asChild>
              <Sidebar.MenuButton asChild>
                <a href="/documents">
                  <FileText />
                  <Sidebar.Label>Documents</Sidebar.Label>
                </a>
              </Sidebar.MenuButton>
            </Tooltip.Trigger>
            <Tooltip.Positioner>
              <Tooltip.Content>Documents</Tooltip.Content>
            </Tooltip.Positioner>
          </Tooltip>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Group>
  );
}

export function AppSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content>
          <Navigation />
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
`;

export const sidebarWorkspaceSelectCode = `
import { createListCollection } from "@ark-ui/react/collection";
import {
  BarChart3,
  Bell,
  CalendarDays,
  FileText,
  Gauge,
  LogOut,
  Settings,
  Users,
} from "lucide-react";
import { Avatar, Menu, Select, Sidebar } from "@moduix/react";

const workspaces = createListCollection({
  items: [
    { label: "Acme Inc.", value: "acme" },
    { label: "Northstar", value: "northstar" },
    { label: "Personal", value: "personal" },
  ],
});

export function WorkspaceSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Select
                collection={workspaces}
                defaultValue={["acme"]}
                positioning={{ placement: "right-start", gutter: 8, flip: false }}
              >
                <Select.Trigger asChild>
                  <Sidebar.MenuButton size="lg" aria-label="Select workspace">
                    <span className="app-workspace-mark" data-sidebar-icon>AC</span>
                    <Sidebar.Label>
                      <Select.ValueText placeholder="Select workspace" />
                    </Sidebar.Label>
                    <Sidebar.Label>
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
                <Select.HiddenSelect />
              </Select>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild active>
                  <a href="/overview">
                    <Gauge />
                    <Sidebar.Label>Overview</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/calendar">
                    <CalendarDays />
                    <Sidebar.Label>Calendar</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/team">
                    <Users />
                    <Sidebar.Label>Team</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Library</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/documents">
                    <FileText />
                    <Sidebar.Label>Documents</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/analytics">
                    <BarChart3 />
                    <Sidebar.Label>Analytics</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/notifications">
                    <Bell />
                    <Sidebar.Label>Notifications</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton asChild>
                  <a href="/settings">
                    <Settings />
                    <Sidebar.Label>Settings</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Menu positioning={{ placement: "right-end", gutter: 8, flip: false }}>
            <Menu.Trigger asChild>
              <Sidebar.MenuButton size="lg" aria-label="Open account menu">
                <Avatar size="sm" data-sidebar-icon>
                  <Avatar.Fallback>AM</Avatar.Fallback>
                </Avatar>
                <Sidebar.Label className="app-account-meta">
                  <strong>Alex Morgan</strong>
                  <span>alex@acme.dev</span>
                </Sidebar.Label>
              </Sidebar.MenuButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="profile">Profile</Menu.Item>
                <Menu.Item value="settings">Account settings</Menu.Item>
                <Menu.Separator />
                <Menu.Item value="sign-out" tone="destructive">
                  <LogOut />
                  Sign out
                </Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Workspace content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
`;

export const sidebarCustomSizesCode = `
import {
  BarChart3,
  FileText,
  FolderOpen,
  Gauge,
  MessageSquare,
  Settings,
} from "lucide-react";
import { Menu, Sidebar } from "@moduix/react";

const panels = [
  {
    id: "sidebar",
    minSize: "10rem",
    maxSize: "17rem",
    collapsible: true,
    collapsedSize: "3rem",
  },
  { id: "content" },
];

export function SizedSidebar() {
  return (
    <Sidebar panels={panels} defaultSize={["14rem"]} className="app-sidebar">
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
                <Sidebar.MenuButton active>
                  <Gauge />
                  <Sidebar.Label>Overview</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <FolderOpen />
                  <Sidebar.Label>Projects</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <FileText />
                  <Sidebar.Label>Documents</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
          <Sidebar.Group>
            <Sidebar.GroupLabel>Insights</Sidebar.GroupLabel>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <BarChart3 />
                  <Sidebar.Label>Analytics</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>
                  <MessageSquare />
                  <Sidebar.Label>Messages</Sidebar.Label>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Group>
        </Sidebar.Content>
        <Sidebar.Footer>
          <Menu positioning={{ placement: "right-end", gutter: 8, flip: false }}>
            <Menu.Trigger asChild>
              <Sidebar.MenuButton>
                <Settings />
                <Sidebar.Label>Settings</Sidebar.Label>
              </Sidebar.MenuButton>
            </Menu.Trigger>
            <Menu.Positioner>
              <Menu.Content>
                <Menu.Item value="workspace">Workspace settings</Menu.Item>
                <Menu.Item value="members">Manage members</Menu.Item>
                <Menu.Item value="billing">Billing</Menu.Item>
              </Menu.Content>
            </Menu.Positioner>
          </Menu>
        </Sidebar.Footer>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Resize between 10rem and 17rem.</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
`;

export const sidebarScrollAreaCode = `
import { FileText, FolderOpen, Gauge } from "lucide-react";
import { ScrollArea, Sidebar } from "@moduix/react";

const projects = [
  "Website",
  "Mobile app",
  "Design system",
  "Marketing",
  "Internal tools",
  "Customer portal",
  "Analytics",
  "Documentation",
  "Onboarding",
  "Research",
  "Experiments",
  "Archive",
];

export function ScrollableSidebar() {
  return (
    <Sidebar className="app-sidebar">
      <Sidebar.Panel>
        <Sidebar.Header>
          <strong data-sidebar-icon>M</strong>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </Sidebar.Header>
        <Sidebar.Content className="app-sidebar-scroll-content">
          <ScrollArea fade className="app-sidebar-scroll-area">
            <ScrollArea.Viewport>
              <ScrollArea.Content>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton active>
                        <Gauge />
                        <Sidebar.Label>Overview</Sidebar.Label>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                    <Sidebar.MenuItem>
                      <Sidebar.MenuButton>
                        <FolderOpen />
                        <Sidebar.Label>Projects</Sidebar.Label>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  </Sidebar.Menu>
                </Sidebar.Group>
                <Sidebar.Group>
                  <Sidebar.GroupLabel>Recent projects</Sidebar.GroupLabel>
                  <Sidebar.Menu>
                    {projects.map((project) => (
                      <Sidebar.MenuItem key={project}>
                        <Sidebar.MenuButton>
                          <FileText />
                          <Sidebar.Label>{project}</Sidebar.Label>
                        </Sidebar.MenuButton>
                      </Sidebar.MenuItem>
                    ))}
                  </Sidebar.Menu>
                </Sidebar.Group>
              </ScrollArea.Content>
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar>
              <ScrollArea.Thumb />
            </ScrollArea.Scrollbar>
          </ScrollArea>
        </Sidebar.Content>
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <header className="app-topbar">Dashboard</header>
        <main className="app-main">Main content</main>
      </Sidebar.Inset>
    </Sidebar>
  );
}
`;

export const sidebarScrollAreaCss = `${sidebarSimpleCss}
.app-sidebar-scroll-content {
  overflow: hidden;
}

.app-sidebar-scroll-area {
  --scroll-area-radius: 0;
}

[data-slot="sidebar-panel"][data-state="collapsed"]
  .app-sidebar-scroll-area
  [data-slot="scroll-area-scrollbar"] {
  display: none;
}
`;

export const sidebarCustomCss = `
.app-sidebar {
  --sidebar-bg: color-mix(in oklab, var(--color-primary) 5%, var(--color-card));
  --sidebar-accent-bg: color-mix(in oklab, var(--color-primary) 14%, var(--color-accent));
  --sidebar-border-color: color-mix(in oklab, var(--color-primary) 28%, var(--color-border));
}
`;

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
          <Sidebar.Label className={styles.accountChevron}>
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
      <Select.HiddenSelect />
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
          <Sidebar.Label className={styles.accountChevron}>
            <ChevronUpDownIcon />
          </Sidebar.Label>
        </Sidebar.MenuButton>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content className={styles.accountMenu}>
          <Menu.Item value="profile">
            <PencilIcon />
            Profile
          </Menu.Item>
          <Menu.Item value="settings">
            <RestartIcon />
            Settings
          </Menu.Item>
          <Menu.Separator />
          <Menu.Item value="sign-out" tone="destructive">
            <LogOutIcon />
            Sign out
          </Menu.Item>
        </Menu.Content>
      </Menu.Positioner>
    </Menu>
  );
}

function SimpleSidebarNavigation() {
  const { collapsed, side } = useSidebar();
  const tooltipPlacement = side === 'left' ? 'right' : 'left';

  return (
    <>
      <Sidebar.Header>
        <div className={styles.brand}>
          <span className={styles.brandMark} data-sidebar-icon>
            M
          </span>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Tooltip
                disabled={!collapsed}
                positioning={{ placement: tooltipPlacement, gutter: 8 }}
              >
                <Tooltip.Trigger asChild>
                  <Sidebar.MenuButton asChild active>
                    <a href="#overview">
                      <DashboardIcon />
                      <Sidebar.Label>Overview</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>Overview</Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Tooltip
                disabled={!collapsed}
                positioning={{ placement: tooltipPlacement, gutter: 8 }}
              >
                <Tooltip.Trigger asChild>
                  <Sidebar.MenuButton asChild>
                    <a href="#documents">
                      <FileTextIcon />
                      <Sidebar.Label>Documents</Sidebar.Label>
                    </a>
                  </Sidebar.MenuButton>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>Documents</Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
    </>
  );
}

function RightSidebarPanel() {
  return (
    <>
      <Sidebar.Header>
        <div className={styles.brand}>
          <span className={styles.workspaceMark} data-sidebar-icon>
            IN
          </span>
          <Sidebar.Label>Inspector</Sidebar.Label>
        </div>
      </Sidebar.Header>
      <Sidebar.Content>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Properties</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton active>
                <PanelRightIcon />
                <Sidebar.Label>Layout</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <ControlsIcon />
                <Sidebar.Label>Appearance</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <FileSearchIcon />
                <Sidebar.Label>Accessibility</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <BarChartIcon />
                <Sidebar.Label>Performance</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <FileTextIcon />
                <Sidebar.Label>Design tokens</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
        <Sidebar.Group>
          <Sidebar.GroupLabel>Activity</Sidebar.GroupLabel>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <HistoryIcon />
                <Sidebar.Label>Version history</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <MessagesIcon />
                <Sidebar.Label>Comments</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <BellIcon />
                <Sidebar.Label>Notifications</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <UsersIcon />
                <Sidebar.Label>Collaborators</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <SearchIcon />
                <Sidebar.Label>Event log</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                <FileTextIcon />
                <Sidebar.Label>Exports</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Group>
      </Sidebar.Content>
      <Sidebar.Footer>
        <Menu positioning={{ placement: 'right-end', gutter: 8, flip: false }}>
          <Menu.Trigger asChild>
            <Sidebar.MenuButton>
              <SettingsIcon />
              <Sidebar.Label>Inspector settings</Sidebar.Label>
            </Sidebar.MenuButton>
          </Menu.Trigger>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item value="preferences">Preferences</Menu.Item>
              <Menu.Item value="shortcuts">Keyboard shortcuts</Menu.Item>
              <Menu.Item value="reset">Reset panels</Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Menu>
      </Sidebar.Footer>
    </>
  );
}

function NavigationContent() {
  const { collapsed, side } = useSidebar();
  const tooltipPlacement = side === 'left' ? 'right' : 'left';

  return (
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Workspace</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Tooltip
              disabled={!collapsed}
              openDelay={200}
              closeDelay={0}
              positioning={{ placement: tooltipPlacement, gutter: 8 }}
            >
              <Tooltip.Trigger asChild>
                <Sidebar.MenuButton asChild active>
                  <a href="#overview">
                    <DashboardIcon />
                    <Sidebar.Label>Overview</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content>
                  Overview
                  <Tooltip.Arrow />
                </Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Collapsible defaultOpen className={styles.collapsible}>
              <Tooltip
                disabled={!collapsed}
                openDelay={200}
                closeDelay={0}
                positioning={{ placement: tooltipPlacement, gutter: 8 }}
              >
                <Tooltip.Trigger asChild>
                  <Collapsible.Trigger asChild>
                    <Sidebar.MenuButton>
                      <FolderIcon />
                      <Sidebar.Label>Projects</Sidebar.Label>
                      <Collapsible.Indicator />
                    </Sidebar.MenuButton>
                  </Collapsible.Trigger>
                </Tooltip.Trigger>
                <Tooltip.Positioner>
                  <Tooltip.Content>
                    Projects
                    <Tooltip.Arrow />
                  </Tooltip.Content>
                </Tooltip.Positioner>
              </Tooltip>
              <Collapsible.Content>
                <Sidebar.MenuSub>
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton href="#website">Website</Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton href="#mobile">Mobile app</Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton href="#design-system">
                      Design system
                    </Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                  <Sidebar.MenuSubItem>
                    <Sidebar.MenuSubButton href="#marketing">Marketing</Sidebar.MenuSubButton>
                  </Sidebar.MenuSubItem>
                </Sidebar.MenuSub>
              </Collapsible.Content>
            </Collapsible>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Tooltip disabled={!collapsed} positioning={{ placement: tooltipPlacement, gutter: 8 }}>
              <Tooltip.Trigger asChild>
                <Sidebar.MenuButton asChild>
                  <a href="#calendar">
                    <CalendarIcon />
                    <Sidebar.Label>Calendar</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content>Calendar</Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Tooltip disabled={!collapsed} positioning={{ placement: tooltipPlacement, gutter: 8 }}>
              <Tooltip.Trigger asChild>
                <Sidebar.MenuButton asChild>
                  <a href="#team">
                    <UsersIcon />
                    <Sidebar.Label>Team</Sidebar.Label>
                  </a>
                </Sidebar.MenuButton>
              </Tooltip.Trigger>
              <Tooltip.Positioner>
                <Tooltip.Content>Team</Tooltip.Content>
              </Tooltip.Positioner>
            </Tooltip>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Library</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild>
              <a href="#documents">
                <FileTextIcon />
                <Sidebar.Label>Documents</Sidebar.Label>
              </a>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild>
              <a href="#analytics">
                <BarChartIcon />
                <Sidebar.Label>Analytics</Sidebar.Label>
              </a>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild>
              <a href="#messages">
                <MessagesIcon />
                <Sidebar.Label>Messages</Sidebar.Label>
              </a>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild>
              <a href="#notifications">
                <BellIcon />
                <Sidebar.Label>Notifications</Sidebar.Label>
              </a>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild>
              <a href="#search">
                <SearchIcon />
                <Sidebar.Label>Search</Sidebar.Label>
              </a>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Manage</Sidebar.GroupLabel>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild>
              <a href="#settings">
                <SettingsIcon />
                <Sidebar.Label>Settings</Sidebar.Label>
              </a>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton asChild>
              <a href="#help">
                <HelpIcon />
                <Sidebar.Label>Help & support</Sidebar.Label>
              </a>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
    </Sidebar.Content>
  );
}

function SidebarNavigation() {
  return (
    <>
      <Sidebar.Header>
        <div className={styles.brand}>
          <span className={styles.brandMark} data-sidebar-icon>
            M
          </span>
          <Sidebar.Label>Moduix</Sidebar.Label>
        </div>
      </Sidebar.Header>
      <NavigationContent />
      <Sidebar.Footer>
        <Sidebar.Menu>
          <Sidebar.MenuItem>
            <AccountMenu />
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Footer>
    </>
  );
}

function MainContent() {
  return (
    <>
      <div className={styles.topbar}>
        <strong>Dashboard</strong>
      </div>
      <main className={styles.main}>
        <h3>Overview</h3>
        <p>Resize with the divider or collapse the navigation from the trigger.</p>
        <div className={styles.canvas} />
      </main>
    </>
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
              <DashboardIcon />
              <Sidebar.Label>Overview</Sidebar.Label>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
          <Sidebar.MenuItem>
            <Sidebar.MenuButton>
              <FolderIcon />
              <Sidebar.Label>Projects</Sidebar.Label>
            </Sidebar.MenuButton>
          </Sidebar.MenuItem>
        </Sidebar.Menu>
      </Sidebar.Group>
      <Sidebar.Group>
        <Sidebar.GroupLabel>Recent projects</Sidebar.GroupLabel>
        <Sidebar.Menu>
          {scrollAreaProjects.map((project) => (
            <Sidebar.MenuItem key={project}>
              <Sidebar.MenuButton>
                <FileTextIcon />
                <Sidebar.Label>{project}</Sidebar.Label>
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          ))}
        </Sidebar.Menu>
      </Sidebar.Group>
    </>
  );
}

export function BasicSidebarExample() {
  return (
    <Sidebar className={styles.demo}>
      <Sidebar.Panel>
        <SimpleSidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <MainContent />
      </Sidebar.Inset>
    </Sidebar>
  );
}

export function RightSidebarExample() {
  return (
    <Sidebar side="right" className={styles.demo}>
      <Sidebar.Inset>
        <MainContent />
      </Sidebar.Inset>
      <Sidebar.Trigger />
      <Sidebar.ResizeTrigger />
      <Sidebar.Panel>
        <RightSidebarPanel />
      </Sidebar.Panel>
    </Sidebar>
  );
}

export function CustomStylingSidebarExample() {
  return (
    <Sidebar className={`${styles.demo} ${styles.custom}`}>
      <Sidebar.Panel>
        <SimpleSidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <MainContent />
      </Sidebar.Inset>
    </Sidebar>
  );
}

export function InteractiveSidebarExample() {
  return (
    <Sidebar className={styles.demo}>
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <MainContent />
      </Sidebar.Inset>
    </Sidebar>
  );
}

export function WorkspaceSelectSidebarExample() {
  return (
    <Sidebar className={styles.demo}>
      <Sidebar.Panel>
        <Sidebar.Header>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <WorkspaceSelect />
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Header>
        <NavigationContent />
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
        <MainContent />
      </Sidebar.Inset>
    </Sidebar>
  );
}

export function CustomSizesSidebarExample() {
  return (
    <Sidebar panels={customPanels} defaultSize={['14rem']} className={styles.demo}>
      <Sidebar.Panel>
        <SidebarNavigation />
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <MainContent />
      </Sidebar.Inset>
    </Sidebar>
  );
}

export function ScrollAreaSidebarExample() {
  return (
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
      </Sidebar.Panel>
      <Sidebar.ResizeTrigger />
      <Sidebar.Trigger />
      <Sidebar.Inset>
        <MainContent />
      </Sidebar.Inset>
    </Sidebar>
  );
}

export function SidebarCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={sidebarOverrideCssProperties} />;
}