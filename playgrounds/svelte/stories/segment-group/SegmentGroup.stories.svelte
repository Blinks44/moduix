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
  import styles from './SegmentGroup.stories.module.css';

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
  <div class={styles.stack}>
    <SegmentGroup aria-label="Framework" bind:value>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </SegmentGroup>
    <span class={styles.hint}>Current value: {value ?? 'none'}</span>
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.stack}>
    <SegmentGroupRootProvider aria-label="Framework" value={segmentGroup}>
      <SegmentGroupIndicator />
      <SegmentGroupItems items={frameworkItems} />
    </SegmentGroupRootProvider>
    <button class={styles.button} type="button" onclick={() => segmentGroup().setValue('Solid')}>
      Set to Solid
    </button>
  </div>
</Story>

<Story name="Disabled" asChild>
  <div class={styles.stack}>
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
  <SegmentGroup
    aria-label="View"
    defaultValue="List"
    orientation="vertical"
    class={styles.vertical}
  >
    <SegmentGroupIndicator />
    <SegmentGroupItems items={viewItems} />
  </SegmentGroup>
</Story>

<Story name="Custom Styling" asChild>
  <SegmentGroup aria-label="Framework" defaultValue="React" class={styles.customRoot}>
    <SegmentGroupIndicator />
    {#each frameworks as item (item)}
      <SegmentGroupItem value={item} class={styles.customItem}>
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
      <SegmentGroupItem value={item} class={styles.cardItem}>
        {#snippet asChild(props)}
          <label {...props()}>
            <SegmentGroupItemText class={styles.cardTitle}>{item}</SegmentGroupItemText>
            <span class={styles.cardDescription}>{description}</span>
            <SegmentGroupItemHiddenInput />
          </label>
        {/snippet}
      </SegmentGroupItem>
    {/each}
  </SegmentGroup>
</Story>