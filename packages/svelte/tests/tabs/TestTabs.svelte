<script lang="ts">
  import {
    Tabs,
    TabsContent,
    TabsIndicator,
    TabsList,
    TabsTrigger,
    type TabsRootProps,
  } from '@/components/tabs';

  let {
    disabled = false,
    value = $bindable(),
    ...props
  }: Omit<TabsRootProps, 'disabled'> & { disabled?: boolean } = $props();

  const items = [
    { value: 'overview', label: 'Overview', content: 'Overview content' },
    { value: 'projects', label: 'Projects', content: 'Projects content' },
    { value: 'account', label: 'Account', content: 'Account content' },
  ];
</script>

<Tabs
  unmountOnExit
  {...props}
  bind:value
  defaultValue={value === undefined ? 'overview' : undefined}
>
  <TabsList>
    {#each items as item (item.value)}
      <TabsTrigger disabled={disabled && item.value === 'projects'} value={item.value}>
        {item.label}
      </TabsTrigger>
    {/each}
    <TabsIndicator />
  </TabsList>
  {#each items as item (item.value)}
    <TabsContent value={item.value}>{item.content}</TabsContent>
  {/each}
</Tabs>