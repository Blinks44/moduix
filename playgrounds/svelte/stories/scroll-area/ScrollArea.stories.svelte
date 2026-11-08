<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    ScrollArea,
    ScrollAreaContent,
    ScrollAreaCorner,
    ScrollAreaRootProvider,
    ScrollAreaScrollbar,
    ScrollAreaThumb,
    ScrollAreaViewport,
    useScrollArea,
  } from '@/components/scroll-area';
  import { insideScrollSections } from '../data/insideScrollSections';
  import styles from './ScrollArea.stories.module.css';
  import TextContent from './TextContent.svelte';

  const { Story } = defineMeta({
    title: 'Components/ScrollArea',
    component: ScrollArea,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const gridItems = Array.from({ length: 96 }, (_, index) => index + 1);
</script>

<script lang="ts">
  const scrollArea = useScrollArea({ id: 'scroll-area-root-provider' });
</script>

<Story name="Basic" asChild>
  <ScrollArea class={styles.root}>
    <ScrollAreaViewport>
      <ScrollAreaContent><TextContent /></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Always Visible" exportName="AlwaysVisible" asChild>
  <ScrollArea class={styles.root} variant="always">
    <ScrollAreaViewport>
      <ScrollAreaContent><TextContent /></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Fade" asChild>
  <ScrollArea class={styles.root} fade>
    <ScrollAreaViewport>
      <ScrollAreaContent><TextContent /></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Horizontal" asChild>
  <ScrollArea class={styles.horizontalRoot}>
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <p class={styles.wideParagraph}>{insideScrollSections[0]?.body}</p>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="RTL" exportName="RTL" asChild>
  <ScrollArea class={styles.horizontalRoot} dir="rtl" variant="always">
    <ScrollAreaViewport aria-label="ملاحظات الإصدار">
      <ScrollAreaContent>
        <p class={styles.wideParagraph}>
          تدعم منطقة التمرير اتجاه النص من اليمين إلى اليسار مع الحفاظ على التمرير الأصلي وأجزاء
          شريط التمرير القابلة للتخصيص.
        </p>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Both Directions" exportName="BothDirections" asChild>
  <ScrollArea class={styles.root}>
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <div class={styles.gridContent}>
          {#each gridItems as item (item)}
            <div class={styles.cell}>{item}</div>
          {/each}
        </div>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Nested" asChild>
  <ScrollArea class={styles.root}>
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <div class={styles.textContent}>
          <section>
            <h3>Outer release notes</h3>
            <p class={styles.paragraph}>{insideScrollSections[0]?.body}</p>
          </section>
          <ScrollArea class={styles.root}>
            <ScrollAreaViewport>
              <ScrollAreaContent><TextContent /></ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
          <section>
            <h3>Follow-up items</h3>
            <p class={styles.paragraph}>{insideScrollSections[1]?.body}</p>
          </section>
        </div>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.providerStack}>
    <div class={styles.actions}>
      <Button
        size="sm"
        variant="outline"
        onclick={() => scrollArea().scrollToEdge({ edge: 'top' })}
      >
        Top
      </Button>
      <Button
        size="sm"
        variant="outline"
        onclick={() => scrollArea().scrollToEdge({ edge: 'bottom' })}
      >
        Bottom
      </Button>
    </div>
    <ScrollAreaRootProvider value={scrollArea} class={styles.root}>
      <ScrollAreaViewport>
        <ScrollAreaContent><TextContent /></ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRootProvider>
  </div>
</Story>