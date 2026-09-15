'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { Splitter as SplitterPrimitive } from '@ark-ui/react/splitter';
import type { ComponentProps, ComponentRef, MouseEvent } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { Input } from '../input';
import { Separator } from '../separator';
import { Splitter, type SplitterPanelData, useSplitterContext } from '../splitter';
import { Tooltip } from '../tooltip';

type SidebarSide = 'left' | 'right';
type SidebarConfig = {
  panelId: string;
  side: SidebarSide;
};
type SidebarRootProps = Omit<ComponentProps<typeof Splitter.Root>, 'orientation' | 'panels'> & {
  panelId?: string;
  side?: SidebarSide;
};
type SidebarPanelProps = Omit<ComponentProps<typeof Splitter.Panel>, 'id'>;
type SidebarResizeTriggerProps = Omit<ComponentProps<typeof Splitter.ResizeTrigger>, 'id'>;
type SidebarDefaultSize = ComponentProps<typeof Splitter.Root>['defaultSize'];

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

const SidebarRoot = forwardRef<ComponentRef<typeof SplitterPrimitive.Root>, SidebarRootProps>(
  function SidebarRoot(
    { className, defaultSize, panelId = 'sidebar', side = 'left', style, ...props },
    ref,
  ) {
    return (
      <SidebarConfigContext.Provider value={{ panelId, side }}>
        <SplitterPrimitive.Root
          {...props}
          ref={ref}
          panels={getDefaultPanels(side, panelId)}
          defaultSize={defaultSize ?? getDefaultSidebarSize(side)}
          orientation="horizontal"
          data-side={side}
          data-slot="sidebar-root"
          className={cn(
            'group/splitter relative box-border h-112 min-h-0 w-full min-w-0 rounded-md border border-border bg-card text-foreground shadow-sm data-dragging:cursor-col-resize data-dragging:data-[orientation=vertical]:cursor-row-resize',
            'isolate h-dvh min-h-96 w-full min-w-0 rounded-none border border-border bg-background text-foreground shadow-none',
            className,
          )}
          style={{ width: undefined, height: undefined, ...style }}
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

const SidebarPanel = forwardRef<ComponentRef<typeof SplitterPrimitive.Panel>, SidebarPanelProps>(
  function SidebarPanel({ className, ...props }, ref) {
    const config = useContext(SidebarConfigContext);
    const splitter = useSplitterContext();
    const collapsed = splitter.isPanelCollapsed(config.panelId);

    return (
      <SplitterPrimitive.Panel
        {...props}
        ref={ref}
        id={config.panelId}
        data-side={config.side}
        data-slot="sidebar-panel"
        data-state={collapsed ? 'collapsed' : 'expanded'}
        className={cn(
          'box-border min-h-50 min-w-0 overflow-auto rounded-none border-0 border-border bg-card p-4 text-card-foreground shadow-none group-data-[orientation=vertical]/splitter:min-h-0 data-dragging:select-none',
          'group/sidebar-panel @container/sidebar-panel relative flex min-h-0 min-w-0 flex-col overflow-hidden bg-card p-0 text-card-foreground transition-colors duration-200 ease-in-out motion-reduce:transition-none',
          className,
        )}
      />
    );
  },
);

const SidebarInset = forwardRef<ComponentRef<typeof SplitterPrimitive.Panel>, SidebarPanelProps>(
  function SidebarInset({ className, ...props }, ref) {
    const { side } = useContext(SidebarConfigContext);

    return (
      <SplitterPrimitive.Panel
        {...props}
        ref={ref}
        id="content"
        data-side={side}
        data-slot="sidebar-inset"
        className={cn(
          'box-border min-h-50 min-w-0 overflow-auto rounded-none border-0 border-border bg-card p-4 text-card-foreground shadow-none group-data-[orientation=vertical]/splitter:min-h-0 data-dragging:select-none',
          'relative min-w-0 overflow-auto bg-background p-0 text-foreground',
          className,
        )}
      />
    );
  },
);

const SidebarResizeTrigger = forwardRef<
  ComponentRef<typeof SplitterPrimitive.ResizeTrigger>,
  SidebarResizeTriggerProps
>(function SidebarResizeTrigger(
  { asChild, children, className, 'aria-label': ariaLabel = 'Resize sidebar', ...props },
  ref,
) {
  const { panelId, side } = useContext(SidebarConfigContext);
  const id: NonNullable<ComponentProps<typeof Splitter.ResizeTrigger>['id']> =
    side === 'left' ? `${panelId}:content` : `content:${panelId}`;

  return (
    <SplitterPrimitive.ResizeTrigger
      {...props}
      ref={ref}
      asChild={asChild}
      id={id}
      aria-label={ariaLabel}
      data-side={side}
      data-slot="sidebar-resize-trigger"
      className={cn(
        "group/trigger relative z-1 box-border flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-200 ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-border before:transition-[background-color] before:duration-200 before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-2.5 after:content-[''] data-disabled:cursor-default data-disabled:opacity-50 data-dragging:before:bg-muted-foreground/40 data-[orientation=vertical]:h-px data-[orientation=vertical]:min-h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:min-w-0 data-[orientation=vertical]:cursor-row-resize data-[orientation=vertical]:before:h-[0.5px] data-[orientation=vertical]:before:w-full data-[orientation=vertical]:after:h-2.5 data-[orientation=vertical]:after:w-full [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40",
        'z-2',
        className,
      )}
    >
      {children === undefined && !asChild ? <Splitter.ResizeTriggerIndicator /> : children}
    </SplitterPrimitive.ResizeTrigger>
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
        data-state={collapsed ? 'collapsed' : 'expanded'}
        className={cn(
          'relative z-4 -mx-3.5 inline-flex size-7 flex-none translate-y-10 cursor-pointer items-center justify-center rounded-full border border-border bg-background p-0 text-muted-foreground shadow-sm outline-0 transition-[background-color,color,box-shadow] duration-200 ease-in-out',
          'focus-visible:outline-offset-0.5 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 motion-reduce:transition-none',
          '[&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out data-[side=left]:data-[state=collapsed]:[&>svg]:rotate-180 data-[side=right]:data-[state=expanded]:[&>svg]:rotate-180',
          'hover:bg-accent hover:text-accent-foreground',
          className,
        )}
        onClick={handleClick}
        {...props}
        data-slot="sidebar-trigger"
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
      className={cn(
        'min-w-0 truncate group-data-[state=collapsed]/sidebar-panel:sr-only',
        className,
      )}
      {...props}
      data-slot="sidebar-label"
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
      className={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1 [&>*:only-child]:w-full group-data-[state=collapsed]/sidebar-panel:[&>*:only-child]:w-auto',
        className,
      )}
      {...props}
      data-slot="sidebar-header"
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
      className={cn(
        'flex min-h-0 flex-auto [scrollbar-gutter:stable] flex-col overflow-auto overscroll-contain group-data-[state=collapsed]/sidebar-panel:[scrollbar-width:none] group-data-[state=collapsed]/sidebar-panel:[scrollbar-gutter:auto] group-data-[state=collapsed]/sidebar-panel:overflow-x-hidden group-data-[state=collapsed]/sidebar-panel:overflow-y-auto',
        className,
      )}
      {...props}
      data-slot="sidebar-content"
    />
  );
});

const SidebarExpandedContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarExpandedContent({ className, ...props }, ref) {
    const { collapsed } = useSidebar();

    return (
      <ark.div
        ref={ref}
        data-scope="sidebar"
        data-part="expanded-content"
        className={className}
        {...props}
        data-slot="sidebar-expanded-content"
        hidden={collapsed}
      />
    );
  },
);

const SidebarCollapsedContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarCollapsedContent({ className, ...props }, ref) {
    const { collapsed } = useSidebar();

    return (
      <ark.div
        ref={ref}
        data-scope="sidebar"
        data-part="collapsed-content"
        className={className}
        {...props}
        data-slot="sidebar-collapsed-content"
        hidden={!collapsed}
      />
    );
  },
);

