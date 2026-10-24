'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { Splitter as SplitterPrimitive } from '@ark-ui/react/splitter';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import { createContext, forwardRef, useContext } from 'react';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
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
import splitterStyles from '../splitter/Splitter.module.css';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '../tooltip';
import styles from './Sidebar.module.css';

type SidebarSide = 'left' | 'right';
type SidebarNavigationButtonSize = 'sm' | 'md' | 'lg';
type SidebarRootProps = Omit<ComponentProps<typeof Splitter>, 'orientation' | 'panels'> & {
  panelId?: string;
  side?: SidebarSide;
};
type SidebarPanelProps = Omit<ComponentProps<typeof SplitterPanel>, 'id'>;
type SidebarResizeTriggerProps = Omit<ComponentProps<typeof SplitterResizeTrigger>, 'id'>;
type SidebarSizes = NonNullable<SidebarRootProps['defaultSize']>;

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
          className={clsx(splitterStyles.root, styles.root, className)}
          style={{
            width: 'var(--moduix-sidebar-width, 100%)',
            height: 'var(--moduix-sidebar-height, 100dvh)',
            ...style,
          }}
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
        className={clsx(splitterStyles.panel, styles.panel, className)}
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
        className={clsx(splitterStyles.panel, styles.inset, className)}
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
      className={clsx(splitterStyles.resizeTrigger, styles.resizeTrigger, className)}
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
        className={clsx(styles.trigger, className)}
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
      className={clsx(styles.label, className)}
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
      className={clsx(styles.header, className)}
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
      className={clsx(styles.content, className)}
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
      className={clsx(styles.footer, className)}
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
      className={clsx(styles.group, className)}
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
        className={clsx(styles.groupLabel, className)}
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
        className={clsx(styles.groupHeader, className)}
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
        className={clsx(styles.groupAction, className)}
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
        className={clsx(styles.menu, className)}
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
        className={clsx(styles.menuItem, className)}
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
      className={clsx(styles.menuButton, className)}
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
        className={clsx(styles.menuBadge, className)}
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
        className={clsx(styles.menuSub, className)}
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
        className={clsx(styles.menuSubItem, className)}
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
      className={clsx(styles.menuSubButton, className)}
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
    return <Input ref={ref} className={clsx(styles.input, className)} {...props} />;
  },
);

const SidebarSeparator = forwardRef<
  ComponentRef<typeof Separator>,
  ComponentProps<typeof Separator>
>(function SidebarSeparator({ className, ...props }, ref) {
  return <Separator ref={ref} className={clsx(styles.separator, className)} {...props} />;
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