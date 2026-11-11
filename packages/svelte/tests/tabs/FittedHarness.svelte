<script lang="ts">
  import { Tabs, TabsList, TabsTrigger } from '@/components/tabs';

  const items = [
    { value: 'overview', label: 'Overview' },
    { value: 'projects', label: 'Projects' },
    { value: 'account', label: 'Account' },
  ];
  const orientations = ['horizontal', 'vertical'] as const;
</script>

{#each orientations as orientation (orientation)}
  <Tabs defaultValue="overview" fitted {orientation} style="width: 480px">
    <TabsList>
      {#each items as item (item.value)}
        <TabsTrigger value={item.value}>{item.label}</TabsTrigger>
      {/each}
    </TabsList>
  </Tabs>
{/each}