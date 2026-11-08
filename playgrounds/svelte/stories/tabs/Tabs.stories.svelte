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
  import styles from './Tabs.stories.module.css';
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
  <Tabs defaultValue="overview" class={styles.demoRoot}><TabsStoryContent /></Tabs>
</Story>

<Story name="Controlled" asChild>
  <Tabs bind:value class={styles.demoRoot}><TabsStoryContent /></Tabs>
</Story>

<Story name="Vertical" asChild>
  <Tabs defaultValue="overview" orientation="vertical" class={styles.demoRoot}
    ><TabsStoryContent /></Tabs
  >
</Story>

<Story name="Manual Activation" asChild>
  <Tabs defaultValue="overview" activationMode="manual" class={styles.demoRoot}
    ><TabsStoryContent /></Tabs
  >
</Story>

<Story name="Indicator" asChild>
  <Tabs defaultValue="overview" class={styles.demoRoot}><TabsStoryContent /></Tabs>
</Story>

<Story name="Line" asChild>
  <Tabs defaultValue="overview" variant="line" class={styles.demoRoot}><TabsStoryContent /></Tabs>
</Story>

<Story name="Links" asChild>
  <Tabs defaultValue="overview" class={styles.demoRoot}>
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
        <p id={item.value} class={styles.panelText}>{item.content}</p>
      </TabsContent>
    {/each}
  </Tabs>
</Story>

<Story name="With Icons" asChild>
  <Tabs defaultValue="overview" class={styles.demoRoot}>
    <TabsList>
      <TabsTrigger value="overview"><HandshakeIcon /><span>Overview</span></TabsTrigger>
      <TabsTrigger value="projects"><PresentIcon /><span>Projects</span></TabsTrigger>
      <TabsTrigger value="account"><MapIcon /><span>Account</span></TabsTrigger>
    </TabsList>
    {#each tabItems as item (item.value)}
      <TabsContent value={item.value}>
        <p class={styles.panelText}>{item.content}</p>
      </TabsContent>
    {/each}
  </Tabs>
</Story>

<Story name="Disabled Tab" asChild>
  <Tabs defaultValue="overview" class={styles.demoRoot}>
    <TabsList>
      <TabsTrigger value="overview">Overview</TabsTrigger>
      <TabsTrigger value="projects" disabled>Projects</TabsTrigger>
      <TabsTrigger value="account">Account</TabsTrigger>
    </TabsList>
    {#each tabItems as item (item.value)}
      <TabsContent value={item.value}>
        <p class={styles.panelText}>{item.content}</p>
      </TabsContent>
    {/each}
  </Tabs>
</Story>

<Story name="Lazy Mount" asChild>
  <Tabs defaultValue="overview" lazyMount unmountOnExit class={styles.demoRoot}>
    <TabsStoryContent />
  </Tabs>
</Story>

<Story name="Root Provider" asChild>
  <div class={styles.providerStack}>
    <output>selected: {providerTabs().value}</output>
    <TabsRootProvider value={providerTabs} class={styles.demoRoot}
      ><TabsStoryContent /></TabsRootProvider
    >
  </div>
</Story>

<Story name="Root Provider Vertical" asChild>
  <TabsRootProvider value={verticalTabs} variant="line" class={styles.demoRoot}>
    <TabsStoryContent />
  </TabsRootProvider>
</Story>

<Story name="Custom Styling" asChild>
  <Tabs defaultValue="name" class={styles.inlineRoot}>
    <TabsList class={styles.inlineList}>
      <TabsTrigger value="name" class={styles.inlineTrigger}>Name</TabsTrigger>
      <TabsTrigger value="email" class={styles.inlineTrigger}>Email</TabsTrigger>
      <TabsIndicator class={styles.inlineIndicator} />
    </TabsList>
    <TabsContent value="name" class={styles.inlineContent}>
      <input class={styles.inlineInput} placeholder="Full name" aria-label="Full name" />
    </TabsContent>
    <TabsContent value="email" class={styles.inlineContent}>
      <input class={styles.inlineInput} placeholder="Email" aria-label="Email" />
    </TabsContent>
  </Tabs>
</Story>