<script lang="ts">
  import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/tabs';

  let rootRef: Element | null = $state(null);
  let listRef: Element | null = $state(null);
  let triggerRef: Element | null = $state(null);
  let indicatorRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);

  export const getRefs = () => ({ rootRef, listRef, triggerRef, indicatorRef, contentRef });
</script>

<Tabs bind:ref={rootRef} defaultValue="overview" data-probe="root">
  <TabsList bind:ref={listRef}>
    <TabsTrigger bind:ref={triggerRef} value="overview">Overview</TabsTrigger>
    <TabsIndicator bind:ref={indicatorRef} />
  </TabsList>
  <TabsContent bind:ref={contentRef} value="overview">Overview content</TabsContent>
</Tabs>