'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
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

const SidebarRoot = forwardRef<ComponentRef<typeof Splitter.Root>, SidebarRootProps>(
  function SidebarRoot(
    { className, defaultSize, panelId = 'sidebar', side = 'left', ...props },
    ref,
  ) {
    return (
      <SidebarConfigContext.Provider value={{ panelId, side }}>
        <Splitter.Root
          {...props}
          ref={ref}
          panels={getDefaultPanels(side, panelId)}
          defaultSize={defaultSize ?? getDefaultSidebarSize(side)}
          orientation="horizontal"
          data-side={side}
          data-slot="sidebar-root"
          className={cn(
            'isolate h-dvh min-h-96 w-full min-w-0 rounded-lg border border-border bg-background text-foreground shadow-md',
            className,
          )}
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
  function SidebarPanel({ className, ...props }, ref) {
    const config = useContext(SidebarConfigContext);
    const splitter = useSplitterContext();
    const collapsed = splitter.isPanelCollapsed(config.panelId);

    return (
      <Splitter.Panel
        {...props}
        ref={ref}
        id={config.panelId}
        data-side={config.side}
        data-slot="sidebar-panel"
        data-state={collapsed ? 'collapsed' : 'expanded'}
        className={cn(
          'group/sidebar-panel @container/sidebar-panel relative box-border flex min-h-0 min-w-0 flex-col overflow-hidden bg-card p-0 text-card-foreground transition-colors duration-200 ease-in-out',
          className,
        )}
      />
    );
  },
);

const SidebarInset = forwardRef<ComponentRef<typeof Splitter.Panel>, SidebarPanelProps>(
  function SidebarInset({ className, ...props }, ref) {
    const { side } = useContext(SidebarConfigContext);

    return (
      <Splitter.Panel
        {...props}
        ref={ref}
        id="content"
        data-side={side}
        data-slot="sidebar-inset"
        className={cn(
          'relative min-w-0 overflow-auto bg-background p-0 text-foreground',
          className,
        )}
      />
    );
  },
);

const SidebarResizeTrigger = forwardRef<
  ComponentRef<typeof Splitter.ResizeTrigger>,
  SidebarResizeTriggerProps
>(function SidebarResizeTrigger(
  { children, className, 'aria-label': ariaLabel = 'Resize sidebar', ...props },
  ref,
) {
  const { panelId, side } = useContext(SidebarConfigContext);
  const id: NonNullable<ComponentProps<typeof Splitter.ResizeTrigger>['id']> =
    side === 'left' ? `${panelId}:content` : `content:${panelId}`;

  return (
    <Splitter.ResizeTrigger
      {...props}
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      data-side={side}
      data-slot="sidebar-resize-trigger"
      className={cn('z-2', className)}
    >
      {children}
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
        className={cn(
          'focus-visible:outline-offset-0.5 relative z-4 -mx-3.5 box-border inline-flex size-7 flex-none translate-y-10 cursor-pointer appearance-none items-center justify-center rounded-full border border-border bg-background p-0 text-muted-foreground shadow-sm outline-0 transition-[background-color,color,box-shadow] duration-200 ease-in-out focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-disabled:pointer-events-none data-disabled:opacity-50 motion-reduce:transition-none [&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-200 [&>svg]:ease-in-out data-[side=left]:data-[state=collapsed]:[&>svg]:rotate-180 data-[side=right]:data-[state=expanded]:[&>svg]:rotate-180 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground',
          className,
        )}
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
      className={cn(
        'min-w-0 truncate group-data-[state=collapsed]/sidebar-panel:sr-only',
        className,
      )}
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
      className={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1 [&>*:only-child]:w-full group-data-[state=collapsed]/sidebar-panel:[&>*:only-child]:w-auto',
        className,
      )}
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
      className={cn(
        'flex min-h-0 flex-auto [scrollbar-gutter:stable] flex-col overflow-auto overscroll-contain group-data-[state=collapsed]/sidebar-panel:[scrollbar-width:none] group-data-[state=collapsed]/sidebar-panel:[scrollbar-gutter:auto] group-data-[state=collapsed]/sidebar-panel:overflow-x-hidden group-data-[state=collapsed]/sidebar-panel:overflow-y-auto motion-reduce:transition-none',
        className,
      )}
      {...props}
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
        data-slot="sidebar-expanded-content"
        className={className}
        {...props}
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
        data-slot="sidebar-collapsed-content"
        className={className}
        {...props}
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
      data-slot="sidebar-footer"
      className={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1',
        className,
      )}
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
      className={cn(
        'group/sidebar-group flex flex-col gap-1 p-3 group-has-[[data-slot=sidebar-group-action]]/sidebar-group:grid group-has-[[data-slot=sidebar-group-action]]/sidebar-group:grid-cols-[minmax(0,1fr)_auto] group-has-[[data-slot=sidebar-group-action]]/sidebar-group:gap-x-2 group-has-[[data-slot=sidebar-group-action]]/sidebar-group:gap-y-1 group-data-[state=collapsed]/sidebar-panel:px-1',
        className,
      )}
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
        className={cn(
          'min-w-0 truncate px-2 text-xs leading-4 font-medium text-muted-foreground group-has-[[data-slot=sidebar-group-action]]/sidebar-group:col-start-1 group-has-[[data-slot=sidebar-group-action]]/sidebar-group:flex group-has-[[data-slot=sidebar-group-action]]/sidebar-group:min-h-control-xs group-has-[[data-slot=sidebar-group-action]]/sidebar-group:items-center group-data-[state=collapsed]/sidebar-panel:sr-only',
          className,
        )}
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
        className={cn(
          'focus-visible:outline-offset-0.5 inline-flex size-control-xs cursor-pointer appearance-none items-center justify-center rounded-md border-0 bg-transparent p-0 text-muted-foreground outline-0 transition-[background-color,color] duration-200 ease-in-out group-has-[[data-slot=sidebar-group-action]]/sidebar-group:col-start-2 group-has-[[data-slot=sidebar-group-action]]/sidebar-group:me-2 group-has-[[data-slot=sidebar-group-action]]/sidebar-group:self-center group-data-[state=collapsed]/sidebar-panel:hidden focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none @max-[7rem]:hidden [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground',
          className,
        )}
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
        className={cn(
          'w-full min-w-0 group-has-[[data-slot=sidebar-group-action]]/sidebar-group:col-span-full',
          className,
        )}
        {...props}
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
        data-slot="sidebar-navigation-list"
        className={cn(
          'flex w-full min-w-0 flex-col gap-1 group-has-[[data-slot=sidebar-group-action]]/sidebar-group:col-span-full',
          className,
        )}
        {...props}
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
        data-slot="sidebar-navigation-item"
        className={cn('group/sidebar-navigation-item relative min-w-0', className)}
        {...props}
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
      data-slot="sidebar-navigation-button"
      data-active={active ? '' : undefined}
      data-size={size}
      className={cn(
        'focus-visible:outline-offset-0.5 box-border flex min-h-control-md w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md border-0 bg-transparent px-2 py-1 text-start text-sm leading-5 whitespace-nowrap text-card-foreground no-underline outline-0 transition-[background-color,border-color,color,box-shadow] duration-200 ease-in-out select-none [font:inherit] group-data-[state=collapsed]/sidebar-panel:mx-auto group-data-[state=collapsed]/sidebar-panel:min-h-control-md group-data-[state=collapsed]/sidebar-panel:w-control-md group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:border-transparent group-data-[state=collapsed]/sidebar-panel:bg-transparent group-data-[state=collapsed]/sidebar-panel:px-0 group-data-[state=collapsed]/sidebar-panel:shadow-none group-data-[state=collapsed]/sidebar-panel:group-has-[[data-slot=sidebar-navigation-action]]/sidebar-navigation-item:pe-0 group-data-[state=collapsed]/sidebar-panel:group-has-[[data-slot=sidebar-navigation-badge]]/sidebar-navigation-item:pe-0 focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground data-[size=lg]:min-h-control-lg data-[size=sm]:min-h-control-sm data-[size=sm]:text-xs motion-reduce:transition-none group-data-[state=collapsed]/sidebar-panel:[&>*:not(svg):not([data-sidebar-icon]):not([data-slot=sidebar-label])]:hidden [&>[data-scope=select][data-part=indicator]]:ms-auto @max-[7rem]:[&>[data-scope=select][data-part=indicator]]:hidden [&>[data-sidebar-icon]]:shrink-0 group-data-[state=collapsed]/sidebar-panel:[&>[data-sidebar-icon]]:mx-auto [&>[data-slot=collapsible-indicator]]:ms-auto @max-[7rem]:[&>[data-slot=collapsible-indicator]]:hidden [&>[data-slot=menu-indicator]]:ms-auto @max-[7rem]:[&>[data-slot=menu-indicator]]:hidden @max-[7rem]:[&>[data-slot=select-indicator]]:hidden [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 group-data-[state=collapsed]/sidebar-panel:[&>svg]:mx-auto group-data-[state=collapsed]/sidebar-panel:[@media(hover:hover)]:hover:bg-transparent [@media(hover:hover)]:[&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
});

const SidebarNavigationAction = forwardRef<HTMLButtonElement, HTMLArkProps<'button'>>(
  function SidebarNavigationAction({ className, type = 'button', ...props }, ref) {
    return (
      <ark.button
        ref={ref}
        type={type}
        data-scope="sidebar"
        data-part="navigation-action"
        data-slot="sidebar-navigation-action"
        className={cn(
          'focus-visible:outline-offset-0.5 absolute end-2 top-1/2 z-1 box-border inline-flex size-control-xs -translate-y-1/2 cursor-pointer appearance-none items-center justify-center rounded-md border-0 bg-transparent p-0 text-muted-foreground outline-0 transition-[background-color,color] duration-200 ease-in-out group-has-[[data-slot=sidebar-navigation-badge]]/sidebar-navigation-item:end-[2.3125rem] group-data-[state=collapsed]/sidebar-panel:hidden focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none @max-[7rem]:hidden [&>svg]:size-4 [@media(hover:hover)]:hover:bg-accent [@media(hover:hover)]:hover:text-accent-foreground',
          className,
        )}
        {...props}
      />
    );
  },
);

const SidebarNavigationBadge = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarNavigationBadge({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        data-scope="sidebar"
        data-part="navigation-badge"
        data-slot="sidebar-navigation-badge"
        className={cn(
          'absolute end-[2.3125rem] top-1/2 z-1 inline-flex min-h-[1.125rem] min-w-[1.125rem] -translate-y-1/2 items-center justify-center rounded-full bg-accent px-0.5 text-[0.625rem] leading-none font-medium text-accent-foreground tabular-nums group-data-[state=collapsed]/sidebar-panel:hidden @max-[7rem]:hidden',
          className,
        )}
        {...props}
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
        data-slot="sidebar-navigation-sub-list"
        className={cn(
          'ms-4 mt-1 box-border flex w-auto min-w-0 flex-col gap-1 border-s border-border ps-2 group-data-[state=collapsed]/sidebar-panel:hidden',
          className,
        )}
        {...props}
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
        data-slot="sidebar-navigation-sub-item"
        className={cn('min-w-0', className)}
        {...props}
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
      data-slot="sidebar-navigation-sub-button"
      data-active={active ? '' : undefined}
      className={cn(
        'focus-visible:outline-offset-0.5 box-border flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md border-0 bg-transparent px-2 text-start text-sm leading-5 whitespace-nowrap text-card-foreground no-underline outline-0 transition-[background-color,border-color,color,box-shadow] duration-200 ease-in-out select-none [font:inherit] focus-visible:outline-2 focus-visible:outline-ring disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:cursor-default aria-disabled:opacity-50 data-active:bg-accent data-active:font-medium data-active:text-accent-foreground motion-reduce:transition-none [&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [@media(hover:hover)]:[&:not(:disabled):not([aria-disabled=true])]:hover:bg-accent [@media(hover:hover)]:[&:not(:disabled):not([aria-disabled=true])]:hover:text-accent-foreground',
        className,
      )}
      {...props}
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
        data-slot="sidebar-input"
        className={cn('w-full', className)}
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
      className={cn('border-border', className)}
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
  ExpandedContent: SidebarExpandedContent,
  CollapsedContent: SidebarCollapsedContent,
  Footer: SidebarFooter,
  Separator: SidebarSeparator,
  Group: SidebarGroup,
  GroupLabel: SidebarGroupLabel,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  NavigationList: SidebarNavigationList,
  NavigationItem: SidebarNavigationItem,
  Tooltip: SidebarTooltip,
  NavigationButton: SidebarNavigationButton,
  NavigationAction: SidebarNavigationAction,
  NavigationBadge: SidebarNavigationBadge,
  NavigationSubList: SidebarNavigationSubList,
  NavigationSubItem: SidebarNavigationSubItem,
  NavigationSubButton: SidebarNavigationSubButton,
});

export { Sidebar, useSidebar };