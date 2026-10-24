import type { HTMLArkProps } from '@ark-ui/solid/factory';
import { ark } from '@ark-ui/solid/factory';
import { Splitter as SplitterPrimitive } from '@ark-ui/solid/splitter';
import type { Accessor, ComponentProps } from 'solid-js';
import { createContext, splitProps, useContext } from 'solid-js';
import { a11yLabels } from '@/lib/moduix/a11yLabels';
import { callEventHandler } from '@/lib/moduix/callEventHandler';
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

const SidebarConfigContext = createContext<{
  panelId: Accessor<string>;
  side: Accessor<SidebarSide>;
}>({
  panelId: () => 'sidebar',
  side: (): SidebarSide => 'left',
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

function Sidebar(props: SidebarRootProps) {
  const [local, others] = splitProps(props, ['class', 'defaultSize', 'panelId', 'side', 'style']);
  const panelId = () => local.panelId ?? 'sidebar';
  const side = () => local.side ?? 'left';

  return (
    <SidebarConfigContext.Provider value={{ panelId, side }}>
      <SplitterPrimitive.Root
        {...others}
        panels={getPanels(side(), panelId())}
        defaultSize={local.defaultSize ?? getDefaultSize(side())}
        orientation="horizontal"
        data-side={side()}
        data-slot="sidebar-root"
        class={cn(
          'relative isolate h-dvh min-h-96 w-full min-w-0 border border-sidebar-border bg-background text-foreground data-dragging:cursor-col-resize',
          local.class,
        )}
        style={
          typeof local.style === 'string'
            ? `width:;height:;${local.style}`
            : { width: undefined, height: undefined, ...local.style }
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
    side: config.side,
    state: () => (collapsed() ? 'collapsed' : 'expanded'),
    toggleSidebar: () => {
      if (collapsed()) splitter().expandPanel(config.panelId());
      else splitter().collapsePanel(config.panelId());
    },
  };
}

function SidebarPanel(props: SidebarPanelProps) {
  const [local, others] = splitProps(props, ['class']);
  const config = useContext(SidebarConfigContext);
  const sidebar = useSidebar();

  return (
    <SplitterPrimitive.Panel
      {...others}
      id={config.panelId()}
      data-side={sidebar.side()}
      data-slot="sidebar-panel"
      data-state={sidebar.state()}
      class={cn(
        'group/sidebar-panel @container/sidebar-panel relative flex min-w-0 flex-col overflow-hidden bg-sidebar text-sidebar-foreground data-dragging:select-none',
        local.class,
      )}
    />
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
      class={cn(
        'relative min-w-0 overflow-auto bg-background text-foreground data-dragging:select-none',
        local.class,
      )}
    />
  );
}

function SidebarResizeTrigger(props: SidebarResizeTriggerProps) {
  const [local, others] = splitProps(props, ['aria-label', 'asChild', 'class', 'children']);
  const config = useContext(SidebarConfigContext);

  return (
    <SplitterPrimitive.ResizeTrigger
      type={local.asChild ? undefined : 'button'}
      {...others}
      asChild={local.asChild}
      id={config.side() === 'left' ? `${config.panelId()}:content` : `content:${config.panelId()}`}
      aria-label={local['aria-label'] ?? a11yLabels.resizeSidebar}
      data-side={config.side()}
      data-slot="sidebar-resize-trigger"
      class={cn(
        "group/trigger relative z-2 flex w-px min-w-px cursor-col-resize appearance-none items-center justify-center border-0 bg-transparent p-0 outline-0 transition-opacity duration-normal ease-in-out before:absolute before:h-full before:w-[0.5px] before:rounded-full before:bg-sidebar-border before:transition-[background-color] before:duration-normal before:ease-in-out before:content-[''] after:absolute after:z-1 after:h-full after:w-3 after:content-['']",
        'data-disabled:cursor-default data-disabled:opacity-disabled data-dragging:before:bg-muted-foreground/40 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-focus [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-offset-1 [&:focus-visible:not([data-dragging]):not(:has([data-slot=splitter-resize-trigger-indicator]))]:after:outline-ring [@media(hover:hover)]:[&:not(:disabled):not([data-disabled]):hover]:before:bg-muted-foreground/40',
        local.class,
      )}
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
  const [local, others] = splitProps(props, [
    'aria-label',
    'asChild',
    'children',
    'class',
    'onClick',
    'type',
  ]);
  const sidebar = useSidebar();

  return (
    <ark.button
      asChild={local.asChild}
      type={local.type ?? 'button'}
      aria-label={local['aria-label'] ?? a11yLabels.toggleSidebar}
      aria-expanded={!sidebar.collapsed()}
      class={cn(
        'relative z-4 -mx-3.5 inline-flex size-7 flex-none translate-y-10 cursor-pointer items-center justify-center rounded-full border border-sidebar-border bg-background p-0 text-muted-foreground shadow-sm outline-0 transition-colors duration-normal ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
        'focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled',
        "[&>svg]:transition-transform [&>svg]:duration-normal [&>svg]:ease-in-out data-[side=left]:data-[state=collapsed]:[&>svg]:rotate-180 data-[side=right]:data-[state=expanded]:[&>svg]:rotate-180 [&>svg:not([class*='size-'])]:size-4",
        local.class,
      )}
      onClick={(event) => {
        callEventHandler(local.onClick, event);
        if (!event.defaultPrevented) sidebar.toggleSidebar();
      }}
      {...others}
      data-scope="sidebar"
      data-part="trigger"
      data-side={sidebar.side()}
      data-state={sidebar.state()}
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
      class={cn('min-w-0 truncate group-data-[state=collapsed]/sidebar-panel:sr-only', local.class)}
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
      class={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1 [&>*:only-child]:w-full group-data-[state=collapsed]/sidebar-panel:[&>*:only-child]:w-auto',
        local.class,
      )}
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
      class={cn(
        'flex min-h-0 flex-auto [scrollbar-gutter:stable] flex-col overflow-auto overscroll-contain group-data-[state=collapsed]/sidebar-panel:[scrollbar-width:none] group-data-[state=collapsed]/sidebar-panel:[scrollbar-gutter:auto] group-data-[state=collapsed]/sidebar-panel:overflow-x-hidden',
        local.class,
      )}
      {...others}
      data-scope="sidebar"
      data-part="content"
      data-slot="sidebar-content"
    />
  );
}

function SidebarExpandedContent(props: HTMLArkProps<'div'>) {
  const { collapsed } = useSidebar();

  return (
    <ark.div
      {...props}
      data-scope="sidebar"
      data-part="expanded-content"
      data-slot="sidebar-expanded-content"
      hidden={collapsed()}
    />
  );
}

function SidebarCollapsedContent(props: HTMLArkProps<'div'>) {
  const { collapsed } = useSidebar();

  return (
    <ark.div
      {...props}
      data-scope="sidebar"
      data-part="collapsed-content"
      data-slot="sidebar-collapsed-content"
      hidden={!collapsed()}
    />
  );
}

function SidebarFooter(props: HTMLArkProps<'footer'>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <ark.footer
      class={cn(
        'flex flex-none items-center gap-2 p-3 group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-1',
        local.class,
      )}
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
      class={cn(
        'flex flex-col gap-1 p-3 group-data-[state=collapsed]/sidebar-panel:px-1',
        local.class,
      )}
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
      class={cn(
        'min-w-0 flex-1 truncate px-2 text-xs leading-4 font-medium text-muted-foreground group-data-[state=collapsed]/sidebar-panel:sr-only',
        local.class,
      )}
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
      class={cn('flex min-w-0 items-center gap-2', local.class)}
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
      class={cn(
        "me-2 inline-flex size-control-xs flex-none cursor-pointer items-center justify-center rounded-md p-0 text-muted-foreground outline-0 transition-colors duration-normal ease-in-out hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring @max-[7rem]:hidden [&>svg:not([class*='size-'])]:size-4",
        local.class,
      )}
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
      class={cn('flex w-full min-w-0 flex-col gap-1', local.class)}
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
      class={cn('relative min-w-0', local.class)}
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
      class={cn(
        'flex w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 py-1 text-start text-sm leading-5 whitespace-nowrap text-sidebar-foreground outline-0 transition-colors duration-normal ease-in-out group-data-[state=expanded]/sidebar-panel:@min-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-10',
        'focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&:not(:disabled):not([aria-disabled=true])]:hover:bg-sidebar-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-sidebar-accent-foreground',
        'group-data-[state=collapsed]/sidebar-panel:mx-auto group-data-[state=collapsed]/sidebar-panel:min-h-control-md group-data-[state=collapsed]/sidebar-panel:w-control-md group-data-[state=collapsed]/sidebar-panel:justify-center group-data-[state=collapsed]/sidebar-panel:px-0',
        "[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
        '[&>[data-scope=select][data-part=indicator]]:static [&>[data-scope=select][data-part=indicator]]:ms-auto [&>[data-scope=select][data-part=indicator]]:translate-none @max-[7rem]:[&>[data-scope=select][data-part=indicator]]:hidden',
        '[&>[data-slot=collapsible-indicator]]:ms-auto [&>[data-slot=collapsible-indicator]]:size-control-xs @max-[7rem]:[&>[data-slot=collapsible-indicator]]:hidden [&>[data-slot=collapsible-indicator]>svg]:size-3',
        '[&>[data-slot=menu-indicator]]:ms-auto [&>[data-slot=menu-indicator]]:size-control-xs [&>[data-slot=menu-indicator]]:leading-none [&>[data-slot=menu-indicator]]:text-muted-foreground @max-[7rem]:[&>[data-slot=menu-indicator]]:hidden [&>[data-slot=menu-indicator]>svg]:block [&>[data-slot=menu-indicator]>svg]:size-4',
        navigationButtonSizes[local.size ?? 'md'],
        local.class,
      )}
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
      class={cn(
        'pointer-events-none absolute end-2.5 top-1/2 z-1 inline-grid size-5 -translate-y-1/2 place-items-center rounded-full bg-primary text-[0.5625rem] leading-none font-medium text-primary-foreground tabular-nums @max-[7rem]:hidden',
        local.class,
      )}
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
      class={cn(
        'ms-4 mt-1 flex w-auto min-w-0 flex-col gap-1 border-s border-sidebar-border ps-2 group-data-[state=collapsed]/sidebar-panel:hidden',
        local.class,
      )}
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
      class={cn('relative min-w-0', local.class)}
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
      class={cn(
        'flex min-h-control-sm w-full min-w-0 cursor-pointer items-center gap-2 overflow-hidden rounded-md px-2 text-start text-sm leading-5 whitespace-nowrap text-sidebar-foreground outline-0 transition-colors duration-normal ease-in-out has-[+_[data-slot=sidebar-navigation-badge]]:pe-10 @max-[7rem]:has-[+_[data-slot=sidebar-navigation-badge]]:pe-2',
        'focus-visible:outline-focus focus-visible:outline-offset-focus focus-visible:outline-sidebar-ring disabled:pointer-events-none disabled:opacity-disabled aria-disabled:pointer-events-none aria-disabled:opacity-disabled data-active:bg-sidebar-accent data-active:font-medium data-active:text-sidebar-accent-foreground [&:not(:disabled):not([aria-disabled=true])]:hover:bg-sidebar-accent [&:not(:disabled):not([aria-disabled=true])]:hover:text-sidebar-accent-foreground',
        "[&>[data-sidebar-icon]]:shrink-0 [&>span:last-child]:min-w-0 [&>span:last-child]:truncate [&>svg]:shrink-0 [&>svg:not([class*='size-'])]:size-4",
        local.class,
      )}
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
      <TooltipTrigger asChild={local.children} />
      <TooltipPositioner>
        <TooltipContent>{local.content}</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}

function SidebarInput(props: ComponentProps<typeof Input>) {
  const [local, others] = splitProps(props, ['class']);

  return (
    <Input
      class={cn('w-full group-data-[state=collapsed]/sidebar-panel:hidden', local.class)}
      {...others}
    />
  );
}

function SidebarSeparator(props: ComponentProps<typeof Separator>) {
  const [local, others] = splitProps(props, ['class']);

  return <Separator class={cn('border-sidebar-border', local.class)} {...others} />;
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