import type { HTMLArkProps } from '@ark-ui/react/factory';
import type { ComponentProps, ComponentRef, MouseEvent } from 'react';
import { ark } from '@ark-ui/react/factory';
import { clsx } from 'clsx';
import { createContext, forwardRef, useContext } from 'react';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { normalizeClassName } from '@/lib/moduix/normalizeClassName';
import type { SplitterPanelData } from '../splitter';
import { Splitter, useSplitterContext } from '../splitter';
import styles from './Sidebar.module.css';

export type SidebarSide = 'left' | 'right';

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

const defaultSizeLeft = ['16rem'];
const defaultSizeRight: NonNullable<ComponentProps<typeof Splitter.Root>['defaultSize']> = [];
defaultSizeRight[1] = '16rem';

const defaultSizeBySide = {
  left: defaultSizeLeft,
  right: defaultSizeRight,
} satisfies Record<SidebarSide, NonNullable<ComponentProps<typeof Splitter.Root>['defaultSize']>>;

const SidebarConfigContext = createContext({
  panelId: 'sidebar',
  side: 'left' as SidebarSide,
});

type SidebarRootProps = Omit<
  ComponentProps<typeof Splitter.Root>,
  'orientation' | 'panels' | 'side'
> & {
  panelId?: string;
  panels?: ComponentProps<typeof Splitter.Root>['panels'];
  side?: SidebarSide;
};

const SidebarRoot = forwardRef<ComponentRef<typeof Splitter.Root>, SidebarRootProps>(
  function SidebarRoot(
    { className, panels, defaultSize: initialSize, panelId = 'sidebar', side = 'left', ...props },
    ref,
  ) {
    const resolvedSide: SidebarSide = side === 'right' ? 'right' : 'left';
    const resolvedPanels = panels ?? defaultPanelsBySide[resolvedSide];

    return (
      <SidebarConfigContext.Provider value={{ panelId, side: resolvedSide }}>
        <Splitter.Root
          ref={ref}
          panels={resolvedPanels}
          defaultSize={initialSize ?? defaultSizeBySide[resolvedSide]}
          data-side={resolvedSide}
          data-slot="sidebar-root"
          className={clsx(styles.root, normalizeClassName(className))}
          {...props}
          orientation="horizontal"
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
    state: collapsed ? ('collapsed' as const) : ('expanded' as const),
    toggleSidebar: () => {
      if (splitter.isPanelCollapsed(config.panelId)) splitter.expandPanel(config.panelId);
      else splitter.collapsePanel(config.panelId);
    },
  };
}

const SidebarPanel = forwardRef<
  ComponentRef<typeof Splitter.Panel>,
  Omit<ComponentProps<typeof Splitter.Panel>, 'id'> & {
    id?: ComponentProps<typeof Splitter.Panel>['id'];
  }
>(function SidebarPanel({ className, id, ...props }, ref) {
  const { panelId, side } = useContext(SidebarConfigContext);
  const sidebar = useSplitterContext();
  const resolvedId = id ?? panelId;
  const collapsed = sidebar.isPanelCollapsed(resolvedId);
  const state = collapsed ? 'collapsed' : 'expanded';

  return (
    <Splitter.Panel
      ref={ref}
      id={resolvedId}
      data-side={side}
      data-slot="sidebar-panel"
      data-state={state}
      className={clsx(styles.panel, normalizeClassName(className))}
      {...props}
    />
  );
});

const SidebarInset = forwardRef<
  ComponentRef<typeof Splitter.Panel>,
  Omit<ComponentProps<typeof Splitter.Panel>, 'id'> & {
    id?: ComponentProps<typeof Splitter.Panel>['id'];
  }
>(function SidebarInset({ className, id = 'content', ...props }, ref) {
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
});

const SidebarResizeTrigger = forwardRef<
  ComponentRef<typeof Splitter.ResizeTrigger>,
  Omit<ComponentProps<typeof Splitter.ResizeTrigger>, 'id'> & {
    id?: ComponentProps<typeof Splitter.ResizeTrigger>['id'];
  }
>(function SidebarResizeTrigger(
  { className, id, 'aria-label': ariaLabel = 'Resize sidebar', ...props },
  ref,
) {
  const { side } = useContext(SidebarConfigContext);
  const resolvedId = id ?? (side === 'left' ? 'sidebar:content' : 'content:sidebar');

  return (
    <Splitter.ResizeTrigger
      ref={ref}
      id={resolvedId}
      aria-label={ariaLabel}
      data-side={side}
      data-slot="sidebar-resize-trigger"
      className={clsx(styles.resizeTrigger, normalizeClassName(className))}
      {...props}
    />
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

      if (sidebar.isPanelCollapsed(config.panelId)) sidebar.expandPanel(config.panelId);
      else sidebar.collapsePanel(config.panelId);
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

const Sidebar = Object.assign(SidebarRoot, {
  Root: SidebarRoot,
  Panel: SidebarPanel,
  Inset: SidebarInset,
  ResizeTrigger: SidebarResizeTrigger,
  Trigger: SidebarTrigger,
  Label: SidebarLabel,
  Header: SidebarHeader,
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  Menu: SidebarMenu,
  MenuItem: SidebarMenuItem,
  MenuButton: SidebarMenuButton,
  MenuSub: SidebarMenuSub,
  MenuSubItem: SidebarMenuSubItem,
  MenuSubButton: SidebarMenuSubButton,
});

export { Sidebar, useSidebar };