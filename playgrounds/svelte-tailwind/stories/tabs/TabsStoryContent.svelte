<script lang="ts">
  import { TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/tabs';
  import { tabItems } from './tabItems';
</script>

<TabsList>
  {#each tabItems as item (item.value)}
    <TabsTrigger value={item.value}>{item.title}</TabsTrigger>
  {/each}
  <TabsIndicator />
</TabsList>
{#each tabItems as item (item.value)}
  <TabsContent value={item.value}>
    <p class="m-0">{item.content}</p>
  </TabsContent>
{/each}