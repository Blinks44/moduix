'use client';

import type { HTMLArkProps } from '@ark-ui/react/factory';
import { ark } from '@ark-ui/react/factory';
import { Splitter as SplitterPrimitive } from '@ark-ui/react/splitter';
import { clsx } from 'clsx';
import type { ComponentProps, ComponentRef } from 'react';
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import { ChevronLeftIcon } from '@/lib/moduix/icons/ui';
import { Drawer, DrawerPanel } from '../drawer';
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
  collapsedSize?: number | string;
  collapsible?: boolean;
  defaultMobileOpen?: boolean;
  maxSize?: number | string;
  minSize?: number | string;
  mobileBreakpoint?: number | string;
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;
  panelId?: string;
  side?: SidebarSide;
};
type SidebarPanelProps = Omit<ComponentProps<typeof SplitterPanel>, 'id'>;
type SidebarResizeTriggerProps = Omit<ComponentProps<typeof SplitterResizeTrigger>, 'id'>;
type SidebarSizes = NonNullable<SidebarRootProps['defaultSize']>;

interface SidebarConfigContextValue {
  isMobile: boolean;
  openMobile: boolean;
  panelId: string;
  setOpenMobile: (open: boolean) => void;
  side: SidebarSide;
}

const SidebarConfigContext = createContext<SidebarConfigContextValue>({
  isMobile: false,
  openMobile: false,
  panelId: 'sidebar',
  setOpenMobile: () => {},
  side: 'left',
});

function formatBreakpoint(breakpoint: number | string): string {
  return typeof breakpoint === 'number' ? `${breakpoint}px` : breakpoint;
}

