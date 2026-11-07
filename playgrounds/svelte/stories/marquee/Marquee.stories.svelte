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
  import styles from './Marquee.stories.module.css';
  import MarqueeItems from './MarqueeItems.svelte';

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
    <Marquee aria-label="Partner logos" class={styles.root}>
      <MarqueeEdge side="start" />
      <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
      <MarqueeEdge side="end" />
    </Marquee>
  </LocaleProvider>
</Story>

<Story name="Vertical" asChild>
  <BasicMarquee side="bottom" class={styles.verticalRoot} />
</Story>

<Story name="Speed" asChild>
  <div class={styles.providerStack}>
    <BasicMarquee aria-label="Slow partner logos" speed={25} />
    <BasicMarquee aria-label="Fast partner logos" speed={100} />
  </div>
</Story>

<Story name="Finite Loops" exportName="FiniteLoops" asChild>
  <div class={styles.providerStack}>
    <BasicMarquee
      loopCount={3}
      onLoopComplete={() => loopCount++}
      onComplete={() => completeCount++}
    />
    <div class={styles.status}>
      <span>Loops: {loopCount}</span>
      <span>Completed: {completeCount}</span>
    </div>
  </div>
</Story>

<Story name="With Edges" exportName="WithEdges" asChild>
  <Marquee aria-label="Partner logos" class={styles.root}>
    <MarqueeEdge side="start" />
    <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
    <MarqueeEdge side="end" />
  </Marquee>
</Story>

<Story name="Root Provider" exportName="RootProvider" asChild>
  <div class={styles.providerStack}>
    <div class={styles.actions}>
      <Button size="sm" variant="outline" onclick={() => marquee().pause()}>Pause</Button>
      <Button size="sm" variant="outline" onclick={() => marquee().resume()}>Resume</Button>
    </div>
    <MarqueeRootProvider value={marquee} class={styles.root}>
      <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
    </MarqueeRootProvider>
  </div>
</Story>

<Story name="Custom Styling" exportName="CustomStyling" asChild>
  <Marquee aria-label="Partner logos" autoFill pauseOnInteraction class={styles.customRoot}>
    <MarqueeEdge side="start" />
    <MarqueeViewport><MarqueeContent><MarqueeItems /></MarqueeContent></MarqueeViewport>
    <MarqueeEdge side="end" />
  </Marquee>
</Story>