<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Toc } from '@/components/toc';
  import RootProviderExample from './RootProviderExample.svelte';
  import TocExample from './TocExample.svelte';

  const { Story } = defineMeta({
    title: 'Components/Table of Contents',
    component: Toc,
    tags: ['autodocs'],
    parameters: { layout: 'padded' },
    args: { items: [] },
  });
</script>

<Story name="Default" asChild>
  <TocExample />
</Story>

<Story name="With Rail" asChild>
  <TocExample withRail />
</Story>

<Story name="Left Placement" asChild>
  <TocExample placement="left" />
</Story>

<Story name="Root Provider" asChild>
  <RootProviderExample />
</Story>