'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { Splitter as SplitterPrimitive } from '@ark-ui/react/splitter';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { cn } from '@/lib/moduix/cn';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { Input } from '../input';
import { Separator } from '../separator';
import {
  Splitter,
  SplitterPanel,
  SplitterResizeTrigger,
  SplitterResizeTriggerIndicator,
  useSplitterContext,
  type SplitterPanelData,
} from '../splitter';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '../tooltip';

type SidebarSide = 'left' | 'right';
type SidebarNavigationButtonSize = 'sm' | 'md' | 'lg';
type SidebarRootProps = Omit<ComponentProps<typeof Splitter>, 'orientation' | 'panels'> & {
  panelId?: string;
  side?: SidebarSide;
};
type SidebarPanelProps = Omit<ComponentProps<typeof SplitterPanel>, 'id'>;
type SidebarResizeTriggerProps = Omit<ComponentProps<typeof SplitterResizeTrigger>, 'id'>;
type SidebarSizes = NonNullable<SidebarRootProps['defaultSize']>;

const navigationButtonSizes = {
  sm: 'min-h-control-sm text-xs',
  md: 'min-h-control-md',
  lg: 'min-h-control-lg',
} satisfies Record<SidebarNavigationButtonSize, string>;

const SidebarConfigContext = createContext<{ panelId: string; side: SidebarSide }>({
  panelId: 'sidebar',
  side: 'left',
});

function getPanels(side: SidebarSide, panelId: string): SplitterPanelData[] {
  const sidebar = {
    id: panelId,
    minSize: '3rem',
    maxSize: '18rem',
    collapsible: true,
    collapsedSize: '3rem',
  };
  const content = { id: 'content' };
  return side === 'left' ? [sidebar, content] : [content, sidebar];
}

function getDefaultSize(side: SidebarSide): SidebarSizes {
  const size: SidebarSizes = [];
  size[side === 'left' ? 0 : 1] = '16rem';
  return size;
}

const Sidebar = forwardRef<ComponentRef<typeof SplitterPrimitive.Root>, SidebarRootProps>(
  function Sidebar(
    { className, defaultSize, panelId = 'sidebar', side = 'left', style, ...props },
    ref,
  ) {
    return (
      <SidebarConfigContext.Provider value={{ panelId, side }}>
        <SplitterPrimitive.Root
          {...props}
          ref={ref}
          panels={getPanels(side, panelId)}
          defaultSize={defaultSize ?? getDefaultSize(side)}
          orientation="horizontal"
          data-side={side}
          data-slot="sidebar-root"
          className={cn(
            'relative isolate box-border h-dvh min-h-96 w-full min-w-0 border border-sidebar-border bg-background text-foreground data-dragging:cursor-col-resize',
            className,
          )}
          style={{ width: undefined, height: undefined, ...style }}
        />
      </SidebarConfigContext.Provider>
    );
  },
);

function useSidebar() {
  const { panelId, side } = useContext(SidebarConfigContext);
  const splitter = useSplitterContext();
  const collapsed = splitter.isPanelCollapsed(panelId);

  return {
    collapsed,
    side,
    state: collapsed ? 'collapsed' : 'expanded',
    toggleSidebar: () => {
      if (splitter.isPanelCollapsed(panelId)) splitter.expandPanel(panelId);
      else splitter.collapsePanel(panelId);
    },
  };
}

