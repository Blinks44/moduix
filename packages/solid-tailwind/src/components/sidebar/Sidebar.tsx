import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui/Icons';
import { Input } from '../input';
import { Separator } from '../separator';
import { Splitter, type SplitterPanelData, useSplitterContext } from '../splitter';
import { Tooltip } from '../tooltip';

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
  const [local, others] = splitProps(props, ['class', 'defaultSize', 'panelId', 'side']);
  const panelId = () => local.panelId ?? 'sidebar';
  const side = () => local.side ?? 'left';

  return (
    <SidebarConfigContext.Provider value={{ panelId, side }}>
      <Splitter.Root
        {...others}
        panels={getDefaultPanels(side(), panelId())}
        defaultSize={local.defaultSize ?? getDefaultSidebarSize(side())}
        orientation="horizontal"
        data-side={side()}
        data-slot="sidebar-root"
        class={cn(
          'isolate h-dvh min-h-96 w-full min-w-0 rounded-none border border-border bg-background text-foreground shadow-none',
          local.class,
        )}
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
    <Splitter.Panel
      {...others}
      id={config.panelId()}
      data-side={config.side()}
      data-slot="sidebar-panel"
      data-state={collapsed() ? 'collapsed' : 'expanded'}
      class={cn(
        'group/sidebar-panel @container/sidebar-panel relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-card p-0 text-card-foreground transition-colors duration-200 ease-in-out motion-reduce:transition-none',
        local.class,
      )}
    />
  );
}

function SidebarInset(props: SidebarPanelProps) {
  const [local, others] = splitProps(props, ['class']);
  const config = useSidebarConfig();

  return (
    <Splitter.Panel
      {...others}
      id="content"
      data-side={config.side()}
      data-slot="sidebar-inset"
      class={cn('relative min-w-0 overflow-auto bg-background p-0 text-foreground', local.class)}
    />
  );
}

function SidebarResizeTrigger(props: SidebarResizeTriggerProps) {
  const [local, others] = splitProps(props, ['aria-label', 'class', 'children']);
  const config = useSidebarConfig();
  const id = (): NonNullable<ComponentProps<typeof Splitter.ResizeTrigger>['id']> =>
    (config.side() === 'left'
      ? `${config.panelId()}:content`
      : `content:${config.panelId()}`) as NonNullable<
      ComponentProps<typeof Splitter.ResizeTrigger>['id']
    >;

  return (
    <Splitter.ResizeTrigger
      {...others}
      id={id()}
      aria-label={local['aria-label'] ?? 'Resize sidebar'}
      data-side={config.side()}
      data-slot="sidebar-resize-trigger"
      class={cn('z-2', local.class)}
    >
      {local.children}
    </Splitter.ResizeTrigger>
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
      data-slot="sidebar-trigger"
      data-state={collapsed() ? 'collapsed' : 'expanded'}
      class={cn(
        'relative z-4 -mx-3.5 inline-flex size-7 flex-none translate-y-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background p-0 text-muted-foreground shadow-sm outline-0 transition-[background-color,color,box-shadow] duration-200 ease-in-out',
        'focus-visible:outline-offset-0.5 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-reduce:transition-none',
        '[&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out data-[side=left]:data-[state=collapsed]:[&>svg]:rotate-180 data-[side=right]:data-[state=expanded]:[&>svg]:rotate-180',
        'hover:bg-accent hover:text-accent-foreground',
        local.class,
      )}
      onClick={handleClick}
      {...others}
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
      data-slot="sidebar-label"
      class={cn('min-w-0 truncate group-data-[state=collapsed]/sidebar-panel:sr-only', local.class)}
      {...others}
    />
  );
}

function SidebarHeader(props: HTMLArkProps<'header'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.header
      data-scope="sidebar"
      data-part="header"
      data-slot="sidebar-header"
      class={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1 [&>*:only-child]:w-full group-data-[state=collapsed]/sidebar-panel:[&>*:only-child]:w-auto',
        local.class,
      )}
      {...others}
    />
  );
}

function SidebarContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="sidebar"
      data-part="content"
      data-slot="sidebar-content"
      class={cn(
        'flex min-h-0 flex-auto [scrollbar-gutter:stable] flex-col overflow-auto overscroll-contain group-data-[state=collapsed]/sidebar-panel:[scrollbar-width:none] group-data-[state=collapsed]/sidebar-panel:[scrollbar-gutter:auto] group-data-[state=collapsed]/sidebar-panel:overflow-x-hidden group-data-[state=collapsed]/sidebar-panel:overflow-y-auto',
        local.class,
      )}
      {...others}
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
      data-slot="sidebar-expanded-content"
      class={local.class}
      {...others}
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
      data-slot="sidebar-collapsed-content"
      class={local.class}
      {...others}
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
      data-slot="sidebar-footer"
      class={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1',
        local.class,
      )}
      {...others}
    />
  );
}

function SidebarGroup(props: HTMLArkProps<'section'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.section
      data-scope="sidebar"
      data-part="group"
      data-slot="sidebar-group"
      class={cn(
        'flex flex-col gap-1 p-3 group-data-[state=collapsed]/sidebar-panel:px-1',
        local.class,
      )}
      {...others}
    />
  );
}

function SidebarGroupHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      data-scope="sidebar"
      data-part="group-header"
      data-slot="sidebar-group-header"
      class={cn('flex min-w-0 items-center gap-2', local.class)}
      {...others}
    />
  );
}

function SidebarGroupLabel(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.h3
      data-scope="sidebar"
      data-part="group-label"
      data-slot="sidebar-group-label"
      class={cn(
        'min-w-0 flex-1 truncate px-2 text-xs leading-4 font-medium text-muted-foreground group-data-[state=collapsed]/sidebar-panel:sr-only',
        local.class,
      )}
      {...others}
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
      data-slot="sidebar-group-action"
      class={cn(
        'focus-visible:outline-offset-0.5 me-2 inline-flex size-control-xs flex-none cursor-pointer items-center justify-center rounded-md p-0 text-muted-foreground outline-0 transition-colors duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none @max-[7rem]:hidden [&>svg]:size-4',
        local.class,
      )}
      {...others}
    />
  );
}

function SidebarNavigationList(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ul
      data-scope="sidebar"
      data-part="navigation-list"
      data-slot="sidebar-navigation-list"
      class={cn('flex w-full min-w-0 flex-col gap-1', local.class)}
      {...others}
    />
  );
}

function SidebarNavigationItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      data-scope="sidebar"
      data-part="navigation-item"
      data-slot="sidebar-navigation-item"
      class={cn('min-w-0', local.class)}
      {...others}
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
      data-slot="sidebar-navigation-button"
      data-active={local.active ? '' : undefined}
      data-size={local.size ?? 'md'}
      class={cn(
        'flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-start text-sm leading-5 text-ellipsis whitespace-nowrap text-card-foreground outline-0 transition-colors duration-200 ease-in-out',
        'focus-visible:outline-offset-0.5 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground motion-reduce:transition-none [&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
        'group-data-[state=collapsed]/sidebar-panel:mx-auto group-data-[state=collapsed]/sidebar-panel:min-h-control-md group-data-[state=collapsed]/sidebar-panel:w-control-md group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:bg-transparent group-data-[state=collapsed]/sidebar-panel:px-0 group-data-[state=collapsed]/sidebar-panel:hover:bg-transparent',
        '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        '[&>[data-scope=select][data-part=indicator]]:ms-auto @max-[7rem]:[&>[data-scope=select][data-part=indicator]]:hidden',
        '[&>[data-slot=collapsible-indicator]]:ms-auto [&>[data-slot=collapsible-indicator]]:size-control-xs @max-[7rem]:[&>[data-slot=collapsible-indicator]]:hidden [&>[data-slot=collapsible-indicator]>svg]:size-3',
        '[&>[data-slot=menu-indicator]]:ms-auto [&>[data-slot=menu-indicator]]:size-control-xs [&>[data-slot=menu-indicator]]:leading-none @max-[7rem]:[&>[data-slot=menu-indicator]]:hidden [&>[data-slot=menu-indicator]>svg]:block [&>[data-slot=menu-indicator]>svg]:size-4',
        local.size === 'sm' && 'min-h-control-sm text-xs',
        (local.size === undefined || local.size === 'md') && 'min-h-control-md',
        local.size === 'lg' && 'min-h-control-lg',
        local.class,
      )}
      {...others}
    />
  );
}

function SidebarNavigationSubList(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ul
      data-scope="sidebar"
      data-part="navigation-sub-list"
      data-slot="sidebar-navigation-sub-list"
      class={cn(
        'ms-4 mt-1 flex w-auto min-w-0 flex-col gap-1 border-s border-border ps-2 group-data-[state=collapsed]/sidebar-panel:hidden',
        local.class,
      )}
      {...others}
    />
  );
}

function SidebarNavigationSubItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      data-scope="sidebar"
      data-part="navigation-sub-item"
      data-slot="sidebar-navigation-sub-item"
      class={cn('min-w-0', local.class)}
      {...others}
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
      data-slot="sidebar-navigation-sub-button"
      data-active={local.active ? '' : undefined}
      class={cn(
        'flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-start text-sm leading-5 text-ellipsis whitespace-nowrap text-card-foreground outline-0 transition-[background-color,border-color,color,box-shadow] duration-200 ease-in-out',
        'focus-visible:outline-offset-0.5 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground motion-reduce:transition-none [&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
        '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        local.class,
      )}
      {...others}
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
    <Input.Root
      data-slot="sidebar-input"
      class={cn('w-full group-data-[state=collapsed]/sidebar-panel:hidden', local.class)}
      {...others}
    />
  );
}

function SidebarSeparator(props: ComponentProps<typeof Separator.Root>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Separator.Root
      data-slot="sidebar-separator"
      class={cn('border-border', local.class)}
      {...others}
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
  NavigationSubList: SidebarNavigationSubList,
  NavigationSubItem: SidebarNavigationSubItem,
  NavigationSubButton: SidebarNavigationSubButton,
});

export { Sidebar, useSidebar };