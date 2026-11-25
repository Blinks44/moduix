import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { Splitter as SplitterPrimitive } from '@ark-ui/solid/splitter';
import { clsx } from 'clsx';
import type { Accessor, ComponentProps } from 'solid-js';
import {
  Show,
  createContext,
  createEffect,
  createSignal,
  onCleanup,
  splitProps,
  useContext,
} from 'solid-js';
import { useA11yLabels } from '@/lib/moduix/a11yLabels';
import { callEventHandler } from '@/lib/moduix/callEventHandler';
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
  isMobile: Accessor<boolean>;
  openMobile: Accessor<boolean>;
  panelId: Accessor<string>;
  setOpenMobile: (open: boolean) => void;
  side: Accessor<SidebarSide>;
}

const SidebarConfigContext = createContext<SidebarConfigContextValue>({
  isMobile: () => false,
  openMobile: () => false,
  panelId: () => 'sidebar',
  setOpenMobile: () => {},
  side: (): SidebarSide => 'left',
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

function Sidebar(props: SidebarRootProps) {
  const [local, others] = splitProps(props, [
    'class',
    'collapsedSize',
    'collapsible',
    'defaultMobileOpen',
    'defaultSize',
    'maxSize',
    'minSize',
    'mobileBreakpoint',
    'mobileOpen',
    'onMobileOpenChange',
    'panelId',
    'side',
    'style',
  ]);
  const panelId = () => local.panelId ?? 'sidebar';
  const side = () => local.side ?? 'left';
  const [isMobile, setIsMobile] = createSignal(false);
  const [uncontrolledMobileOpen, setUncontrolledMobileOpen] = createSignal(
    Boolean(local.defaultMobileOpen),
  );
  const openMobile = () => local.mobileOpen ?? uncontrolledMobileOpen();
  const setOpenMobile = (open: boolean) => {
    if (local.mobileOpen === undefined) {
      setUncontrolledMobileOpen(open);
    }
    local.onMobileOpenChange?.(open);
  };

  createEffect(() => {
    const bp = local.mobileBreakpoint;
    if (bp == null || typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      setIsMobile(false);
      return;
    }
    const query = window.matchMedia(`(max-width: ${formatBreakpoint(bp)})`);
    const sync = () => setIsMobile(query.matches);
    sync();
    query.addEventListener('change', sync);
    onCleanup(() => query.removeEventListener('change', sync));
  });

  return (
    <SidebarConfigContext.Provider value={{ isMobile, openMobile, panelId, setOpenMobile, side }}>
      <SplitterPrimitive.Root
        {...others}
        panels={getPanels(side(), panelId(), {
          collapsedSize: local.collapsedSize ?? '3rem',
          collapsible: local.collapsible ?? true,
          maxSize: local.maxSize ?? '18rem',
          minSize: local.minSize ?? '3rem',
        })}
        defaultSize={local.defaultSize ?? getDefaultSize(side())}
        orientation="horizontal"
        data-mobile={isMobile() ? '' : undefined}
        data-side={side()}
        data-slot="sidebar-root"
        class={clsx(splitterStyles.root, styles.root, local.class)}
        style={
          typeof local.style === 'string'
            ? `width:var(--moduix-sidebar-width, 100%);height:var(--moduix-sidebar-height, 100dvh);${local.style}`
            : {
                width: 'var(--moduix-sidebar-width, 100%)',
                height: 'var(--moduix-sidebar-height, 100dvh)',
                ...local.style,
              }
        }
      />
    </SidebarConfigContext.Provider>
  );
}

function useSidebar() {
  const config = useContext(SidebarConfigContext);
  const splitter = useSplitterContext();
  const collapsed = () => splitter().isPanelCollapsed(config.panelId());

  return {
    collapsed,
    isMobile: config.isMobile,
    openMobile: config.openMobile,
    setOpenMobile: config.setOpenMobile,
    side: config.side,
    state: () => (collapsed() ? 'collapsed' : 'expanded'),
    toggleSidebar: () => {
      if (config.isMobile()) {
        config.setOpenMobile(!config.openMobile());
      } else if (collapsed()) {
        splitter().expandPanel(config.panelId());
      } else {
        splitter().collapsePanel(config.panelId());
      }
    },
  };
}

function SidebarPanel(props: SidebarPanelProps) {
  const [local, others] = splitProps(props, ['children', 'class', 'style']);
  const config = useContext(SidebarConfigContext);
  const sidebar = useSidebar();

  return (
    <Show
      when={config.isMobile()}
      fallback={
        <SplitterPrimitive.Panel
          {...others}
          id={config.panelId()}
          data-side={sidebar.side()}
          data-slot="sidebar-panel"
          data-state={sidebar.state()}
          class={clsx(splitterStyles.panel, styles.panel, local.class)}
          style={local.style}
        >
          {local.children}
        </SplitterPrimitive.Panel>
      }
    >
      <SplitterPrimitive.Panel id={config.panelId()} hidden style={{ display: 'none' }} />
      <Drawer
        open={config.openMobile()}
        onOpenChange={({ open }) => config.setOpenMobile(open)}
        swipeDirection={sidebar.side() === 'right' ? 'end' : 'start'}
      >
        <DrawerPanel size="sm" style={{ padding: 0 }}>
          <ark.div
            {...others}
            data-mobile=""
            data-side={sidebar.side()}
            data-slot="sidebar-panel"
            data-state="expanded"
            class={clsx(styles.panel, local.class)}
            style={
              typeof local.style === 'string'
                ? `width:100%;height:100%;${local.style}`
                : { width: '100%', height: '100%', ...local.style }
            }
          >
            {local.children}
          </ark.div>
        </DrawerPanel>
      </Drawer>
    </Show>
  );
}

function SidebarInset(props: SidebarPanelProps) {
  const [local, others] = splitProps(props, ['class']);
  const config = useContext(SidebarConfigContext);

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
  const labels = useA11yLabels();
  const [local, others] = splitProps(props, [
    'aria-label',
    'asChild',
    'class',
    'children',
    'hidden',
  ]);
  const config = useContext(SidebarConfigContext);

  return (
    <SplitterPrimitive.ResizeTrigger
      type={local.asChild ? undefined : 'button'}
      {...others}
      asChild={local.asChild}
      hidden={config.isMobile() || local.hidden}
      id={config.side() === 'left' ? `${config.panelId()}:content` : `content:${config.panelId()}`}
      aria-label={local['aria-label'] ?? labels().resizeSidebar}
      data-side={config.side()}
      data-slot="sidebar-resize-trigger"
      class={clsx(splitterStyles.resizeTrigger, styles.resizeTrigger, local.class)}
    >
      {local.children === undefined && !local.asChild ? (
        <SplitterResizeTriggerIndicator />
      ) : (
        local.children
      )}
    </SplitterPrimitive.ResizeTrigger>
  );
}

function SidebarTrigger(props: HTMLArkProps<'button'>) {
  const labels = useA11yLabels();
  const [local, others] = splitProps(props, [
    'aria-label',
    'asChild',
    'children',
    'class',
    'onClick',
    'type',
  ]);
  const sidebar = useSidebar();
  const expanded = () => (sidebar.isMobile() ? sidebar.openMobile() : !sidebar.collapsed());
  const triggerState = () =>
    sidebar.isMobile() ? (sidebar.openMobile() ? 'expanded' : 'collapsed') : sidebar.state();

  return (
    <ark.button
      asChild={local.asChild}
      type={local.type ?? 'button'}
      aria-label={local['aria-label'] ?? labels().toggleSidebar}
      aria-expanded={expanded()}
      class={clsx(styles.trigger, local.class)}
      onClick={(event) => {
        callEventHandler(local.onClick, event);
        if (!event.defaultPrevented) sidebar.toggleSidebar();
      }}
      {...others}
      data-scope="sidebar"
      data-part="trigger"
      data-side={sidebar.side()}
      data-state={triggerState()}
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
      class={clsx(styles.label, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="label"
      data-slot="sidebar-label"
    />
  );
}

function SidebarHeader(props: HTMLArkProps<'header'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.header
      class={clsx(styles.header, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="header"
      data-slot="sidebar-header"
    />
  );
}

function SidebarContent(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.content, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="content"
      data-slot="sidebar-content"
    />
  );
}

function SidebarExpandedContent(props: HTMLArkProps<'div'>) {
  const { collapsed, isMobile } = useSidebar();

  return (
    <ark.div
      {...props}
      data-scope="sidebar"
      data-part="expanded-content"
      data-slot="sidebar-expanded-content"
      hidden={!isMobile() && collapsed()}
    />
  );
}

function SidebarCollapsedContent(props: HTMLArkProps<'div'>) {
  const { collapsed, isMobile } = useSidebar();

  return (
    <ark.div
      {...props}
      data-scope="sidebar"
      data-part="collapsed-content"
      data-slot="sidebar-collapsed-content"
      hidden={isMobile() || !collapsed()}
    />
  );
}

function SidebarFooter(props: HTMLArkProps<'footer'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.footer
      class={clsx(styles.footer, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="footer"
      data-slot="sidebar-footer"
    />
  );
}

function SidebarGroup(props: HTMLArkProps<'section'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.section
      class={clsx(styles.group, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="group"
      data-slot="sidebar-group"
    />
  );
}

function SidebarGroupLabel(props: HTMLArkProps<'h3'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.h3
      class={clsx(styles.groupLabel, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="group-label"
      data-slot="sidebar-group-label"
    />
  );
}

function SidebarGroupHeader(props: HTMLArkProps<'div'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.div
      class={clsx(styles.groupHeader, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="group-header"
      data-slot="sidebar-group-header"
    />
  );
}

function SidebarGroupAction(props: HTMLArkProps<'button'>) {
  const [local, others] = splitProps(props, ['class', 'type']);

  return (
    <ark.button
      type={local.type ?? 'button'}
      class={clsx(styles.groupAction, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="group-action"
      data-slot="sidebar-group-action"
    />
  );
}

function SidebarNavigationList(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ul
      class={clsx(styles.menu, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="navigation-list"
      data-slot="sidebar-navigation-list"
    />
  );
}

function SidebarNavigationItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      class={clsx(styles.menuItem, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="navigation-item"
      data-slot="sidebar-navigation-item"
    />
  );
}

function SidebarNavigationButton(
  props: HTMLArkProps<'button'> & {
    active?: boolean;
    size?: SidebarNavigationButtonSize;
  },
) {
  const [local, others] = splitProps(props, ['active', 'aria-current', 'class', 'size', 'type']);

  return (
    <ark.button
      type={local.type ?? 'button'}
      aria-current={local['aria-current'] ?? (local.active ? 'page' : undefined)}
      class={clsx(styles.menuButton, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="navigation-button"
      data-active={local.active ? '' : undefined}
      data-size={local.size ?? 'md'}
      data-slot="sidebar-navigation-button"
    />
  );
}

function SidebarNavigationBadge(props: HTMLArkProps<'span'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.span
      class={clsx(styles.menuBadge, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="navigation-badge"
      data-slot="sidebar-navigation-badge"
    />
  );
}

function SidebarNavigationSubList(props: HTMLArkProps<'ul'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.ul
      class={clsx(styles.menuSub, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="navigation-sub-list"
      data-slot="sidebar-navigation-sub-list"
    />
  );
}

function SidebarNavigationSubItem(props: HTMLArkProps<'li'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.li
      class={clsx(styles.menuSubItem, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="navigation-sub-item"
      data-slot="sidebar-navigation-sub-item"
    />
  );
}

function SidebarNavigationSubButton(
  props: HTMLArkProps<'a'> & {
    active?: boolean;
  },
) {
  const [local, others] = splitProps(props, ['active', 'aria-current', 'class']);

  return (
    <ark.a
      aria-current={local['aria-current'] ?? (local.active ? 'page' : undefined)}
      class={clsx(styles.menuSubButton, local.class)}
      {...others}
      data-scope="sidebar"
      data-part="navigation-sub-button"
      data-active={local.active ? '' : undefined}
      data-slot="sidebar-navigation-sub-button"
    />
  );
}

function SidebarTooltip(
  props: Omit<ComponentProps<typeof Tooltip>, 'children' | 'disabled' | 'positioning'> & {
    children: NonNullable<ComponentProps<typeof TooltipTrigger>['asChild']>;
    content: ComponentProps<typeof TooltipContent>['children'];
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
  const { collapsed, isMobile, side } = useSidebar();

  return (
    <Tooltip
      {...others}
      openDelay={local.openDelay ?? 200}
      closeDelay={local.closeDelay ?? 0}
      disabled={isMobile() || !collapsed()}
      positioning={{
        placement: side() === 'left' ? 'right' : 'left',
        gutter: 8,
        ...local.positioning,
      }}
    >
      <TooltipTrigger asChild={local.children} />
      <TooltipPositioner>
        <TooltipContent>{local.content}</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}

function SidebarInput(props: ComponentProps<typeof Input>) {
  const [local, others] = splitProps(props, ['class']);

  return <Input class={clsx(styles.input, local.class)} data-slot="sidebar-input" {...others} />;
}

function SidebarSeparator(props: ComponentProps<typeof Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Separator
      class={clsx(styles.separator, local.class)}
      data-slot="sidebar-separator"
      {...others}
    />
  );
}

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