const SidebarPanel = forwardRef<ComponentRef<typeof SplitterPrimitive.Panel>, SidebarPanelProps>(
  function SidebarPanel({ className, ...props }, ref) {
    const { panelId } = useContext(SidebarConfigContext);
    const { side, state } = useSidebar();

    return (
      <SplitterPrimitive.Panel
        {...props}
        ref={ref}
        id={panelId}
        data-side={side}
        data-slot="sidebar-panel"
        data-state={state}
        className={cn(
          'group/sidebar-panel @container/sidebar-panel relative box-border flex min-w-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground data-dragging:select-none',
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
          'relative box-border min-w-0 overflow-auto bg-background text-foreground data-dragging:select-none',
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
  { asChild, children, className, 'aria-label': ariaLabel = a11yLabels.resizeSidebar, ...props },
  ref,
) {
  const { panelId, side } = useContext(SidebarConfigContext);

  return (
    <SplitterPrimitive.ResizeTrigger
      type={asChild ? undefined : 'button'}
      {...props}
      ref={ref}
      asChild={asChild}
      id={side === 'left' ? `${panelId}:content` : `content:${panelId}`}
      aria-label={ariaLabel}
      data-side={side}
      data-slot="sidebar-resize-trigger"
      className={cn(
        "group/trigger relative z-2 box-border flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-normal ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-sidebar-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-3 after:content-['']",
        'data-disabled:cursor-default data-disabled:opacity-50 data-dragging:before:bg-muted-foreground/40 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-2 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40',
        className,
      )}
    >
      {children === undefined && !asChild ? <SplitterResizeTriggerIndicator /> : children}
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
      'aria-label': ariaLabel = a11yLabels.toggleSidebar,
      ...props
    },
    ref,
  ) {
    const { collapsed, side, state, toggleSidebar } = useSidebar();

    return (
      <ark.button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        aria-expanded={!collapsed}
        className={cn(
          'relative z-4 -mx-3.5 inline-flex size-7 flex-none translate-y-10 cursor-pointer items-center justify-center rounded-full border border-sidebar-border bg-background p-0 text-muted-foreground shadow-sm outline-0 transition-colors duration-normal ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
          '[&>svg]:size-4 [&>svg]:transition-transform [&>svg]:duration-normal [&>svg]:ease-in-out data-[side=left]:data-[state=collapsed]:[&>svg]:rotate-180 data-[side=right]:data-[state=expanded]:[&>svg]:rotate-180',
          className,
        )}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggleSidebar();
        }}
        {...props}
        data-scope="sidebar"
        data-part="trigger"
        data-side={side}
        data-state={state}
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
      className={cn(
        'min-w-0 truncate group-data-[state=collapsed]/sidebar-panel:sr-only',
        className,
      )}
      {...props}
      data-scope="sidebar"
      data-part="label"
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
      className={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1 [&>*:only-child]:w-full group-data-[state=collapsed]/sidebar-panel:[&>*:only-child]:w-auto',
        className,
      )}
      {...props}
      data-scope="sidebar"
      data-part="header"
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
      className={cn(
        'flex min-h-0 flex-auto [scrollbar-gutter:stable] flex-col overflow-auto overscroll-contain group-data-[state=collapsed]/sidebar-panel:[scrollbar-width:none] group-data-[state=collapsed]/sidebar-panel:[scrollbar-gutter:auto] group-data-[state=collapsed]/sidebar-panel:overflow-x-hidden',
        className,
      )}
      {...props}
      data-scope="sidebar"
      data-part="content"
      data-slot="sidebar-content"
    />
  );
});

const SidebarExpandedContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarExpandedContent(props, ref) {
    const { collapsed } = useSidebar();

    return (
      <ark.div
        ref={ref}
        {...props}
        data-scope="sidebar"
        data-part="expanded-content"
        data-slot="sidebar-expanded-content"
        hidden={collapsed}
      />
    );
  },
);

const SidebarCollapsedContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarCollapsedContent(props, ref) {
    const { collapsed } = useSidebar();

    return (
      <ark.div
        ref={ref}
        {...props}
        data-scope="sidebar"
        data-part="collapsed-content"
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
      className={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1',
        className,
      )}
      {...props}
      data-scope="sidebar"
      data-part="footer"
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
      className={cn(
        'flex flex-col gap-1 p-3 group-data-[state=collapsed]/sidebar-panel:px-1',
        className,
      )}
      {...props}
      data-scope="sidebar"
      data-part="group"
      data-slot="sidebar-group"
    />
  );
});

const SidebarGroupLabel = forwardRef<HTMLHeadingElement, HTMLArkProps<'h3'>>(
  function SidebarGroupLabel({ className, ...props }, ref) {
    return (
      <ark.h3
        ref={ref}
        className={cn(
          'min-w-0 flex-1 truncate px-2 text-xs leading-4 font-medium text-muted-foreground group-data-[state=collapsed]/sidebar-panel:sr-only',
          className,
        )}
        {...props}
        data-scope="sidebar"
        data-part="group-label"
        data-slot="sidebar-group-label"
      />
    );
  },
);

const SidebarGroupHeader = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarGroupHeader({ className, ...props }, ref) {
    return (
      <ark.div
        ref={ref}
        className={cn('flex min-w-0 items-center gap-2', className)}
        {...props}
        data-scope="sidebar"
        data-part="group-header"
        data-slot="sidebar-group-header"
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
        className={cn(
          'me-2 inline-flex size-control-xs flex-none cursor-pointer items-center justify-center rounded-md p-0 text-muted-foreground outline-0 transition-colors duration-normal ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring @max-[7rem]:hidden [&>svg]:size-4',
          className,
        )}
        {...props}
        data-scope="sidebar"
        data-part="group-action"
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
        className={cn('flex w-full min-w-0 flex-col gap-1', className)}
        {...props}
        data-scope="sidebar"
        data-part="navigation-list"
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
        className={cn('relative min-w-0', className)}
        {...props}
        data-scope="sidebar"
        data-part="navigation-item"
        data-slot="sidebar-navigation-item"
      />
    );
  },
);

