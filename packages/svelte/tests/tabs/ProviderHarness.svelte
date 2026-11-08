<script lang="ts">
  import {
    TabsContent,
    TabsContext,
    TabsList,
    TabsRootProvider,
    TabsTrigger,
    useTabs,
  } from '@/components/tabs';
  import RootState from './RootState.svelte';

  const tabs = useTabs({ id: 'provider-tabs', defaultValue: 'overview' });
</script>

<TabsRootProvider value={tabs}>
  <RootState />
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="projects">Projects</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="projects">Projects content</TabsContent>
  <output data-testid="tabs-context-hook">{tabs().value}</output>
  <TabsContext>
    {#snippet render(context)}
      <output data-testid="tabs-context-slot">{context().value}</output>
    {/snippet}
  </TabsContext>
</TabsRootProvider>