<script module lang="ts">
  import type { SplitterPanelProps } from '@ark-ui/svelte/splitter';

  export interface SidebarInsetProps extends Omit<SplitterPanelProps, 'id'> {}
</script>

<script lang="ts">
  import { SplitterPanel } from '@ark-ui/svelte/splitter';
  import { clsx } from 'clsx';
  import splitterStyles from '../splitter/Splitter.module.css';
  import { useSidebarConfig } from './context';
  import styles from './Sidebar.module.css';

  let { class: className, ref = $bindable(null), ...props }: SidebarInsetProps = $props();

  const { side } = useSidebarConfig();
</script>

<SplitterPanel
  {...props}
  bind:ref
  id="content"
  class={clsx(splitterStyles.panel, styles.inset, className)}
  data-side={side()}
  data-slot="sidebar-inset"
/>