const SidebarNavigationButton = forwardRef<
  HTMLButtonElement,
  HTMLArkProps<'button'> & {
    active?: boolean;
    size?: SidebarNavigationButtonSize;
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
      className={cn(
        'flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-start text-sm leading-5 whitespace-nowrap text-sidebar-foreground outline-0 transition-colors duration-normal ease-in-out group-data-[state=expanded]/sidebar-panel:@min-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-10',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&:not(:disabled):not([aria-disabled=true])]:hover:bg-sidebar-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-sidebar-accent-foreground',
        'group-data-[state=collapsed]/sidebar-panel:mx-auto group-data-[state=collapsed]/sidebar-panel:min-h-control-md group-data-[state=collapsed]/sidebar-panel:w-control-md group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-0',
        '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        '[&>[data-scope=select][data-part=indicator]]:static [&>[data-scope=select][data-part=indicator]]:ms-auto [&>[data-scope=select][data-part=indicator]]:translate-none @max-[7rem]:[&>[data-scope=select][data-part=indicator]]:hidden',
        '[&>[data-slot=collapsible-indicator]]:ms-auto [&>[data-slot=collapsible-indicator]]:size-control-xs @max-[7rem]:[&>[data-slot=collapsible-indicator]]:hidden [&>[data-slot=collapsible-indicator]>svg]:size-3',
        '[&>[data-slot=menu-indicator]]:ms-auto [&>[data-slot=menu-indicator]]:size-control-xs [&>[data-slot=menu-indicator]]:leading-none [&>[data-slot=menu-indicator]]:text-muted-foreground @max-[7rem]:[&>[data-slot=menu-indicator]]:hidden [&>[data-slot=menu-indicator]>svg]:block [&>[data-slot=menu-indicator]>svg]:size-4',
        navigationButtonSizes[size],
        className,
      )}
      {...props}
      data-scope="sidebar"
      data-part="navigation-button"
      data-active={active ? '' : undefined}
      data-size={size}
      data-slot="sidebar-navigation-button"
    />
  );
});

const SidebarNavigationBadge = forwardRef<HTMLSpanElement, HTMLArkProps<'span'>>(
  function SidebarNavigationBadge({ className, ...props }, ref) {
    return (
      <ark.span
        ref={ref}
        className={cn(
          'pointer-events-none absolute end-2.5 top-1/2 z-1 box-border inline-grid size-5 -translate-y-1/2 place-items-center rounded-full bg-primary text-[0.5625rem] leading-none font-medium text-primary-foreground tabular-nums @max-[7rem]:hidden',
          className,
        )}
        {...props}
        data-scope="sidebar"
        data-part="navigation-badge"
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
        className={cn(
          'ms-4 mt-1 flex w-auto min-w-0 flex-col gap-1 border-s border-sidebar-border ps-2 group-data-[state=collapsed]/sidebar-panel:hidden',
          className,
        )}
        {...props}
        data-scope="sidebar"
        data-part="navigation-sub-list"
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
        className={cn('relative min-w-0', className)}
        {...props}
        data-scope="sidebar"
        data-part="navigation-sub-item"
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
  { active = false, className, 'aria-current': ariaCurrent, ...props },
  ref,
) {
  return (
    <ark.a
      ref={ref}
      aria-current={ariaCurrent ?? (active ? 'page' : undefined)}
      className={cn(
        'flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-start text-sm leading-5 whitespace-nowrap text-sidebar-foreground outline-0 transition-colors duration-normal ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&:not(:disabled):not([aria-disabled=true])]:hover:bg-sidebar-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-sidebar-accent-foreground',
        '[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0',
        className,
      )}
      {...props}
      data-scope="sidebar"
      data-part="navigation-sub-button"
      data-active={active ? '' : undefined}
      data-slot="sidebar-navigation-sub-button"
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
  children: ComponentProps<typeof TooltipTrigger>['children'];
  content: ComponentProps<typeof TooltipContent>['children'];
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
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>{content}</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
};

const SidebarInput = forwardRef<ComponentRef<typeof Input>, ComponentProps<typeof Input>>(
  function SidebarInput({ className, ...props }, ref) {
    return (
      <Input
        ref={ref}
        className={cn('w-full group-data-[state=collapsed]/sidebar-panel:hidden', className)}
        {...props}
      />
    );
  },
);

const SidebarSeparator = forwardRef<
  ComponentRef<typeof Separator>,
  ComponentProps<typeof Separator>
>(function SidebarSeparator({ className, ...props }, ref) {
  return <Separator ref={ref} className={cn('border-sidebar-border', className)} {...props} />;
});

export {
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
  SidebarInput,
  SidebarInset,
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
  useSidebar,
};
export type { SidebarNavigationButtonSize, SidebarRootProps, SidebarSide };