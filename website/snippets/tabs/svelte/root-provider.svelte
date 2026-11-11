<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import {
    TabsContent,
    TabsIndicator,
    TabsList,
    TabsRootProvider,
    TabsTrigger,
    useTabs,
  } from '@moduix/svelte/tabs';

  const items = [
    {
      value: 'overview',
      title: 'Overview',
      content:
        'Review project status, team velocity, workloads and activity highlights in one place.',
    },
    {
      value: 'projects',
      title: 'Projects',
      content:
        'Track active workstreams, owners and milestones across all departments and align delivery timelines.',
    },
    {
      value: 'account',
      title: 'Account',
      content: 'Manage personal settings, team settings, notifications and access preferences.',
    },
  ];

  const tabs = useTabs({ defaultValue: 'overview' });
</script>

<Stack align="center" gap="3">
  <TabsRootProvider value={tabs}>
    <TabsList>
      {#each items as item (item.value)}
        <TabsTrigger value={item.value}>{item.title}</TabsTrigger>
      {/each}
      <TabsIndicator />
    </TabsList>
    {#each items as item (item.value)}
      <TabsContent value={item.value}>{item.content}</TabsContent>
    {/each}
  </TabsRootProvider>
  <output>Selected: {tabs().value ?? 'none'}</output>
</Stack>