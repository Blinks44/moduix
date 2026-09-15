import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { Splitter as SplitterPrimitive } from '@ark-ui/solid/splitter';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui/Icons';
import { Input } from '../input';
import { Separator } from '../separator';
import { Splitter, type SplitterPanelData, useSplitterContext } from '../splitter';
import splitterStyles from '../splitter/Splitter.module.css';
import { Tooltip } from '../tooltip';
import styles from './Sidebar.module.css';

type SidebarSide = 'left' | 'right';
type SidebarConfig = {
  panelId: Accessor<string>;
  side: Accessor<SidebarSide>;
};
type SidebarRootProps = Omit<ComponentProps<typeof Splitter.Root>, 'orientation' | 'panels'> & {
  panelId?: string;
  side?: SidebarSide;
};
type SidebarPanelProps = Omit<ComponentProps<typeof Splitter.Panel>, 'id'>;
type SidebarResizeTriggerProps = Omit<ComponentProps<typeof Splitter.ResizeTrigger>, 'id'>;
type SidebarDefaultSize = ComponentProps<typeof Splitter.Root>['defaultSize'];
type SidebarTriggerProps = HTMLArkProps<'button'>;

const sidebarPanel = {
  id: 'sidebar',
  minSize: '3rem',
  maxSize: '18rem',
  collapsible: true,
  collapsedSize: '3rem',
} satisfies SplitterPanelData;

const contentPanel = { id: 'content' } satisfies SplitterPanelData;

const defaultPanelsBySide = {
  left: [sidebarPanel, contentPanel],
  right: [contentPanel, sidebarPanel],
} satisfies Record<SidebarSide, SplitterPanelData[]>;

const SidebarConfigContext = createContext<SidebarConfig>({
  panelId: () => 'sidebar',
  side: (): SidebarSide => 'left',
});

function getDefaultSidebarSize(side: SidebarSide): SidebarDefaultSize {
  if (side === 'left') {
    return ['16rem'];
  }

  const defaultSize: SidebarDefaultSize = [];
  defaultSize[1] = '16rem';
  return defaultSize;
}

function getDefaultPanels(side: SidebarSide, panelId: string) {
  const panels = defaultPanelsBySide[side];
  return panels.map((panel) => (panel.id === 'sidebar' ? { ...panel, id: panelId } : panel));
}

function toggleSidebarPanel(splitter: ReturnType<typeof useSplitterContext>, panelId: string) {
  if (splitter().isPanelCollapsed(panelId)) {
    splitter().expandPanel(panelId);
    return;
  }

  splitter().collapsePanel(panelId);
}

function useSidebarConfig() {
  const config = useContext(SidebarConfigContext);
  if (!config) {
    throw new Error('Sidebar components must be used within Sidebar.Root');
  }

  return config;
}

function SidebarRoot(props: SidebarRootProps) {
  const [local, others] = splitProps(props, ['class', 'defaultSize', 'panelId', 'side', 'style']);
  const panelId = () => local.panelId ?? 'sidebar';
  const side = () => local.side ?? 'left';

  return (
    <SidebarConfigContext.Provider value={{ panelId, side }}>
      <SplitterPrimitive.Root
        {...others}
        panels={getDefaultPanels(side(), panelId())}
        defaultSize={local.defaultSize ?? getDefaultSidebarSize(side())}
        orientation="horizontal"
        data-side={side()}
        data-slot="sidebar-root"
        class={clsx(splitterStyles.root, styles.root, local.class)}
        style={
          typeof local.style === 'string'
            ? `width:var(--moduix-splitter-width, 100%);height:var(--moduix-splitter-height, 28rem);${local.style}`
            : {
                width: 'var(--moduix-splitter-width, 100%)',
                height: 'var(--moduix-splitter-height, 28rem)',
                ...local.style,
              }
        }
      />
    </SidebarConfigContext.Provider>
  );
}

function useSidebar() {
  const config = useSidebarConfig();
  const splitter = useSplitterContext();
  const collapsed = () => splitter().isPanelCollapsed(config.panelId());

  return {
    collapsed,
    side: config.side,
    state: () => (collapsed() ? 'collapsed' : 'expanded'),
    toggleSidebar: () => toggleSidebarPanel(splitter, config.panelId()),
  };
}

function SidebarPanel(props: SidebarPanelProps) {
  const [local, others] = splitProps(props, ['class']);
  const config = useSidebarConfig();
  const splitter = useSplitterContext();
  const collapsed = () => splitter().isPanelCollapsed(config.panelId());

  return (
    <SplitterPrimitive.Panel
      {...others}
      id={config.panelId()}
      data-side={config.side()}
      data-slot="sidebar-panel"
      data-state={collapsed() ? 'collapsed' : 'expanded'}
      class={clsx(splitterStyles.panel, styles.panel, local.class)}
    />
  );
}

function SidebarInset(props: SidebarPanelProps) {
  const [local, others] = splitProps(props, ['class']);
  const config = useSidebarConfig();

  return (
    <SplitterPrimitive.Panel
      {...others}
      id="content"
      data-side={config.side()}
      data-slot="sidebar-inset"
      class={clsx(splitterStyles.panel, styles.inset, local.class)}
    />
  );
}

