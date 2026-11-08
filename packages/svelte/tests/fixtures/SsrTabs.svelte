<script lang="ts">
  import { Tabs, TabsContent, TabsIndicator, TabsList, TabsTrigger } from '@/components/tabs';
</script>

<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="projects">Projects</TabsTrigger>
    <TabsIndicator />
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="projects">Projects content</TabsContent>
</Tabs>