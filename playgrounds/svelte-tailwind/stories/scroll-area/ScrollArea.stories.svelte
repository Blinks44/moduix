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
  <ScrollArea class="h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border">
    <ScrollAreaViewport>
      <ScrollAreaContent><TextContent /></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Always Visible" exportName="AlwaysVisible" asChild>
  <ScrollArea
    class="h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border"
    variant="always"
  >
    <ScrollAreaViewport>
      <ScrollAreaContent><TextContent /></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Fade" asChild>
  <ScrollArea class="h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border" fade>
    <ScrollAreaViewport>
      <ScrollAreaContent><TextContent /></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Horizontal" asChild>
  <ScrollArea class="h-auto w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border">
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <p class="w-200 p-3 pb-6 text-sm text-foreground">{insideScrollSections[0]?.body}</p>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar orientation="horizontal"><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="RTL" exportName="RTL" asChild>
  <ScrollArea
    class="h-auto w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border"
    dir="rtl"
    variant="always"
  >
    <ScrollAreaViewport aria-label="ملاحظات الإصدار">
      <ScrollAreaContent>
        <p class="w-200 p-3 pb-6 text-sm text-foreground">
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
  <ScrollArea class="h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border">
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <div class="grid w-max grid-cols-[repeat(12,5rem)] grid-rows-[repeat(8,5rem)] gap-2 p-3">
          {#each gridItems as item (item)}
            <div
              class="grid place-items-center rounded-sm bg-muted text-sm font-medium text-foreground"
            >
              {item}
            </div>
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
  <ScrollArea class="h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border">
    <ScrollAreaViewport>
      <ScrollAreaContent>
        <div class="grid gap-3 p-3 pr-6">
          <section>
            <h3>Outer release notes</h3>
            <p class="text-sm text-foreground">{insideScrollSections[0]?.body}</p>
          </section>
          <ScrollArea class="h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border">
            <ScrollAreaViewport>
              <ScrollAreaContent><TextContent /></ScrollAreaContent>
            </ScrollAreaViewport>
            <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
            <ScrollAreaCorner />
          </ScrollArea>
          <section>
            <h3>Follow-up items</h3>
            <p class="text-sm text-foreground">{insideScrollSections[1]?.body}</p>
          </section>
        </div>
      </ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
    <ScrollAreaCorner />
  </ScrollArea>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class="grid gap-3">
    <div class="flex justify-end gap-2">
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
    <ScrollAreaRootProvider
      value={scrollArea}
      class="h-52 w-96 max-w-[calc(100vw-2rem)] rounded-lg border border-border"
    >
      <ScrollAreaViewport>
        <ScrollAreaContent><TextContent /></ScrollAreaContent>
      </ScrollAreaViewport>
      <ScrollAreaScrollbar><ScrollAreaThumb /></ScrollAreaScrollbar>
      <ScrollAreaCorner />
    </ScrollAreaRootProvider>
  </div>
</Story>