const SidebarFooter = forwardRef<HTMLElement, HTMLArkProps<'footer'>>(function SidebarFooter(
  { className, ...props },
  ref,
) {
  return (
    <ark.footer
      ref={ref}
      data-scope="sidebar"
      data-part="footer"
      className={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1',
        className,
      )}
      {...props}
      data-slot="sidebar-footer"
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
      className={cn(
        'flex flex-col gap-1 p-3 group-data-[state=collapsed]/sidebar-panel:px-1',
        className,
      )}
      {...props}
      data-slot="sidebar-group"
    />
  );
});

const SidebarGroupHeader = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarGroupHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="sidebar"
        data-part="group-header"
        className={cn('flex min-w-0 items-center gap-2', className)}
        {...props}
        data-slot="sidebar-group-header"
      />
    );
  },
);

const SidebarGroupLabel = forwardRef<HTMLHeadingElement, HTMLArkProps<'h3'>>(
  function SidebarGroupLabel({ className, ...props }, ref) {
    return (
      <ark.h3
        ref={ref}
        data-scope="sidebar"
        data-part="group-label"
        className={cn(
          'min-w-0 flex-1 truncate px-2 text-xs leading-4 font-medium text-muted-foreground group-data-[state=collapsed]/sidebar-panel:sr-only',
          className,
        )}
        {...props}
        data-slot="sidebar-group-label"
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
        className={cn(
          'focus-visible:outline-offset-0.5 me-2 inline-flex size-control-xs flex-none cursor-pointer items-center justify-center rounded-md p-0 text-muted-foreground outline-0 transition-colors duration-200 ease-in-out hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none @max-[7rem]:hidden [&>svg]:size-4',
          className,
        )}
        {...props}
        data-slot="sidebar-group-action"
      />
    );
  },
);

