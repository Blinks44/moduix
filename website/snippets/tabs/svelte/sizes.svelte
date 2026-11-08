<script lang="ts">
  import { Stack } from '@moduix/svelte/stack';
  import { Tabs, TabsIndicator, TabsList, TabsTrigger } from '@moduix/svelte/tabs';

  const sizes = ['sm', 'md', 'lg'] as const;
  const tabs = ['Overview', 'Projects', 'Account'];
</script>

<Stack align="flex-start" gap="3">
  {#each sizes as size (size)}
    <Tabs defaultValue="Overview" {size}>
      <TabsList aria-label={`Sections, ${size}`}>
        {#each tabs as tab (tab)}
          <TabsTrigger value={tab}>{tab}</TabsTrigger>
        {/each}
        <TabsIndicator />
      </TabsList>
    </Tabs>
  {/each}
</Stack>