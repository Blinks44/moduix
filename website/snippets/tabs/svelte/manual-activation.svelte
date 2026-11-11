<script lang="ts">
  import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@moduix/svelte/tabs';

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
</script>

<Tabs defaultValue="overview" activationMode="manual">
  <TabsList>
    {#each items as item (item.value)}
      <TabsTrigger value={item.value}>{item.title}</TabsTrigger>
    {/each}
    <TabsIndicator />
  </TabsList>
  {#each items as item (item.value)}
    <TabsContent value={item.value}>{item.content}</TabsContent>
  {/each}
</Tabs>