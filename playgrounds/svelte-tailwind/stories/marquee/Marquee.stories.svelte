<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Marquee,
    MarqueeContent,
    MarqueeEdge,
    MarqueeRootProvider,
    MarqueeViewport,
    useMarquee,
  } from '@/components/marquee';
  import { LocaleProvider } from '@/locale';
  import BasicMarquee from './BasicMarquee.svelte';
  import MarqueeItems from './MarqueeItems.svelte';

  const rootClass = 'w-[32rem] max-w-[calc(100vw-2rem)]';
  const verticalRootClass = 'h-72 w-56 max-w-[calc(100vw-2rem)]';
  const customRootClass =
    'w-[34rem] max-w-[calc(100vw-2rem)] rounded-lg border border-border bg-card p-3';
  const providerStackClass = 'grid gap-3';
  const actionsClass = 'flex justify-end gap-2';
  const statusClass = 'flex gap-3 text-sm leading-5 text-muted-foreground';

  const { Story } = defineMeta({
    title: 'Components/Marquee',
    component: Marquee,
    parameters: { layout: 'centered' },
  });
</script>

<script lang="ts">
  let loopCount = $state(0);
  let completeCount = $state(0);
  const marquee = useMarquee({
    id: 'marquee-root-provider',
    translations: { root: 'Partner logos' },
  });
</script>

<Story name="Basic" asChild>
  <BasicMarquee />
</Story>

<Story name="Auto Fill" exportName="AutoFill" asChild>
  <BasicMarquee autoFill spacing="2rem" />
</Story>

<Story name="Pause on Interaction" exportName="PauseOnInteraction" asChild>
  <BasicMarquee pauseOnInteraction />
</Story>

<Story name="Reverse" asChild>
  <BasicMarquee reverse />
</Story>

<Story name="RTL" exportName="RTL" asChild>
  <LocaleProvider locale="ar">
    <Marquee aria-label="Partner logos" class={rootClass}>
      <MarqueeEdge side="start" />
      <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  </LocaleProvider>
</Story>

<Story name="Vertical" asChild>
  <BasicMarquee side="bottom" class={verticalRootClass} />
</Story>

<Story name="Speed" asChild>
  <div class={providerStackClass}>
    <BasicMarquee aria-label="Slow partner logos" speed={25} />
    <BasicMarquee aria-label="Fast partner logos" speed={100} />
  </div>
</Story>

<Story name="Finite Loops" exportName="FiniteLoops" asChild>
  <div class={providerStackClass}>
    <BasicMarquee
      loopCount={3}
      onLoopComplete={() => loopCount++}
      onComplete={() => completeCount++}
    />
    <div class={statusClass}>
      <span>Loops: {loopCount}</span>
      <span>Completed: {completeCount}</span>
    </div>
  </div>
</Story>

<Story name="With Edges" exportName="WithEdges" asChild>
  <Marquee aria-label="Partner logos" class={rootClass}>
    <MarqueeEdge side="start" />
    <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
    <MarqueeEdge side="end" />
  </Marquee>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={providerStackClass}>
    <div class={actionsClass}>
      <Button size="sm" variant="outline" onclick={() => marquee().pause()}>Pause</Button>
      <Button size="sm" variant="outline" onclick={() => marquee().resume()}>Resume</Button>
    </div>
    <MarqueeRootProvider value={marquee} class={rootClass}>
      <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
    </MarqueeRootProvider>
  </div>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <Marquee aria-label="Partner logos" autoFill pauseOnInteraction class={customRootClass}>
    <MarqueeEdge side="start" />
    <MarqueeViewport><MarqueeContent><MarqueeItems custom /></MarqueeContent></MarqueeViewport>
    <MarqueeEdge side="end" />
  </Marquee>
</Story>