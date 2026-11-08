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

<Tabs defaultValue="overview">
  <TabsList>
    {#each items as item (item.value)}
      <TabsTrigger value={item.value}>
        {#snippet asChild(props)}
          <a {...props()} href={`#${item.value}`}>{item.title}</a>
        {/snippet}
      </TabsTrigger>
    {/each}
    <TabsIndicator />
  </TabsList>
  {#each items as item (item.value)}
    <TabsContent value={item.value}>
      <span id={item.value}>{item.content}</span>
    </TabsContent>
  {/each}
</Tabs>