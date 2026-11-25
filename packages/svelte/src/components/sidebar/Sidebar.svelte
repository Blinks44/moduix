<script module lang="ts">
  import type { SplitterPanelData, SplitterRootProps } from '@ark-ui/svelte/splitter';
  import type { SidebarSide } from './context';

  type SidebarSizes = (number | string)[];

  export interface SidebarRootProps extends Omit<
    SplitterRootProps,
    'defaultSize' | 'orientation' | 'panels' | 'size'
  > {
    collapsedSize?: number | string;
    collapsible?: boolean;
    defaultMobileOpen?: boolean;
    defaultSize?: SidebarSizes;
    maxSize?: number | string;
    minSize?: number | string;
    mobileBreakpoint?: number | string;
    mobileOpen?: boolean;
    onMobileOpenChange?: (open: boolean) => void;
    panelId?: string;
    side?: SidebarSide;
    size?: SidebarSizes;
  }

  const formatBreakpoint = (breakpoint: number | string): string =>
    typeof breakpoint === 'number' ? `${breakpoint}px` : breakpoint;

  const getPanels = (
    side: SidebarSide,
    panelId: string,
    options: {
      collapsedSize: number | string;
      collapsible: boolean;
      maxSize: number | string;
      minSize: number | string;
    },
  ): SplitterPanelData[] => {
    const sidebar: SplitterPanelData = {
      id: panelId,
      minSize: options.minSize,
      maxSize: options.maxSize,
      collapsible: options.collapsible,
      ...(options.collapsible ? { collapsedSize: options.collapsedSize } : {}),
    };
    const content = { id: 'content' };
    return side === 'left' ? [sidebar, content] : [content, sidebar];
  };

  const getDefaultSize = (side: SidebarSide): SidebarSizes => {
    const size: SidebarSizes = [];
    size[side === 'left' ? 0 : 1] = '16rem';
    return size;
  };
</script>

<script lang="ts">
  import { SplitterRoot } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import splitterStyles from '../splitter/Splitter.module.css';
  import { provideSidebarContext } from './context';
  import styles from './Sidebar.module.css';

  let {
    class: className,
    collapsedSize = '3rem',
    collapsible = true,
    defaultMobileOpen = false,
    defaultSize,
    maxSize = '18rem',
    minSize = '3rem',
    mobileBreakpoint,
    mobileOpen = $bindable(),
    onMobileOpenChange,
    panelId = 'sidebar',
    ref = $bindable(null),
    side = 'left',
    size = $bindable(),
    style,
    ...props
  }: SidebarRootProps = $props();

  let isMobile = $state(false);
  let uncontrolledMobileOpen = $state<boolean | undefined>(undefined);
  const openMobile = $derived(mobileOpen ?? uncontrolledMobileOpen ?? defaultMobileOpen);

  const setOpenMobile = (open: boolean) => {
    if (mobileOpen === undefined) {
      uncontrolledMobileOpen = open;
    } else {
      mobileOpen = open;
    }
    onMobileOpenChange?.(open);
  };

  $effect(() => {
    if (
      mobileBreakpoint == null ||
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      isMobile = false;
      return;
    }
    const query = window.matchMedia(`(max-width: ${formatBreakpoint(mobileBreakpoint)})`);
    const sync = () => {
      isMobile = query.matches;
    };
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  });

  provideSidebarContext({
    isMobile: () => isMobile,
    openMobile: () => openMobile,
    panelId: () => panelId,
    setOpenMobile,
    side: () => side,
  });

  const panels = $derived(
    getPanels(side, panelId, { collapsedSize, collapsible, maxSize, minSize }),
  );
  const rootStyle = $derived(
    [
      'width: var(--moduix-sidebar-width, 100%)',
      'height: var(--moduix-sidebar-height, 100dvh)',
      style,
    ]
      .filter(Boolean)
      .join(';'),
  );
</script>

<SplitterRoot
  {...props}
  bind:ref
  bind:size
  {panels}
  defaultSize={defaultSize ?? getDefaultSize(side)}
  orientation="horizontal"
  class={clsx(splitterStyles.root, styles.root, className)}
  style={rootStyle}
  data-mobile={isMobile ? '' : undefined}
  data-side={side}
  data-slot="sidebar-root"
/>