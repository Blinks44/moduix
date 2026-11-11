<script lang="ts">
  import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/tabs';
</script>

<Tabs defaultValue="overview" class="flex-row">
  <TabsList class="w-full bg-card">
    <TabsTrigger value="overview" class="h-10">Overview</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="overview" class="p-6">Overview content</TabsContent>
</Tabs>