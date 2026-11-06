<script module lang="ts">
  import Bell from '@lucide/svelte/icons/bell';
  import Info from '@lucide/svelte/icons/info';
  import Plus from '@lucide/svelte/icons/plus';
  import Share from '@lucide/svelte/icons/share';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Tooltip,
    TooltipArrow,
    TooltipBody,
    TooltipContent,
    TooltipDisabledTrigger,
    TooltipPositioner,
    TooltipRootProvider,
    TooltipTrigger,
    useTooltip,
  } from '@/components/tooltip';
  import TooltipStateContent from './TooltipStateContent.svelte';

  const { Story } = defineMeta({
    title: 'Components/Tooltip',
    component: Tooltip,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  type TooltipPlacement = 'top' | 'right' | 'bottom' | 'left';

  const tooltipPlacements: TooltipPlacement[] = ['top', 'right', 'bottom', 'left'];
  const tooltipTools = [
    { id: 'create', label: 'Create', shortcut: 'Ctrl+N', icon: Plus },
    { id: 'share', label: 'Share', shortcut: 'Ctrl+S', icon: Share },
    { id: 'details', label: 'Details', shortcut: 'Ctrl+I', icon: Info },
  ];

  const triggerContentClass = 'inline-flex items-center gap-2';
  const iconClass = 'size-4';
  const stackClass = 'flex flex-col items-center gap-3';
  const sideButtonsClass =
    'inline-flex flex-wrap items-center gap-1 rounded-md border border-border bg-muted p-1';
  const sideButtonClass =
    'min-h-8 min-w-19 cursor-pointer rounded-sm border border-border bg-background px-3 text-sm leading-5 font-medium text-foreground capitalize transition-[background-color,color] duration-normal hover:bg-accent data-[active]:bg-primary data-[active]:text-primary-foreground';
  const outputClass = 'text-sm leading-5 text-muted-foreground';
  const toolbarClass =
    'inline-flex items-center gap-px rounded-lg border border-border bg-muted p-1';
  const shortcutClass = 'text-xs leading-4 text-muted-foreground';
  const fixedContainerClass =
    'fixed top-10 left-10 grid min-h-32 min-w-64 place-items-center rounded-lg border border-border bg-muted';
  const customTriggerClass =
    'border-primary bg-primary text-primary-foreground [@media(hover:hover)]:hover:bg-primary/90';
  const customPositionerClass = 'drop-shadow-[0_0.5rem_1rem_rgb(0_0_0_/_14%)]';
  const customContentClass =
    'min-w-40 border-primary bg-primary px-3 py-2 text-left text-primary-foreground';
</script>

<script lang="ts">
  let placement = $state<TooltipPlacement>('top');
  let open = $state(false);
  let activeTool = $state<(typeof tooltipTools)[number] | null>(null);
  const positioning = $derived({ placement, offset: { mainAxis: 12 } });
  const tooltip = useTooltip({ id: 'tooltip-root-provider' });
</script>

<Story name="Default" asChild>
  <Tooltip>
    <TooltipTrigger aria-label="Notifications">
      {#snippet asChild(props)}
        <Button {...props()}>
          <span class={triggerContentClass}>
            <Bell class={iconClass} aria-hidden="true" />
            Notifications
          </span>
        </Button>
      {/snippet}
    </TooltipTrigger>
    <TooltipBody>Notifications</TooltipBody>
  </Tooltip>
</Story>

<Story name="With Arrow" asChild>
  <Tooltip>
    <TooltipTrigger>Hover or focus</TooltipTrigger>
    <TooltipBody><TooltipArrow />Tooltip with arrow</TooltipBody>
  </Tooltip>
</Story>

<Story name="Delay" asChild>
  <Tooltip closeDelay={0} openDelay={0}>
    <TooltipTrigger>Immediate tooltip</TooltipTrigger>
    <TooltipBody>No open or close delay</TooltipBody>
  </Tooltip>
</Story>

<Story name="Disabled Trigger" asChild>
  <Tooltip>
    <TooltipDisabledTrigger aria-label="Create project is unavailable">
      <Button disabled>Create project</Button>
    </TooltipDisabledTrigger>
    <TooltipBody>Projects are unavailable while offline.</TooltipBody>
  </Tooltip>
</Story>

<Story name="Positioning" asChild>
  <div class={stackClass}>
    <div class={sideButtonsClass}>
      {#each tooltipPlacements as item (item)}
        <button
          type="button"
          class={sideButtonClass}
          data-active={item === placement ? '' : undefined}
          onclick={() => (placement = item)}
        >
          {item}
        </button>
      {/each}
    </div>

    <Tooltip {positioning}>
      <TooltipTrigger>
        {#snippet asChild(props)}<Button {...props()}>Hover or focus</Button>{/snippet}
      </TooltipTrigger>
      <TooltipBody>Placement: {placement}</TooltipBody>
    </Tooltip>
  </div>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <Button variant="outline" onclick={() => (open = !open)}>Toggle</Button>
    <Tooltip bind:open>
      <TooltipTrigger>Controlled tooltip</TooltipTrigger>
      <TooltipBody>Open: {open}</TooltipBody>
    </Tooltip>
  </div>
</Story>

<Story name="Context" asChild>
  <Tooltip>
    <TooltipTrigger>Context tooltip</TooltipTrigger>
    <TooltipPositioner><TooltipStateContent /></TooltipPositioner>
  </Tooltip>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <output class={outputClass}>Open: {tooltip().open}</output>
    <TooltipRootProvider value={tooltip}>
      <TooltipTrigger>RootProvider tooltip</TooltipTrigger>
      <TooltipBody>State is owned outside the tree.</TooltipBody>
    </TooltipRootProvider>
  </div>
</Story>

<Story name="Multiple Triggers" asChild>
  <Tooltip
    onTriggerValueChange={({ value }) => {
      activeTool = tooltipTools.find((tool) => tool.id === value) ?? null;
    }}
  >
    <div class={toolbarClass}>
      {#each tooltipTools as tool (tool.id)}
        <TooltipTrigger value={tool.id} aria-label={tool.label}>
          {#snippet asChild(props)}
            <Button {...props()} variant="ghost" size="icon-md">
              <tool.icon class={iconClass} />
            </Button>
          {/snippet}
        </TooltipTrigger>
      {/each}
    </div>
    <TooltipBody>
      {#if activeTool}
        {activeTool.label} <span class={shortcutClass}>{activeTool.shortcut}</span>
      {/if}
    </TooltipBody>
  </Tooltip>
</Story>

<Story name="Within Fixed Container" parameters={{ layout: 'fullscreen' }} asChild>
  <div class={fixedContainerClass}>
    <Tooltip positioning={{ strategy: 'fixed' }}>
      <TooltipTrigger>Fixed strategy</TooltipTrigger>
      <TooltipBody>Positioned from a fixed container.</TooltipBody>
    </Tooltip>
  </div>
</Story>

<Story name="Custom Composition" asChild>
  <Tooltip>
    <TooltipTrigger class={customTriggerClass}>Custom style</TooltipTrigger>
    <TooltipPositioner class={customPositionerClass}>
      <TooltipContent class={customContentClass}>Styled through explicit Ark parts</TooltipContent>
    </TooltipPositioner>
  </Tooltip>
</Story>