function SidebarResizeTrigger(props: SidebarResizeTriggerProps) {
  const [local, others] = splitProps(props, ['aria-label', 'asChild', 'class', 'children']);
  const config = useSidebarConfig();
  const id = (): NonNullable<ComponentProps<typeof Splitter.ResizeTrigger>['id']> =>
    (config.side() === 'left'
      ? `${config.panelId()}:content`
      : `content:${config.panelId()}`) as NonNullable<
      ComponentProps<typeof Splitter.ResizeTrigger>['id']
    >;

  return (
    <SplitterPrimitive.ResizeTrigger
      {...others}
      asChild={local.asChild}
      id={id()}
      aria-label={local['aria-label'] ?? 'Resize sidebar'}
      data-side={config.side()}
      data-slot="sidebar-resize-trigger"
      class={clsx(splitterStyles.resizeTrigger, styles.resizeTrigger, local.class)}
    >
      {local.children === undefined && !local.asChild ? (
        <Splitter.ResizeTriggerIndicator />
      ) : (
        local.children
      )}
    </SplitterPrimitive.ResizeTrigger>
  );
}

function SidebarTrigger(props: SidebarTriggerProps) {
  const [local, others] = splitProps(props, [
    'aria-label',
    'asChild',
    'children',
    'class',
    'onClick',
    'type',
  ]);
  const config = useSidebarConfig();
  const splitter = useSplitterContext();
  const collapsed = () => splitter().isPanelCollapsed(config.panelId());
  const handleClick = (event: MouseEvent) => {
    (local.onClick as ((event: MouseEvent) => void) | undefined)?.(event);
    if (event.defaultPrevented) return;

    toggleSidebarPanel(splitter, config.panelId());
  };

  return (
    <ark.button
      asChild={local.asChild}
      type={local.type ?? 'button'}
      aria-label={local['aria-label'] ?? 'Toggle sidebar'}
      aria-expanded={!collapsed()}
      data-scope="sidebar"
      data-part="trigger"
      data-side={config.side()}
      data-state={collapsed() ? 'collapsed' : 'expanded'}
      class={clsx(styles.trigger, local.class)}
      onClick={handleClick}
      {...others}
      data-slot="sidebar-trigger"
    >
      {local.children === undefined && !local.asChild ? <ChevronLeftIcon /> : local.children}
    </ark.button>
  );
}

function SidebarLabel(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-scope="sidebar"
      data-part="label"
      class={clsx(styles.label, local.class)}
      {...others}
      data-slot="sidebar-label"
    />
  );
}

function SidebarHeader(props: HTMLArkProps<'header'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.header
      data-scope="sidebar"
      data-part="header"
      class={clsx(styles.header, local.class)}
      {...others}
      data-slot="sidebar-header"
    />
  );
}

function SidebarContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="sidebar"
      data-part="content"
      class={clsx(styles.content, local.class)}
      {...others}
      data-slot="sidebar-content"
    />
  );
}

function SidebarExpandedContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);
  const { collapsed } = useSidebar();

  return (
    <ark.div
      data-scope="sidebar"
      data-part="expanded-content"
      class={local.class}
      {...others}
      data-slot="sidebar-expanded-content"
      hidden={collapsed()}
    />
  );
}

function SidebarCollapsedContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);
  const { collapsed } = useSidebar();

  return (
    <ark.div
      data-scope="sidebar"
      data-part="collapsed-content"
      class={local.class}
      {...others}
      data-slot="sidebar-collapsed-content"
      hidden={!collapsed()}
    />
  );
}

function SidebarFooter(props: HTMLArkProps<'footer'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.footer
      data-scope="sidebar"
      data-part="footer"
      class={clsx(styles.footer, local.class)}
      {...others}
      data-slot="sidebar-footer"
    />
  );
}

function SidebarGroup(props: HTMLArkProps<'section'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.section
      data-scope="sidebar"
      data-part="group"
      class={clsx(styles.group, local.class)}
      {...others}
      data-slot="sidebar-group"
    />
  );
}

function SidebarGroupLabel(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.h3
      data-scope="sidebar"
      data-part="group-label"
      class={clsx(styles.groupLabel, local.class)}
      {...others}
      data-slot="sidebar-group-label"
    />
  );
}

function SidebarGroupHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="sidebar"
      data-part="group-header"
      class={clsx(styles.groupHeader, local.class)}
      {...others}
      data-slot="sidebar-group-header"
    />
  );
}

function SidebarGroupAction(props: HTMLArkProps<'button'>) {
  const [local, others] = splitProps(props, ['class', 'type']);

  return (
    <ark.button
      type={local.type ?? 'button'}
      data-scope="sidebar"
      data-part="group-action"
      class={clsx(styles.groupAction, local.class)}
      {...others}
      data-slot="sidebar-group-action"
    />
  );
}

function SidebarNavigationList(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ul
      data-scope="sidebar"
      data-part="navigation-list"
      class={clsx(styles.menu, local.class)}
      {...others}
      data-slot="sidebar-navigation-list"
    />
  );
}

function SidebarNavigationItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      data-scope="sidebar"
      data-part="navigation-item"
      class={clsx(styles.menuItem, local.class)}
      {...others}
      data-slot="sidebar-navigation-item"
    />
  );
}

function SidebarNavigationButton(
  props: HTMLArkProps<'button'> & {
    active?: boolean;
    size?: 'sm' | 'md' | 'lg';
  },
) {
  const [local, others] = splitProps(props, [
    'active',
    'aria-current',
    'asChild',
    'class',
    'size',
    'type',
  ]);

  return (
    <ark.button
      asChild={local.asChild}
      type={local.type ?? 'button'}
      aria-current={local['aria-current'] ?? (local.active ? 'page' : undefined)}
      data-scope="sidebar"
      data-part="navigation-button"
      data-active={local.active ? '' : undefined}
      data-size={local.size ?? 'md'}
      class={clsx(styles.menuButton, local.class)}
      {...others}
      data-slot="sidebar-navigation-button"
    />
  );
}

function SidebarNavigationBadge(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      data-scope="sidebar"
      data-part="navigation-badge"
      class={clsx(styles.menuBadge, local.class)}
      {...others}
      data-slot="sidebar-navigation-badge"
    />
  );
}

function SidebarNavigationSubList(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ul
      data-scope="sidebar"
      data-part="navigation-sub-list"
      class={clsx(styles.menuSub, local.class)}
      {...others}
      data-slot="sidebar-navigation-sub-list"
    />
  );
}

function SidebarNavigationSubItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      data-scope="sidebar"
      data-part="navigation-sub-item"
      class={clsx(styles.menuSubItem, local.class)}
      {...others}
      data-slot="sidebar-navigation-sub-item"
    />
  );
}

function SidebarNavigationSubButton(
  props: HTMLArkProps<'a'> & {
    active?: boolean;
  },
) {
  const [local, others] = splitProps(props, [
    'active',
    'aria-current',
    'asChild',
    'children',
    'class',
  ]);

  return (
    <ark.a
      asChild={local.asChild}
      aria-current={local['aria-current'] ?? (local.active ? 'page' : undefined)}
      data-scope="sidebar"
      data-part="navigation-sub-button"
      data-active={local.active ? '' : undefined}
      class={clsx(styles.menuSubButton, local.class)}
      {...others}
      data-slot="sidebar-navigation-sub-button"
    >
      {typeof local.children === 'string' ? (
        <span data-slot="sidebar-navigation-sub-label">{local.children}</span>
      ) : (
        local.children
      )}
    </ark.a>
  );
}

function SidebarTooltip(
  props: Omit<ComponentProps<typeof Tooltip>, 'children' | 'disabled' | 'positioning'> & {
    children: NonNullable<ComponentProps<typeof Tooltip.Trigger>['asChild']>;
    content: ComponentProps<typeof Tooltip.Content>['children'];
    positioning?: ComponentProps<typeof Tooltip>['positioning'];
  },
) {
  const [local, others] = splitProps(props, [
    'children',
    'closeDelay',
    'content',
    'openDelay',
    'positioning',
  ]);
  const { collapsed, side } = useSidebar();

  return (
    <Tooltip
      {...others}
      openDelay={local.openDelay ?? 200}
      closeDelay={local.closeDelay ?? 0}
      disabled={!collapsed()}
      positioning={{
        placement: side() === 'left' ? 'right' : 'left',
        gutter: 8,
        ...local.positioning,
      }}
    >
      <Tooltip.Trigger asChild={local.children} />
      <Tooltip.Positioner>
        <Tooltip.Content>{local.content}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
}

function SidebarInput(props: ComponentProps<typeof Input.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Input.Root class={clsx(styles.input, local.class)} {...others} data-slot="sidebar-input" />
  );
}

function SidebarSeparator(props: ComponentProps<typeof Separator.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Separator.Root
      class={clsx(styles.separator, local.class)}
      {...others}
      data-slot="sidebar-separator"
    />
  );
}

const Sidebar = Object.assign(SidebarRoot, {
  Root: SidebarRoot,
  Panel: SidebarPanel,
  Inset: SidebarInset,
  ResizeTrigger: SidebarResizeTrigger,
  Trigger: SidebarTrigger,
  Label: SidebarLabel,
  Input: SidebarInput,
  Header: SidebarHeader,
  Content: SidebarContent,
  ExpandedContent: SidebarExpandedContent,
  CollapsedContent: SidebarCollapsedContent,
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
  Group: SidebarGroup,
  GroupHeader: SidebarGroupHeader,
  GroupLabel: SidebarGroupLabel,
  GroupAction: SidebarGroupAction,
  NavigationList: SidebarNavigationList,
  NavigationItem: SidebarNavigationItem,
  Tooltip: SidebarTooltip,
  NavigationButton: SidebarNavigationButton,
  NavigationBadge: SidebarNavigationBadge,
  NavigationSubList: SidebarNavigationSubList,
  NavigationSubItem: SidebarNavigationSubItem,
  NavigationSubButton: SidebarNavigationSubButton,
});

export { Sidebar, useSidebar };