<script lang="ts">
  import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/collapsible';
  import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
  } from '@/components/navigation-menu';
  import {
    ProgressCircular,
    ProgressCircularContext,
    ProgressCircularRing,
  } from '@/components/progress-circular';
  import {
    ProgressLinear,
    ProgressLinearContext,
    ProgressLinearRange,
    ProgressLinearTrack,
  } from '@/components/progress-linear';
  import { Splitter, SplitterPanel, SplitterResizeTrigger } from '@/components/splitter';
  import { Steps, StepsContent, StepsNextTrigger } from '@/components/steps';
  import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/tabs';
  import { Toc, TocContext, TocItem, TocLink, TocList, TocNav } from '@/components/toc';
  import { Toggle } from '@/components/toggle';

  const tocItems = [
    { value: 'introduction', depth: 2 },
    { value: 'configuration', depth: 3 },
  ];
  const panels = [
    { id: 'a', minSize: 20 },
    { id: 'b', minSize: 20 },
  ];

  let open = $state(false);
  let tab = $state('overview');
  let step = $state(0);
  let activeIds = $state(['introduction']);
  let menu: string | undefined = $state('');
  let size = $state([40, 60]);
  let linear: number | null = $state(10);
  let circular: number | null = $state(10);
  let pressed = $state(false);

  export const write = (key: string) => {
    if (key === 'open') open = true;
    if (key === 'tab') tab = 'projects';
    if (key === 'step') step = 1;
    if (key === 'activeIds') activeIds = ['configuration'];
    if (key === 'menu') menu = 'products';
    if (key === 'size') size = [60, 40];
    if (key === 'linear') linear = 80;
    if (key === 'circular') circular = 80;
    if (key === 'pressed') pressed = true;
  };
  export const read = () => ({ open, tab, step, activeIds, menu, size, linear, circular, pressed });
</script>

<Collapsible bind:open>
  <CollapsibleTrigger>Bound collapsible</CollapsibleTrigger>
  <CollapsibleContent>Collapsible content</CollapsibleContent>
</Collapsible>

<Tabs bind:value={tab}>
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="projects">Projects</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">Overview content</TabsContent>
  <TabsContent value="projects">Projects content</TabsContent>
</Tabs>

<Steps bind:step count={2}>
  <StepsContent index={0}>First step</StepsContent>
  <StepsContent index={1}>Second step</StepsContent>
  <StepsNextTrigger>Next step</StepsNextTrigger>
</Steps>

<Toc bind:activeIds items={tocItems}>
  <TocNav>
    <TocList>
      {#each tocItems as item (item.value)}
        <TocItem {item}>
          <TocLink href={`#${item.value}`}>{item.value}</TocLink>
        </TocItem>
      {/each}
    </TocList>
    <TocContext>
      {#snippet render(toc)}
        <button type="button" onclick={() => toc().setActiveIds(['introduction', 'configuration'])}>
          Activate both sections
        </button>
      {/snippet}
    </TocContext>
  </TocNav>
</Toc>

<NavigationMenu bind:value={menu}>
  <NavigationMenuList>
    <NavigationMenuItem value="products">
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>Product links</NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>

<Splitter id="bound-splitter" bind:size {panels}>
  <SplitterPanel id="a">A</SplitterPanel>
  <SplitterResizeTrigger id="a:b" aria-label="Resize bound panels" />
  <SplitterPanel id="b">B</SplitterPanel>
</Splitter>

<ProgressLinear bind:value={linear}>
  <ProgressLinearTrack aria-label="Bound linear"><ProgressLinearRange /></ProgressLinearTrack>
  <ProgressLinearContext>
    {#snippet render(progress)}
      <button type="button" onclick={() => progress().setValue(30)}>Set linear</button>
    {/snippet}
  </ProgressLinearContext>
</ProgressLinear>

<ProgressCircular bind:value={circular}>
  <ProgressCircularRing aria-label="Bound circular" />
  <ProgressCircularContext>
    {#snippet render(progress)}
      <button type="button" onclick={() => progress().setValue(30)}>Set circular</button>
    {/snippet}
  </ProgressCircularContext>
</ProgressCircular>

<Toggle bind:pressed>Bound toggle</Toggle>