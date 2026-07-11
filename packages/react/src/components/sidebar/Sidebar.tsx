import type { HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef, MouseEvent } from 'react';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { createContext, forwardRef, useContext } from 'react';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import { Input } from '../input';
import { Separator } from '../separator';
import { Splitter, type SplitterPanelData, useSplitterContext } from '../splitter';
import { Tooltip } from '../tooltip';
import styles from './Sidebar.module.css';

type SidebarSide = 'left' | 'right';
type SidebarConfig = {
  panelId: string;
  side: SidebarSide;
};
type SidebarRootProps = Omit<ComponentProps<typeof Splitter.Root>, 'orientation' | 'panels'> & {
  panelId?: string;
  panels?: ComponentProps<typeof Splitter.Root>['panels'];
  side?: SidebarSide;
};
type SidebarPanelProps = Omit<ComponentProps<typeof Splitter.Panel>, 'id'> & {
  id?: ComponentProps<typeof Splitter.Panel>['id'];
};
type SidebarResizeTriggerProps = Omit<ComponentProps<typeof Splitter.ResizeTrigger>, 'id'> & {
  id?: ComponentProps<typeof Splitter.ResizeTrigger>['id'];
};
type SidebarDefaultSize = ComponentProps<typeof Splitter.Root>['defaultSize'];

const sidebarPanel = {
  id: 'sidebar',
  minSize: '12rem',
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
  panelId: 'sidebar',
  side: 'left',
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
  if (splitter.isPanelCollapsed(panelId)) {
    splitter.expandPanel(panelId);
    return;
  }

  splitter.collapsePanel(panelId);
}

const SidebarRoot = forwardRef<ComponentRef<typeof Splitter.Root>, SidebarRootProps>(
  function SidebarRoot(
    { className, panels, defaultSize, panelId = 'sidebar', side = 'left', ...props },
    ref,
  ) {
    return (
      <SidebarConfigContext.Provider value={{ panelId, side }}>
        <Splitter.Root
          {...props}
          ref={ref}
          panels={panels ?? getDefaultPanels(side, panelId)}
          defaultSize={defaultSize ?? getDefaultSidebarSize(side)}
          orientation="horizontal"
          data-side={side}
          data-slot="sidebar-root"
          className={clsx(styles.root, normalizeClassName(className))}
        />
      </SidebarConfigContext.Provider>
    );
  },
);

function useSidebar() {
  const config = useContext(SidebarConfigContext);
  const splitter = useSplitterContext();
  const collapsed = splitter.isPanelCollapsed(config.panelId);

  return {
    collapsed,
    side: config.side,
    state: collapsed ? 'collapsed' : 'expanded',
    toggleSidebar: () => toggleSidebarPanel(splitter, config.panelId),
  };
}

const SidebarPanel = forwardRef<ComponentRef<typeof Splitter.Panel>, SidebarPanelProps>(
  function SidebarPanel({ className, id, ...props }, ref) {
    const config = useContext(SidebarConfigContext);
    const splitter = useSplitterContext();
    const panelId = id ?? config.panelId;
    const collapsed = splitter.isPanelCollapsed(panelId);

    return (
      <Splitter.Panel
        {...props}
        ref={ref}
        id={panelId}
        data-side={config.side}
        data-slot="sidebar-panel"
        data-state={collapsed ? 'collapsed' : 'expanded'}
        className={clsx(styles.panel, normalizeClassName(className))}
      />
    );
  },
);

