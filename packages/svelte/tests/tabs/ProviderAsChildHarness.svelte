<script lang="ts">
  import {
    TabsContent,
    TabsIndicator,
    TabsList,
    TabsRootProvider,
    TabsTrigger,
    useTabs,
  } from '@/components/tabs';

  let orientation: 'horizontal' | 'vertical' = $state('horizontal');
  let rootRef: Element | null = $state(null);
  let listRef: Element | null = $state(null);
  let indicatorRef: Element | null = $state(null);
  let contentRef: Element | null = $state(null);

  const tabs = useTabs(() => ({ id: 'as-child-tabs', defaultValue: 'overview', orientation }));

  export const setOrientation = (value: 'horizontal' | 'vertical') => (orientation = value);
  export const getRefs = () => ({ rootRef, listRef, indicatorRef, contentRef });
</script>

<TabsRootProvider bind:ref={rootRef} value={tabs} variant="line">
  {#snippet asChild(rootProps)}
    <section {...rootProps()} aria-label="Project sections">
      <TabsList bind:ref={listRef}>
        {#snippet asChild(listProps)}
          <nav {...listProps()} aria-label="Project views">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsIndicator bind:ref={indicatorRef}>
              {#snippet asChild(indicatorProps)}
                <span {...indicatorProps()}></span>
              {/snippet}
            </TabsIndicator>
          </nav>
        {/snippet}
      </TabsList>
      <TabsContent bind:ref={contentRef} value="overview">
        {#snippet asChild(contentProps)}
          <article {...contentProps()}>Overview content</article>
        {/snippet}
      </TabsContent>
    </section>
  {/snippet}
</TabsRootProvider>