const SidebarNavigationList = forwardRef<HTMLUListElement, HTMLArkProps<'ul'>>(
  function SidebarNavigationList({ className, ...props }, ref) {
    return (
      <ark.ul
        ref={ref}
        data-scope="sidebar"
        data-part="navigation-list"
        className={cn('flex w-full min-w-0 flex-col gap-1', className)}
        {...props}
        data-slot="sidebar-navigation-list"
      />
    );
  },
);

const SidebarNavigationItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(
  function SidebarNavigationItem({ className, ...props }, ref) {
    return (
      <ark.li
        ref={ref}
        data-scope="sidebar"
        data-part="navigation-item"
        className={cn('relative min-w-0', className)}
        {...props}
        data-slot="sidebar-navigation-item"
      />
    );
  },
);

const SidebarNavigationButton = forwardRef<
  HTMLButtonElement,
  HTMLArkProps<'button'> & {
    active?: boolean;
    size?: 'sm' | 'md' | 'lg';
  }
>(function SidebarNavigationButton(
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
      data-part="navigation-button"
      data-active={active ? '' : undefined}
      data-size={size}
      className={cn(
        'flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-start text-sm leading-5 text-ellipsis whitespace-nowrap text-card-foreground outline-0 transition-colors duration-200 ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
        'focus-visible:outline-offset-0.5 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground motion-reduce:transition-none [&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
        'group-data-[state=collapsed]/sidebar-panel:mx-auto group-data-[state=collapsed]/sidebar-panel:min-h-control-md group-data-[state=collapsed]/sidebar-panel:w-control-md group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:bg-transparent group-data-[state=collapsed]/sidebar-panel:px-0 group-data-[state=collapsed]/sidebar-panel:hover:bg-transparent',
        '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        '[&>[data-scope=select][data-part=indicator]]:ms-auto @max-[7rem]:[&>[data-scope=select][data-part=indicator]]:hidden',
        '[&>[data-slot=collapsible-indicator]]:ms-auto [&>[data-slot=collapsible-indicator]]:size-control-xs @max-[7rem]:[&>[data-slot=collapsible-indicator]]:hidden [&>[data-slot=collapsible-indicator]>svg]:size-3',
        '[&>[data-slot=menu-indicator]]:ms-auto [&>[data-slot=menu-indicator]]:size-control-xs [&>[data-slot=menu-indicator]]:leading-none [&>[data-slot=menu-indicator]]:text-muted-foreground @max-[7rem]:[&>[data-slot=menu-indicator]]:hidden [&>[data-slot=menu-indicator]>svg]:block [&>[data-slot=menu-indicator]>svg]:size-4',
        size === 'sm' && 'min-h-control-sm text-xs',
        size === 'md' && 'min-h-control-md',
        size === 'lg' && 'min-h-control-lg',
        className,
      )}
      {...props}
      data-slot="sidebar-navigation-button"
    />
  );
});

