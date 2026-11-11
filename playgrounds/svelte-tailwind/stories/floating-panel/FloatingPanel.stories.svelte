<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    FloatingPanel,
    FloatingPanelContext,
    FloatingPanelRootProvider,
    FloatingPanelTrigger,
    useFloatingPanel,
  } from '@/components/floating-panel';
  import FloatingPanelSurface from './FloatingPanelSurface.svelte';

  const DEFAULT_SIZE = { width: 360, height: 260 };
  const DEFAULT_POSITION = { x: 160, y: 140 };

  const { Story } = defineMeta({
    title: 'Components/FloatingPanel',
    component: FloatingPanel,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const getAnchorPosition = ({ triggerRect }: { triggerRect: DOMRect | null }) => ({
    x: (triggerRect?.x ?? 0) + (triggerRect?.width ?? 0) / 2,
    y: (triggerRect?.y ?? 0) + (triggerRect?.height ?? 0) + 12,
  });

  const bodyStackClass = 'grid gap-3';
  const metricGridClass = 'grid grid-cols-2 gap-2';
  const metricClass = 'grid gap-1 rounded-md border border-border bg-background p-3';
  const stackClass = 'flex flex-col items-center gap-3';
  const statusClass = 'text-sm leading-5 text-muted-foreground';
  const triggerGroupClass = 'flex flex-wrap items-center justify-center gap-2';
  const customPanelClass = 'border-primary/80 bg-primary text-primary-foreground shadow-lg';
</script>

<script lang="ts">
  let open = $state(false);
  let position = $state(DEFAULT_POSITION);
  let size = $state(DEFAULT_SIZE);
  let exits = $state(0);
  const panel = useFloatingPanel({
    id: 'floating-panel-root-provider',
    defaultSize: DEFAULT_SIZE,
    persistRect: true,
  });
</script>

<Story name="Basic" asChild>
  <FloatingPanel defaultSize={DEFAULT_SIZE}>
    <FloatingPanelTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open panel</Button>{/snippet}
    </FloatingPanelTrigger>
    <FloatingPanelSurface title="Inspector" footer="Last synced just now">
      <div class={bodyStackClass}>
        <p>Drag the header to move this panel and resize it from any edge.</p>
        <div class={metricGridClass}>
          <div class={metricClass}><span>Width</span><strong>360</strong></div>
          <div class={metricClass}><span>Height</span><strong>260</strong></div>
        </div>
      </div>
    </FloatingPanelSurface>
  </FloatingPanel>
</Story>

<Story name="Controlled Open" asChild>
  <div class={stackClass}>
    <span class={statusClass}>Panel is {open ? 'open' : 'closed'}</span>
    <FloatingPanel bind:open defaultSize={DEFAULT_SIZE}>
      <FloatingPanelTrigger>
        {#snippet asChild(props)}
          <Button {...props()}>{open ? 'Focus panel' : 'Open controlled panel'}</Button>
        {/snippet}
      </FloatingPanelTrigger>
      <FloatingPanelSurface title="Controlled open">
        Open state is synchronized with Svelte state.
      </FloatingPanelSurface>
    </FloatingPanel>
  </div>
</Story>

<Story name="Controlled Position" asChild>
  <div class={stackClass}>
    <span class={statusClass}>
      x: {Math.round(position.x)}, y: {Math.round(position.y)}
    </span>
    <FloatingPanel
      defaultSize={DEFAULT_SIZE}
      {position}
      onPositionChange={(details) => (position = details.position)}
    >
      <FloatingPanelTrigger>
        {#snippet asChild(props)}<Button {...props()}>Open positioned panel</Button>{/snippet}
      </FloatingPanelTrigger>
      <FloatingPanelSurface title="Controlled position">
        Dragging updates the controlled position object.
      </FloatingPanelSurface>
    </FloatingPanel>
  </div>
</Story>

<Story name="Controlled Size" asChild>
  <div class={stackClass}>
    <span class={statusClass}>{Math.round(size.width)} x {Math.round(size.height)}</span>
    <FloatingPanel {size} onSizeChange={(details) => (size = details.size)}>
      <FloatingPanelTrigger>
        {#snippet asChild(props)}<Button {...props()}>Open resizable panel</Button>{/snippet}
      </FloatingPanelTrigger>
      <FloatingPanelSurface title="Controlled size">
        Resize handles update controlled width and height.
      </FloatingPanelSurface>
    </FloatingPanel>
  </div>
</Story>

<Story name="Escape Dismiss" asChild>
  <FloatingPanel defaultSize={DEFAULT_SIZE}>
    <FloatingPanelTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open panel</Button>{/snippet}
    </FloatingPanelTrigger>
    <FloatingPanelSurface
      autofocus
      title="Escape dismiss"
      footer="Esc closes the focused topmost panel."
    >
      The content receives focus on open so Escape dismisses the panel immediately.
    </FloatingPanelSurface>
  </FloatingPanel>
</Story>

<Story name="Anchor Position" asChild>
  <FloatingPanel defaultSize={DEFAULT_SIZE} {getAnchorPosition}>
    <FloatingPanelTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open from trigger</Button>{/snippet}
    </FloatingPanelTrigger>
    <FloatingPanelSurface title="Anchored start">
      The initial panel position is derived from the trigger rect.
    </FloatingPanelSurface>
  </FloatingPanel>
</Story>

<Story name="Context" asChild>
  <FloatingPanel defaultSize={DEFAULT_SIZE}>
    <div class={stackClass}>
      <FloatingPanelTrigger>
        {#snippet asChild(props)}<Button {...props()}>Open context panel</Button>{/snippet}
      </FloatingPanelTrigger>
      <FloatingPanelContext>
        {#snippet render(panel)}
          <span class={statusClass}>
            open: {String(panel().open)}, dragging: {String(panel().dragging)}
          </span>
        {/snippet}
      </FloatingPanelContext>
    </div>
    <FloatingPanelSurface title="Context state">
      FloatingPanelContext exposes the panel API to descendants.
    </FloatingPanelSurface>
  </FloatingPanel>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <div class={triggerGroupClass}>
      <Button onclick={() => panel().setOpen(true)}>Open via API</Button>
      <Button variant="outline" onclick={() => panel().maximize()}>Maximize</Button>
      <Button variant="outline" onclick={() => panel().minimize()}>Minimize</Button>
    </div>
    <FloatingPanelRootProvider value={panel}>
      <FloatingPanelSurface title="Root provider">
        useFloatingPanel owns state outside the rendered panel tree.
      </FloatingPanelSurface>
    </FloatingPanelRootProvider>
  </div>
</Story>

<Story name="Lazy Mount" asChild>
  <div class={stackClass}>
    <span class={statusClass}>Exit completions: {exits}</span>
    <FloatingPanel
      lazyMount
      unmountOnExit
      defaultSize={DEFAULT_SIZE}
      onExitComplete={() => exits++}
    >
      <FloatingPanelTrigger>
        {#snippet asChild(props)}<Button {...props()}>Open lazy panel</Button>{/snippet}
      </FloatingPanelTrigger>
      <FloatingPanelSurface title="Lazy mounted">
        The panel content mounts on first open and unmounts after exit.
      </FloatingPanelSurface>
    </FloatingPanel>
  </div>
</Story>

<Story name="Custom Styling" asChild>
  <FloatingPanel defaultSize={{ width: 380, height: 240 }}>
    <FloatingPanelTrigger>
      {#snippet asChild(props)}<Button {...props()}>Open styled panel</Button>{/snippet}
    </FloatingPanelTrigger>
    <FloatingPanelSurface title="Custom styling" surfaceClass={customPanelClass}>
      Tailwind utilities change the visual treatment without changing Ark composition.
    </FloatingPanelSurface>
  </FloatingPanel>
</Story>