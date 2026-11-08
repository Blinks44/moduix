<script module lang="ts">
  import type { SplitterPanelProps } from '@ark-ui/svelte/splitter';

  export interface SidebarPanelProps extends Omit<SplitterPanelProps, 'id'> {}
</script>

<script lang="ts">
  import { SplitterPanel } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import splitterStyles from '../splitter/Splitter.module.css';
  import { useSidebar, useSidebarConfig } from './context';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarPanelProps = $props();

  const { panelId } = useSidebarConfig();
  const sidebar = useSidebar();
</script>

<SplitterPanel
  {...props}
  bind:ref
  id={panelId()}
  class={clsx(splitterStyles.panel, styles.panel, className)}
  data-side={sidebar.side}
  data-state={sidebar.state}
  data-slot="sidebar-panel"
/>