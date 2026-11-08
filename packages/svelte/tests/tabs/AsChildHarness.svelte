<script lang="ts">
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';

  let triggerRef: Element | null = $state(null);

  export const getRefs = () => ({ triggerRef });
</script>

<Tabs defaultValue="overview">
  {#snippet asChild(rootProps)}
    <section {...rootProps()} aria-label="Account sections">
      <TabsList>
        <TabsTrigger bind:ref={triggerRef} value="overview">
          {#snippet asChild(props)}
            <a {...props()} href="#overview">Overview</a>
          {/snippet}
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
    </section>
  {/snippet}
</Tabs>