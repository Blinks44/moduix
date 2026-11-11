<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    SegmentGroup,
    SegmentGroupIndicator,
    SegmentGroupItem,
    SegmentGroupItemHiddenInput,
    SegmentGroupItems,
    SegmentGroupItemText,
    SegmentGroupRootProvider,
    useSegmentGroup,
  } from '@/components/segment-group';

  const { Story } = defineMeta({
    title: 'Components/SegmentGroup',
    component: SegmentGroup,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const frameworks = ['React', 'Solid', 'Svelte', 'Vue'] as const;
  const frameworkItems = frameworks.map((value) => ({ value, label: value }));
  const viewItems = ['List', 'Board', 'Calendar'].map((value) => ({ value, label: value }));
  const billingCycles = [
    ['Monthly', 'Pay monthly'],
    ['Annual', 'Save 20%'],
  ];

  const stackClass = 'grid justify-items-start gap-2';
  const hintClass = 'text-xs leading-4 text-muted-foreground';
  const buttonClass =
    'inline-flex min-h-8 cursor-pointer items-center justify-center rounded-md border border-border bg-background px-3 text-foreground transition-[background-color,border-color] duration-normal ease-in-out hover:bg-accent focus-visible:outline-1 focus-visible:outline-offset-1 focus-visible:outline-ring';
  const cardItemClass =
    'group/segment-item grid min-h-18 w-36 content-center justify-items-start gap-0.5 p-3 whitespace-normal';
  const cardDescriptionClass =
    'text-xs leading-4 text-muted-foreground group-data-[state=checked]/segment-item:text-foreground';
</script>

<script lang="ts">
  let value: string | null = $state('React');
  const segmentGroup = useSegmentGroup({ defaultValue: 'React' });
</script>

<Story name="Basic" asChild>
  <SegmentGroup aria-label="Framework" defaultValue="React">
    <SegmentGroupIndicator />
    <SegmentGroupItems items={frameworkItems} />
  </SegmentGroup>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <SegmentGroup aria-label="Framework" bind:value>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </SegmentGroup>
    <span class={hintClass}>Current value: {value ?? 'none'}</span>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={stackClass}>
    <SegmentGroupRootProvider aria-label="Framework" value={segmentGroup}>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </SegmentGroupRootProvider>
    <button class={buttonClass} type="button" onclick={() => segmentGroup().setValue('Solid')}>
      Set to Solid
    </button>
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class={stackClass}>
    <SegmentGroup aria-label="Framework with unavailable item" defaultValue="React">
      <SegmentGroupIndicator />
      <SegmentGroupItems
        items={frameworkItems.map((item) => ({ ...item, disabled: item.value === 'Svelte' }))}
      />
    </SegmentGroup>
    <SegmentGroup aria-label="Disabled framework" defaultValue="React" disabled>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </SegmentGroup>
  </div>
</Story>

<Story name="Invalid" asChild>
  <SegmentGroup aria-label="Framework" name="framework" defaultValue="React" invalid required>
    <SegmentGroupIndicator />
    <SegmentGroupItems items={frameworkItems} />
  </SegmentGroup>
</Story>

<Story name="Vertical" asChild>
  <SegmentGroup aria-label="View" defaultValue="List" orientation="vertical" class="min-w-40">
    <SegmentGroupIndicator />
    <SegmentGroupItems items={viewItems} />
  </SegmentGroup>
</Story>

<Story name="Custom Styling" asChild>
  <SegmentGroup aria-label="Framework" defaultValue="React" class="border-primary bg-background">
    <SegmentGroupIndicator class="bg-primary" />
    {#each frameworks as item (item)}
      <SegmentGroupItem value={item} class="data-[state=checked]:text-primary-foreground">
        <SegmentGroupItemText>{item}</SegmentGroupItemText>
        <SegmentGroupItemHiddenInput />
      </SegmentGroupItem>
    {/each}
  </SegmentGroup>
</Story>

<Story name="As Child" exportName="AsChild" asChild>
  <SegmentGroup aria-label="Billing cycle" defaultValue="Monthly">
    <SegmentGroupIndicator />
    {#each billingCycles as [item, description] (item)}
      <SegmentGroupItem value={item} class={cardItemClass}>
        {#snippet asChild(props)}
          <label {...props()}>
            <SegmentGroupItemText class="font-semibold">{item}</SegmentGroupItemText>
            <span class={cardDescriptionClass}>{description}</span>
            <SegmentGroupItemHiddenInput />
          </label>
        {/snippet}
      </SegmentGroupItem>
    {/each}
  </SegmentGroup>
</Story>