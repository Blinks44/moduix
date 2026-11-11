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
  import { cn } from '@/lib/moduix/cn';
  import { provideSidebarContext } from './context';

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
  // Ark sets inline width and height of 100%; clear them so consumer sizes and classes apply.
  const rootStyle = $derived(['width:', 'height:', style].filter(Boolean).join(';'));
</script>

<SplitterRoot
  {...props}
  bind:ref
  bind:size
  {panels}
  defaultSize={defaultSize ?? getDefaultSize(side)}
  orientation="horizontal"
  class={cn(
    'relative isolate h-dvh min-h-96 w-full min-w-0 border border-sidebar-border bg-background text-foreground data-dragging:cursor-col-resize',
    className,
  )}
  style={rootStyle}
  data-side={side}
  data-slot="sidebar-root"
/>