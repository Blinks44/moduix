<script module lang="ts">
  import type { SplitterPanelData, SplitterRootProps } from '@ark-ui/svelte/splitter';
  import type { SidebarSide } from './context';

  type SidebarSizes = (number | string)[];

  export interface SidebarRootProps extends Omit<
    SplitterRootProps,
    'defaultSize' | 'orientation' | 'panels' | 'size'
  > {
    defaultSize?: SidebarSizes;
    panelId?: string;
    side?: SidebarSide;
    size?: SidebarSizes;
  }

  const getPanels = (side: SidebarSide, panelId: string): SplitterPanelData[] => {
    const sidebar = {
      id: panelId,
      minSize: '3rem',
      maxSize: '18rem',
      collapsible: true,
      collapsedSize: '3rem',
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
    defaultSize,
    panelId = 'sidebar',
    ref = $bindable(null),
    side = 'left',
    size = $bindable(),
    style,
    ...props
  }: SidebarRootProps = $props();

  provideSidebarContext({ panelId: () => panelId, side: () => side });

  const panels = $derived(getPanels(side, panelId));
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
  data-side={side}
  data-slot="sidebar-root"
/>