function getPanels(
  side: SidebarSide,
  panelId: string,
  options: {
    collapsedSize: number | string;
    collapsible: boolean;
    maxSize: number | string;
    minSize: number | string;
  },
): SplitterPanelData[] {
  const sidebar: SplitterPanelData = {
    id: panelId,
    minSize: options.minSize,
    maxSize: options.maxSize,
    collapsible: options.collapsible,
    ...(options.collapsible ? { collapsedSize: options.collapsedSize } : {}),
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
    {
      className,
      collapsedSize = '3rem',
      collapsible = true,
      defaultMobileOpen = false,
      defaultSize,
      maxSize = '18rem',
      minSize = '3rem',
      mobileBreakpoint,
      mobileOpen,
      onMobileOpenChange,
      panelId = 'sidebar',
      side = 'left',
      style,
      ...props
    },
    ref,
  ) {
    const mediaQuery =
      mobileBreakpoint == null ? undefined : `(max-width: ${formatBreakpoint(mobileBreakpoint)})`;
    const subscribeMediaQuery = useCallback(
      (onStoreChange: () => void) => {
        if (
          mediaQuery == null ||
          typeof window === 'undefined' ||
          typeof window.matchMedia !== 'function'
        ) {
          return () => {};
        }
        const query = window.matchMedia(mediaQuery);
        query.addEventListener('change', onStoreChange);
        return () => query.removeEventListener('change', onStoreChange);
      },
      [mediaQuery],
    );
    const getMediaQuerySnapshot = useCallback(() => {
      if (
        mediaQuery == null ||
        typeof window === 'undefined' ||
        typeof window.matchMedia !== 'function'
      ) {
        return false;
      }
      return window.matchMedia(mediaQuery).matches;
    }, [mediaQuery]);
    const isMobile = useSyncExternalStore(subscribeMediaQuery, getMediaQuerySnapshot, () => false);
    const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = useState(defaultMobileOpen);
    const openMobile = mobileOpen ?? uncontrolledMobileOpen;

    const setOpenMobile = useCallback(
      (open: boolean) => {
        if (mobileOpen === undefined) {
          setUncontrolledMobileOpen(open);
        }
        onMobileOpenChange?.(open);
      },
      [mobileOpen, onMobileOpenChange],
    );

    const configValue = useMemo<SidebarConfigContextValue>(
      () => ({
        isMobile,
        openMobile,
        panelId,
        setOpenMobile,
        side,
      }),
      [isMobile, openMobile, panelId, setOpenMobile, side],
    );

    const panels = useMemo(
      () => getPanels(side, panelId, { collapsedSize, collapsible, maxSize, minSize }),
      [side, panelId, collapsedSize, collapsible, maxSize, minSize],
    );

    return (
      <SidebarConfigContext.Provider value={configValue}>
        <SplitterPrimitive.Root
          {...props}
          ref={ref}
          panels={panels}
          defaultSize={defaultSize ?? getDefaultSize(side)}
          orientation="horizontal"
          data-mobile={isMobile ? '' : undefined}
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
  const { isMobile, openMobile, panelId, setOpenMobile, side } = useContext(SidebarConfigContext);
  const splitter = useSplitterContext();
  const collapsed = splitter.isPanelCollapsed(panelId);

  return {
    collapsed,
    isMobile,
    openMobile,
    setOpenMobile,
    side,
    state: collapsed ? 'collapsed' : 'expanded',
    toggleSidebar: () => {
      if (isMobile) {
        setOpenMobile(!openMobile);
      } else if (splitter.isPanelCollapsed(panelId)) {
        splitter.expandPanel(panelId);
      } else {
        splitter.collapsePanel(panelId);
      }
    },
  };
}

const SidebarPanel = forwardRef<ComponentRef<typeof SplitterPrimitive.Panel>, SidebarPanelProps>(
  function SidebarPanel({ children, className, style, ...props }, ref) {
    const { isMobile, openMobile, panelId, setOpenMobile } = useContext(SidebarConfigContext);
    const { side, state } = useSidebar();

    if (isMobile) {
      return (
        <>
          <SplitterPrimitive.Panel id={panelId} hidden style={{ display: 'none' }} />
          <Drawer
            open={openMobile}
            onOpenChange={({ open }) => setOpenMobile(open)}
            swipeDirection={side === 'right' ? 'end' : 'start'}
          >
            <DrawerPanel size="sm" style={{ padding: 0 }}>
              <ark.div
                {...props}
                ref={ref}
                data-mobile=""
                data-side={side}
                data-slot="sidebar-panel"
                data-state="expanded"
                className={clsx(styles.panel, className)}
                style={{ width: '100%', height: '100%', ...style }}
              >
                {children}
              </ark.div>
            </DrawerPanel>
          </Drawer>
        </>
      );
    }

    return (
      <SplitterPrimitive.Panel
        {...props}
        ref={ref}
        id={panelId}
        data-side={side}
        data-slot="sidebar-panel"
        data-state={state}
        className={clsx(splitterStyles.panel, styles.panel, className)}
        style={style}
      >
        {children}
      </SplitterPrimitive.Panel>
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
  { asChild, children, className, hidden, 'aria-label': ariaLabelProp, ...props },
  ref,
) {
  const labels = useA11yLabels();
  const ariaLabel = ariaLabelProp === undefined ? labels.resizeSidebar : ariaLabelProp;
  const { isMobile, panelId, side } = useContext(SidebarConfigContext);

  return (
    <SplitterPrimitive.ResizeTrigger
      type={asChild ? undefined : 'button'}
      {...props}
      ref={ref}
      asChild={asChild}
      hidden={isMobile || hidden}
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
    { className, children, onClick, type = 'button', 'aria-label': ariaLabelProp, ...props },
    ref,
  ) {
    const labels = useA11yLabels();
    const ariaLabel = ariaLabelProp === undefined ? labels.toggleSidebar : ariaLabelProp;
    const { collapsed, isMobile, openMobile, side, state, toggleSidebar } = useSidebar();
    const expanded = isMobile ? openMobile : !collapsed;
    const triggerState = isMobile ? (openMobile ? 'expanded' : 'collapsed') : state;

    return (
      <ark.button
        ref={ref}
        type={type}
        aria-label={ariaLabel}
        aria-expanded={expanded}
        className={clsx(styles.trigger, className)}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) toggleSidebar();
        }}
        {...props}
        data-scope="sidebar"
        data-part="trigger"
        data-side={side}
        data-state={triggerState}
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
    const { collapsed, isMobile } = useSidebar();

    return (
      <ark.div
        ref={ref}
        {...props}
        data-scope="sidebar"
        data-part="expanded-content"
        data-slot="sidebar-expanded-content"
        hidden={!isMobile && collapsed}
      />
    );
  },
);

const SidebarCollapsedContent = forwardRef<HTMLDivElement, HTMLArkProps<'div'>>(
  function SidebarCollapsedContent(props, ref) {
    const { collapsed, isMobile } = useSidebar();

    return (
      <ark.div
        ref={ref}
        {...props}
        data-scope="sidebar"
        data-part="collapsed-content"
        data-slot="sidebar-collapsed-content"
        hidden={isMobile || !collapsed}
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

const SidebarTooltip = forwardRef<
  ComponentRef<typeof TooltipTrigger>,
  Omit<ComponentProps<typeof Tooltip>, 'children' | 'disabled' | 'positioning'> & {
    children: ComponentProps<typeof TooltipTrigger>['children'];
    content: ComponentProps<typeof TooltipContent>['children'];
    positioning?: ComponentProps<typeof Tooltip>['positioning'];
  }
>(function SidebarTooltip(
  { children, content, openDelay = 200, closeDelay = 0, positioning, ...props },
  ref,
) {
  const { collapsed, isMobile, side } = useSidebar();

  return (
    <Tooltip
      {...props}
      openDelay={openDelay}
      closeDelay={closeDelay}
      disabled={isMobile || !collapsed}
      positioning={{ placement: side === 'left' ? 'right' : 'left', gutter: 8, ...positioning }}
    >
      <TooltipTrigger ref={ref} asChild>
        {children}
      </TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>{content}</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
});

const SidebarInput = forwardRef<ComponentRef<typeof Input>, ComponentProps<typeof Input>>(
  function SidebarInput({ className, ...props }, ref) {
    return (
      <Input
        ref={ref}
        className={clsx(styles.input, className)}
        data-slot="sidebar-input"
        {...props}
      />
    );
  },
);

const SidebarSeparator = forwardRef<
  ComponentRef<typeof Separator>,
  ComponentProps<typeof Separator>
>(function SidebarSeparator({ className, ...props }, ref) {
  return (
    <Separator
      ref={ref}
      className={clsx(styles.separator, className)}
      data-slot="sidebar-separator"
      {...props}
    />
  );
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