const SidebarInset = forwardRef<ComponentRef<typeof Splitter.Panel>, SidebarPanelProps>(
  function SidebarInset({ className, id = 'content', ...props }, ref) {
    const { side } = useContext(SidebarConfigContext);

    return (
      <Splitter.Panel
        ref={ref}
        id={id}
        data-side={side}
        data-slot="sidebar-inset"
        className={clsx(styles.inset, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SidebarResizeTrigger = forwardRef<
  ComponentRef<typeof Splitter.ResizeTrigger>,
  SidebarResizeTriggerProps
>(function SidebarResizeTrigger(
  { children, className, id, 'aria-label': ariaLabel = 'Resize sidebar', ...props },
  ref,
) {
  const { panelId, side } = useContext(SidebarConfigContext);
  const resolvedId = id ?? (side === 'left' ? `${panelId}:content` : `content:${panelId}`);

  return (
    <Splitter.ResizeTrigger
      {...props}
      ref={ref}
      id={resolvedId}
      aria-label={ariaLabel}
      data-side={side}
      data-slot="sidebar-resize-trigger"
      className={clsx(styles.resizeTrigger, normalizeClassName(className))}
    >
      {children === undefined ? null : children}
    </Splitter.ResizeTrigger>
  );
});

const SidebarTrigger = forwardRef<HTMLButtonElement, HTMLArkProps<'button'>>(
  function SidebarTrigger(
    {
      className,
      children,
      onClick,
      type = 'button',
      'aria-label': ariaLabel = 'Toggle sidebar',
      ...props
    },
    ref,
  ) {
    const config = useContext(SidebarConfigContext);
    const sidebar = useSplitterContext();
    const collapsed = sidebar.isPanelCollapsed(config.panelId);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      onClick?.(event);
      if (event.defaultPrevented) return;

      toggleSidebarPanel(sidebar, config.panelId);
    };

    return (
      <ark.button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        aria-expanded={!collapsed}
        data-scope="sidebar"
        data-part="trigger"
        data-side={config.side}
        data-slot="sidebar-trigger"
        data-state={collapsed ? 'collapsed' : 'expanded'}
        className={clsx(styles.trigger, normalizeClassName(className))}
        onClick={handleClick}
        {...props}
      >
        {children ?? <ChevronLeftIcon />}
      </ark.button>
    );
  },
);

const SidebarLabel = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(function SidebarLabel(
  { className, ...props },
  ref,
) {
  return (
    <ark.span
      ref={ref}
      data-scope="sidebar"
      data-part="label"
      data-slot="sidebar-label"
      className={clsx(styles.label, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarHeader = forwardRef<HTMLElement, HTMLArkProps<'header'>>(function SidebarHeader(
  { className, ...props },
  ref,
) {
  return (
    <ark.header
      ref={ref}
      data-scope="sidebar"
      data-part="header"
      data-slot="sidebar-header"
      className={clsx(styles.header, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function SidebarContent(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="sidebar"
      data-part="content"
      data-slot="sidebar-content"
      className={clsx(styles.content, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarFooter = forwardRef<HTMLElement, HTMLArkProps<'footer'>>(function SidebarFooter(
  { className, ...props },
  ref,
) {
  return (
    <ark.footer
      ref={ref}
      data-scope="sidebar"
      data-part="footer"
      data-slot="sidebar-footer"
      className={clsx(styles.footer, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarGroup = forwardRef<HTMLElement, HTMLArkProps<'section'>>(function SidebarGroup(
  { className, ...props },
  ref,
) {
  return (
    <ark.section
      ref={ref}
      data-scope="sidebar"
      data-part="group"
      data-slot="sidebar-group"
      className={clsx(styles.group, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarGroupLabel = forwardRef<HTMLHeadingElement, HTMLArkProps<'h3'>>(
  function SidebarGroupLabel({ className, ...props }, ref) {
    return (
      <ark.h3
        ref={ref}
        data-scope="sidebar"
        data-part="group-label"
        data-slot="sidebar-group-label"
        className={clsx(styles.groupLabel, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SidebarGroupAction = forwardRef<HTMLButtonElement, HTMLArkProps<'button'>>(
  function SidebarGroupAction({ className, type = 'button', ...props }, ref) {
    return (
      <ark.button
        ref={ref}
        type={type}
        data-scope="sidebar"
        data-part="group-action"
        data-slot="sidebar-group-action"
        className={clsx(styles.groupAction, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SidebarGroupContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarGroupContent({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="sidebar"
        data-part="group-content"
        data-slot="sidebar-group-content"
        className={clsx(styles.groupContent, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SidebarMenu = forwardRef<HTMLUListElement, HTMLArkProps<'ul'>>(function SidebarMenu(
  { className, ...props },
  ref,
) {
  return (
    <ark.ul
      ref={ref}
      data-scope="sidebar"
      data-part="menu"
      data-slot="sidebar-menu"
      className={clsx(styles.menu, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarMenuItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(function SidebarMenuItem(
  { className, ...props },
  ref,
) {
  return (
    <ark.li
      ref={ref}
      data-scope="sidebar"
      data-part="menu-item"
      data-slot="sidebar-menu-item"
      className={clsx(styles.menuItem, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarMenuButton = forwardRef<
  HTMLButtonElement,
  HTMLArkProps<'button'> & {
    active?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }
>(function SidebarMenuButton(
  {
    active = false,
    className,
    size = 'md',
    type = 'button',
    'aria-current': ariaCurrent,
    ...props
  },
  ref,
) {
  return (
    <ark.button
      ref={ref}
      type={type}
      aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
      data-scope="sidebar"
      data-part="menu-button"
      data-slot="sidebar-menu-button"
      data-active={active ? '' : undefined}
      data-size={size}
      className={clsx(styles.menuButton, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarMenuAction = forwardRef<HTMLButtonElement, HTMLArkProps<'button'>>(
  function SidebarMenuAction({ className, type = 'button', ...props }, ref) {
    return (
      <ark.button
        ref={ref}
        type={type}
        data-scope="sidebar"
        data-part="menu-action"
        data-slot="sidebar-menu-action"
        className={clsx(styles.menuAction, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SidebarMenuBadge = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(function SidebarMenuBadge(
  { className, ...props },
  ref,
) {
  return (
    <ark.div
      ref={ref}
      data-scope="sidebar"
      data-part="menu-badge"
      data-slot="sidebar-menu-badge"
      className={clsx(styles.menuBadge, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarMenuSub = forwardRef<HTMLUListElement, HTMLArkProps<'ul'>>(function SidebarMenuSub(
  { className, ...props },
  ref,
) {
  return (
    <ark.ul
      ref={ref}
      data-scope="sidebar"
      data-part="menu-sub"
      data-slot="sidebar-menu-sub"
      className={clsx(styles.menuSub, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarMenuSubItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(
  function SidebarMenuSubItem({ className, ...props }, ref) {
    return (
      <ark.li
        ref={ref}
        data-scope="sidebar"
        data-part="menu-sub-item"
        data-slot="sidebar-menu-sub-item"
        className={clsx(styles.menuSubItem, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SidebarMenuSubButton = forwardRef<
  HTMLAnchorElement,
  HTMLArkProps<'a'> & {
    active?: boolean;
  }
>(function SidebarMenuSubButton(
  { active = false, className, 'aria-current': ariaCurrent, ...props },
  ref,
) {
  return (
    <ark.a
      ref={ref}
      aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
      data-scope="sidebar"
      data-part="menu-sub-button"
      data-slot="sidebar-menu-sub-button"
      data-active={active ? '' : undefined}
      className={clsx(styles.menuSubButton, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarTooltip = function SidebarTooltip({
  children,
  content,
  openDelay = 200,
  closeDelay = 0,
  positioning,
  ...props
}: Omit<ComponentProps<typeof Tooltip>, 'children' | 'disabled' | 'positioning'> & {
  children: ComponentProps<typeof Tooltip.Trigger>['children'];
  content: ComponentProps<typeof Tooltip.Content>['children'];
  positioning?: ComponentProps<typeof Tooltip>['positioning'];
}) {
  const { collapsed, side } = useSidebar();

  return (
    <Tooltip
      {...props}
      openDelay={openDelay}
      closeDelay={closeDelay}
      disabled={!collapsed}
      positioning={{ placement: side === 'left' ? 'right' : 'left', gutter: 8, ...positioning }}
    >
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>{content}</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
};

const SidebarInput = forwardRef<ComponentRef<typeof Input.Root>, ComponentProps<typeof Input.Root>>(
  function SidebarInput({ className, ...props }, ref) {
    return (
      <Input.Root
        ref={ref}
        data-slot="sidebar-input"
        className={clsx(styles.input, normalizeClassName(className))}
        {...props}
      />
    );
  },
);

const SidebarSeparator = forwardRef<
  ComponentRef<typeof Separator.Root>,
  ComponentProps<typeof Separator.Root>
>(function SidebarSeparator({ className, ...props }, ref) {
  return (
    <Separator.Root
      ref={ref}
      data-slot="sidebar-separator"
      className={clsx(styles.separator, normalizeClassName(className))}
      {...props}
    />
  );
});

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
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  Tooltip: SidebarTooltip,
  MenuButton: SidebarMenuButton,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuSub: SidebarMenuSub,
  MenuSubItem: SidebarMenuSubItem,
  MenuSubButton: SidebarMenuSubButton,
});

export { Sidebar, useSidebar };