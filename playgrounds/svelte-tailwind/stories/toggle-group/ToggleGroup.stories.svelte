<script module lang="ts">
  import Bell from '@lucide/svelte/icons/bell';
  import Star from '@lucide/svelte/icons/star';
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    ToggleGroup,
    ToggleGroupItem,
    ToggleGroupRootProvider,
    useToggleGroup,
  } from '@/components/toggle-group';
  import { CheckIcon } from '@/lib/moduix/icons/ui';
  import ContextItem from './ContextItem.svelte';

  const rowClass = 'flex items-center gap-2';
  const stackClass = 'flex flex-col items-start gap-3';
  const hintClass = 'text-muted-foreground text-xs leading-4';
  const customGroupClass =
    'gap-1 rounded-md border-[color-mix(in_oklab,var(--color-primary)_38%,var(--color-border))] bg-[color-mix(in_oklab,var(--color-primary)_8%,transparent)] p-1';
  const customItemClass = 'rounded-sm px-3';

  const { Story } = defineMeta({
    title: 'Components/ToggleGroup',
    component: ToggleGroup,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state<string[]>(['favorites']);
  const toggleGroup = useToggleGroup({ id: 'toggle-group-root-provider', defaultValue: ['left'] });
</script>

<Story name="Default" asChild>
  <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroup>
</Story>

<Story name="Multiple" asChild>
  <ToggleGroup multiple defaultValue={['bold', 'italic']} aria-label="Text formatting" size="md">
    <ToggleGroupItem value="bold" aria-label="Bold"><strong>B</strong></ToggleGroupItem>
    <ToggleGroupItem value="italic" aria-label="Italic"><em>I</em></ToggleGroupItem>
    <ToggleGroupItem value="underline" aria-label="Underline"
      ><span class="underline">U</span></ToggleGroupItem
    >
  </ToggleGroup>
</Story>

<Story name="Variants" asChild>
  <div class={stackClass}>
    <ToggleGroup defaultValue={['one']} aria-label="Default variant">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
      <ToggleGroupItem value="three">Three</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup defaultValue={['one']} aria-label="Outline variant" variant="outline">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
      <ToggleGroupItem value="three">Three</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup defaultValue={['one']} aria-label="Ghost variant" variant="ghost">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
      <ToggleGroupItem value="three">Three</ToggleGroupItem>
    </ToggleGroup>
  </div>
</Story>

<Story name="Sizes" asChild>
  <div class={stackClass}>
    <ToggleGroup defaultValue={['xs']} aria-label="Extra small size" size="xs">
      <ToggleGroupItem value="xs">XS</ToggleGroupItem>
      <ToggleGroupItem value="sm">SM</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup defaultValue={['sm']} aria-label="Small size" size="sm">
      <ToggleGroupItem value="sm">Small</ToggleGroupItem>
      <ToggleGroupItem value="md">Medium</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup defaultValue={['md']} aria-label="Medium size" size="md">
      <ToggleGroupItem value="md">Medium</ToggleGroupItem>
      <ToggleGroupItem value="lg">Large</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup defaultValue={['lg']} aria-label="Large size" size="lg">
      <ToggleGroupItem value="lg">Large</ToggleGroupItem>
      <ToggleGroupItem value="xl">Extra</ToggleGroupItem>
    </ToggleGroup>
  </div>
</Story>

<Story name="With Icons" exportName="WithIcons" asChild>
  <ToggleGroup defaultValue={['favorites']} aria-label="Notification channels">
    <ToggleGroupItem value="favorites"
      ><Star aria-hidden="true" focusable="false" /> Favorites</ToggleGroupItem
    >
    <ToggleGroupItem value="alerts"
      ><Bell aria-hidden="true" focusable="false" /> Alerts</ToggleGroupItem
    >
  </ToggleGroup>
</Story>

<Story name="Vertical" asChild>
  <ToggleGroup
    defaultValue={['list']}
    orientation="vertical"
    aria-label="View mode"
    variant="outline"
  >
    <ToggleGroupItem value="list">List</ToggleGroupItem>
    <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
    <ToggleGroupItem value="map">Map</ToggleGroupItem>
  </ToggleGroup>
</Story>

<Story name="Disabled" asChild>
  <div class={rowClass}>
    <ToggleGroup defaultValue={['one']} aria-label="Disabled group" disabled>
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two">Two</ToggleGroupItem>
    </ToggleGroup>
    <ToggleGroup defaultValue={['one']} aria-label="Disabled item">
      <ToggleGroupItem value="one">One</ToggleGroupItem>
      <ToggleGroupItem value="two" disabled>Two</ToggleGroupItem>
    </ToggleGroup>
  </div>
</Story>

<Story name="Loop Focus" exportName="LoopFocus" asChild>
  <ToggleGroup defaultValue={['day']} aria-label="Schedule range" loopFocus={false}>
    <ToggleGroupItem value="day">Day</ToggleGroupItem>
    <ToggleGroupItem value="week">Week</ToggleGroupItem>
    <ToggleGroupItem value="month">Month</ToggleGroupItem>
  </ToggleGroup>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <ToggleGroup bind:value aria-label="Controlled options" multiple>
      <ToggleGroupItem value="favorites">
        {#if value.includes('favorites')}<CheckIcon />{:else}<Star
            aria-hidden="true"
            focusable="false"
          />{/if}
        Favorites
      </ToggleGroupItem>
      <ToggleGroupItem value="alerts"
        ><Bell aria-hidden="true" focusable="false" /> Alerts</ToggleGroupItem
      >
    </ToggleGroup>
    <span class={hintClass}>Current value: {value.join(', ') || 'empty'}</span>
  </div>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <ToggleGroupRootProvider value={toggleGroup} aria-label="Text alignment">
    <ToggleGroupItem value="left">Left</ToggleGroupItem>
    <ToggleGroupItem value="center">Center</ToggleGroupItem>
    <ToggleGroupItem value="right">Right</ToggleGroupItem>
  </ToggleGroupRootProvider>
</Story>

<Story name="Context" asChild>
  <ToggleGroup defaultValue={['left']} aria-label="Text alignment">
    <ContextItem value="left" />
    <ContextItem value="center" />
    <ContextItem value="right" />
  </ToggleGroup>
</Story>

<Story name="Custom Styles" exportName="CustomStyles" asChild>
  <ToggleGroup defaultValue={['day']} aria-label="Schedule density" class={customGroupClass}>
    <ToggleGroupItem value="day" class={customItemClass}>Day</ToggleGroupItem>
    <ToggleGroupItem value="week" class={customItemClass}>Week</ToggleGroupItem>
    <ToggleGroupItem value="month" class={customItemClass}>Month</ToggleGroupItem>
  </ToggleGroup>
</Story>