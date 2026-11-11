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
  import storyStyles from './Tooltip.stories.module.css';
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
          <span class={storyStyles.triggerContent}>
            <Bell class={storyStyles.icon} aria-hidden="true" />
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
  <div class={storyStyles.stack}>
    <div class={storyStyles.sideButtons}>
      {#each tooltipPlacements as item (item)}
        <button
          type="button"
          class={storyStyles.sideButton}
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
  <div class={storyStyles.stack}>
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
  <div class={storyStyles.stack}>
    <output class={storyStyles.output}>Open: {tooltip().open}</output>
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
    <div class={storyStyles.toolbar}>
      {#each tooltipTools as tool (tool.id)}
        <TooltipTrigger value={tool.id} aria-label={tool.label}>
          {#snippet asChild(props)}
            <Button {...props()} variant="ghost" size="icon-md">
              <tool.icon class={storyStyles.icon} />
            </Button>
          {/snippet}
        </TooltipTrigger>
      {/each}
    </div>
    <TooltipBody>
      {#if activeTool}
        {activeTool.label} <span class={storyStyles.shortcut}>{activeTool.shortcut}</span>
      {/if}
    </TooltipBody>
  </Tooltip>
</Story>

<Story name="Within Fixed Container" parameters={{ layout: 'fullscreen' }} asChild>
  <div class={storyStyles.fixedContainer}>
    <Tooltip positioning={{ strategy: 'fixed' }}>
      <TooltipTrigger>Fixed strategy</TooltipTrigger>
      <TooltipBody>Positioned from a fixed container.</TooltipBody>
    </Tooltip>
  </div>
</Story>

<Story name="Custom Composition" asChild>
  <Tooltip>
    <TooltipTrigger class={storyStyles.customTrigger}>Custom style</TooltipTrigger>
    <TooltipPositioner class={storyStyles.customPositioner}>
      <TooltipContent class={storyStyles.customContent}>
        Styled through explicit Ark parts
      </TooltipContent>
    </TooltipPositioner>
  </Tooltip>
</Story>