<script lang="ts">
  import { TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/tabs';
  import { tabItems } from './tabItems';
  import styles from './Tabs.stories.module.css';
</script>

<TabsList>
  {#each tabItems as item (item.value)}
    <TabsTrigger value={item.value}>{item.title}</TabsTrigger>
  {/each}
  <TabsIndicator />
</TabsList>
{#each tabItems as item (item.value)}
  <TabsContent value={item.value}>
    <p class={styles.panelText}>{item.content}</p>
  </TabsContent>
{/each}