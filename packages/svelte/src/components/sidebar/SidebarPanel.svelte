<script module lang="ts">
  import type { SplitterPanelProps } from '@ark-ui/svelte/splitter';

  export interface SidebarPanelProps extends Omit<SplitterPanelProps, 'id'> {}
</script>

<script lang="ts">
  import { Ark } from '@ark-ui/svelte/factory';
  import { SplitterPanel } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import Drawer from '../drawer/Drawer.svelte';
  import DrawerPanel from '../drawer/DrawerPanel.svelte';
  import splitterStyles from '../splitter/Splitter.module.css';
  import { useSidebar, useSidebarConfig } from './context';
  import styles from './Sidebar.module.css';

  let {
    children,
    class: className,
    ref = $bindable(null),
    style,
    ...props
  }: SidebarPanelProps = $props();

  const { panelId } = useSidebarConfig();
  const sidebar = useSidebar();
  const mobileStyle = $derived(['width: 100%', 'height: 100%', style].filter(Boolean).join(';'));
</script>

{#if sidebar.isMobile}
  <SplitterPanel id={panelId()} hidden style="display: none" />
  <Drawer
    open={sidebar.openMobile}
    onOpenChange={({ open }) => sidebar.setOpenMobile(open)}
    swipeDirection={sidebar.side === 'right' ? 'end' : 'start'}
  >
    <DrawerPanel size="sm" style="padding: 0">
      <Ark
        as="div"
        {...props}
        bind:ref
        class={clsx(styles.panel, className)}
        style={mobileStyle}
        data-mobile=""
        data-side={sidebar.side}
        data-state="expanded"
        data-slot="sidebar-panel"
      >
        {@render children?.()}
      </Ark>
    </DrawerPanel>
  </Drawer>
{:else}
  <SplitterPanel
    {...props}
    bind:ref
    id={panelId()}
    class={clsx(splitterStyles.panel, styles.panel, className)}
    {style}
    data-side={sidebar.side}
    data-state={sidebar.state}
    data-slot="sidebar-panel"
  >
    {@render children?.()}
  </SplitterPanel>
{/if}