const SidebarNavigationBadge = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function SidebarNavigationBadge({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        data-scope="sidebar"
        data-part="navigation-badge"
        className={cn(
          'pointer-events-none absolute end-2.5 top-1/2 z-1 box-border inline-grid size-5 -translate-y-1/2 place-items-center rounded-full bg-primary p-0 text-[0.5625rem] leading-none font-medium text-primary-foreground tabular-nums @max-[7rem]:hidden',
          className,
        )}
        {...props}
        data-slot="sidebar-navigation-badge"
      />
    );
  },
);

const SidebarNavigationSubList = forwardRef<HTMLUListElement, HTMLArkProps<'ul'>>(
  function SidebarNavigationSubList({ className, ...props }, ref) {
    return (
      <ark.ul
        ref={ref}
        data-scope="sidebar"
        data-part="navigation-sub-list"
        className={cn(
          'ms-4 mt-1 flex w-auto min-w-0 flex-col gap-1 border-s border-border ps-2 group-data-[state=collapsed]/sidebar-panel:hidden',
          className,
        )}
        {...props}
        data-slot="sidebar-navigation-sub-list"
      />
    );
  },
);

const SidebarNavigationSubItem = forwardRef<HTMLLIElement, HTMLArkProps<'li'>>(
  function SidebarNavigationSubItem({ className, ...props }, ref) {
    return (
      <ark.li
        ref={ref}
        data-scope="sidebar"
        data-part="navigation-sub-item"
        className={cn('relative min-w-0', className)}
        {...props}
        data-slot="sidebar-navigation-sub-item"
      />
    );
  },
);

const SidebarNavigationSubButton = forwardRef<
  HTMLAnchorElement,
  HTMLArkProps<'a'> & {
    active?: boolean;
  }
>(function SidebarNavigationSubButton(
  { active = false, children, className, 'aria-current': ariaCurrent, ...props },
  ref,
) {
  return (
    <ark.a
      ref={ref}
      aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
      data-scope="sidebar"
      data-part="navigation-sub-button"
      data-active={active ? '' : undefined}
      className={cn(
        'flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-start text-sm leading-5 text-ellipsis whitespace-nowrap text-card-foreground outline-0 transition-[background-color,border-color,color,box-shadow] duration-200 ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
        'focus-visible:outline-offset-0.5 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground motion-reduce:transition-none [&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
        '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
      data-slot="sidebar-navigation-sub-button"
    >
      {typeof children === 'string' ? (
        <span data-slot="sidebar-navigation-sub-label">{children}</span>
      ) : (
        children
      )}
    </ark.a>
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
        className={cn('w-full group-data-[state=collapsed]/sidebar-panel:hidden', className)}
        {...props}
        data-slot="sidebar-input"
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
      className={cn('border-border', className)}
      {...props}
      data-slot="sidebar-separator"
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