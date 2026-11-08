<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Tabs,
    TabsContent,
    TabsIndicator,
    TabsList,
    TabsRootProvider,
    TabsTrigger,
    useTabs,
  } from '@/components/tabs';
  import HandshakeIcon from './HandshakeIcon.svelte';
  import MapIcon from './MapIcon.svelte';
  import PresentIcon from './PresentIcon.svelte';
  import { tabItems } from './tabItems';
  import TabsStoryContent from './TabsStoryContent.svelte';

  const { Story } = defineMeta({
    title: 'Components/Tabs',
    component: Tabs,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let value = $state('projects');
  const providerTabs = useTabs({ id: 'tabs-root-provider', defaultValue: 'overview' });
  const verticalTabs = useTabs({
    id: 'tabs-root-provider-vertical',
    defaultValue: 'overview',
    orientation: 'vertical',
  });
</script>

<Story name="Basic" asChild>
  <Tabs defaultValue="overview" class="w-88 min-[32rem]:w-128"><TabsStoryContent /></Tabs>
</Story>

<Story name="Controlled" asChild>
  <Tabs bind:value class="w-88 min-[32rem]:w-128"><TabsStoryContent /></Tabs>
</Story>

<Story name="Vertical" asChild>
  <Tabs defaultValue="overview" orientation="vertical" class="w-88 min-[32rem]:w-128"
    ><TabsStoryContent /></Tabs
  >
</Story>

<Story name="Manual Activation" asChild>
  <Tabs defaultValue="overview" activationMode="manual" class="w-88 min-[32rem]:w-128"
    ><TabsStoryContent /></Tabs
  >
</Story>

<Story name="Indicator" asChild>
  <Tabs defaultValue="overview" class="w-88 min-[32rem]:w-128"><TabsStoryContent /></Tabs>
</Story>

<Story name="Line" asChild>
  <Tabs defaultValue="overview" variant="line" class="w-88 min-[32rem]:w-128"
    ><TabsStoryContent /></Tabs
  >
</Story>

<Story name="Links" asChild>
  <Tabs defaultValue="overview" class="w-88 min-[32rem]:w-128">
    <TabsList>
      {#each tabItems as item (item.value)}
        <TabsTrigger value={item.value}>
          {#snippet asChild(props)}
            <a {...props()} href={'#' + item.value}>{item.title}</a>
          {/snippet}
        </TabsTrigger>
      {/each}
    </TabsList>
    {#each tabItems as item (item.value)}
      <TabsContent value={item.value}>
        <p id={item.value} class="m-0">{item.content}</p>
      </TabsContent>
    {/each}
  </Tabs>
</Story>

<Story name="With Icons" asChild>
  <Tabs defaultValue="overview" class="w-88 min-[32rem]:w-128">
    <TabsList>
      <TabsTrigger value="overview"><HandshakeIcon /><span>Overview</span></TabsTrigger>
      <TabsTrigger value="projects"><PresentIcon /><span>Projects</span></TabsTrigger>
      <TabsTrigger value="account"><MapIcon /><span>Account</span></TabsTrigger>
    </TabsList>
    {#each tabItems as item (item.value)}
      <TabsContent value={item.value}>
        <p class="m-0">{item.content}</p>
      </TabsContent>
    {/each}
  </Tabs>
</Story>

<Story name="Disabled Tab" asChild>
  <Tabs defaultValue="overview" class="w-88 min-[32rem]:w-128">
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="projects" disabled>Projects</TabsTrigger>
      <TabsTrigger value="account">Account</TabsTrigger>
    </TabsList>
    {#each tabItems as item (item.value)}
      <TabsContent value={item.value}>
        <p class="m-0">{item.content}</p>
      </TabsContent>
    {/each}
  </Tabs>
</Story>

<Story name="Lazy Mount" asChild>
  <Tabs defaultValue="overview" lazyMount unmountOnExit class="w-88 min-[32rem]:w-128">
    <TabsStoryContent />
  </Tabs>
</Story>

<Story name="Root Provider" asChild>
  <div class="grid gap-3">
    <output class="text-sm leading-5 text-muted-foreground">selected: {providerTabs().value}</output
    >
    <TabsRootProvider value={providerTabs} class="w-88 min-[32rem]:w-128"
      ><TabsStoryContent /></TabsRootProvider
    >
  </div>
</Story>

<Story name="Root Provider Vertical" asChild>
  <TabsRootProvider value={verticalTabs} variant="line" class="w-88 min-[32rem]:w-128">
    <TabsStoryContent />
  </TabsRootProvider>
</Story>

<Story name="Custom Styling" asChild>
  <Tabs
    defaultValue="name"
    class="w-88 flex-row items-center justify-between gap-4 min-[32rem]:w-128"
  >
    <TabsList class="shrink-0 rounded-none border-0 bg-transparent p-0">
      <TabsTrigger value="name" class="rounded-sm">Name</TabsTrigger>
      <TabsTrigger value="email" class="rounded-sm">Email</TabsTrigger>
      <TabsIndicator class="top-auto bottom-0 h-0.5 rounded-full bg-foreground shadow-none" />
    </TabsList>
    <TabsContent value="name" class="min-w-0 flex-1 border-0 bg-transparent p-0">
      <input
        class="h-9 w-full rounded-sm border border-border bg-background px-2 text-sm text-foreground"
        placeholder="Full name"
        aria-label="Full name"
      />
    </TabsContent>
    <TabsContent value="email" class="min-w-0 flex-1 border-0 bg-transparent p-0">
      <input
        class="h-9 w-full rounded-sm border border-border bg-background px-2 text-sm text-foreground"
        placeholder="Email"
        aria-label="Email"
      />
    </TabsContent>
  </Tabs>
</Story>