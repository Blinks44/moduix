<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import { Button } from '@/components/button';
  import {
    Swap,
    SwapIndicator,
    SwapRootProvider,
    type SwapAnimation,
    useSwap,
  } from '@/components/swap';
  import { CheckIcon, PauseIcon, PlayIcon, UploadIcon } from '@/lib/moduix/icons/ui';

  const { Story } = defineMeta({
    title: 'Utilities/Swap',
    component: Swap,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const animations = [
    'fade',
    'scale',
    'rotate',
    'flip',
  ] as const satisfies readonly SwapAnimation[];
</script>

<script lang="ts">
  let uploaded = $state(false);
  let playing = $state(false);
  let swapped = $state(false);
  let providerSwapped = $state(false);
  let hovered = $state(false);
  let focused = $state(false);
  const expanded = $derived(hovered || focused);
  const swap = useSwap(() => ({ swap: providerSwapped }));
</script>

<Story name="Icons" asChild>
  <Button aria-label={uploaded ? 'Uploaded' : 'Upload'} onclick={() => (uploaded = !uploaded)}>
    <Swap swap={uploaded}>
      <SwapIndicator aria-hidden="true" type="off"><UploadIcon /></SwapIndicator>
      <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
    </Swap>
  </Button>
</Story>

<Story name="Button Feedback" asChild>
  <Button
    aria-label={playing ? 'Pause playback' : 'Play playback'}
    class="w-28 min-w-28 overflow-hidden transition-[width,min-width] duration-normal ease-in-out data-playing:w-30 data-playing:min-w-30"
    data-playing={playing || undefined}
    onclick={() => (playing = !playing)}
  >
    <Swap class="w-full" swap={playing}>
      <SwapIndicator aria-hidden="true" class="gap-2" type="off">
        <PlayIcon />
        Play
      </SwapIndicator>
      <SwapIndicator aria-hidden="true" class="gap-2" type="on">
        <PauseIcon />
        Pause
      </SwapIndicator>
    </Swap>
  </Button>
</Story>

<Story name="Animation Presets" asChild>
  <div class="flex flex-wrap justify-center gap-2">
    {#each animations as animationName (animationName)}
      <Button aria-label={animationName + ' animation'} onclick={() => (swapped = !swapped)}>
        <Swap animation={animationName} swap={swapped}>
          <SwapIndicator aria-hidden="true" type="off"><UploadIcon /></SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
        </Swap>
      </Button>
    {/each}
  </div>
</Story>

<Story name="Root Provider" asChild>
  <div class="grid justify-items-center gap-3">
    <SwapRootProvider value={swap}>
      {#snippet asChild(props)}
        <Button
          {...props()}
          aria-label={providerSwapped ? 'Uploaded' : 'Upload'}
          onclick={() => (providerSwapped = !providerSwapped)}
        >
          <SwapIndicator aria-hidden="true" type="off"><UploadIcon /></SwapIndicator>
          <SwapIndicator aria-hidden="true" type="on"><CheckIcon /></SwapIndicator>
        </Button>
      {/snippet}
    </SwapRootProvider>
    <output>Visible: {providerSwapped ? 'Uploaded' : 'Upload'}</output>
  </div>
</Story>

<Story name="Expandable Button" asChild>
  <Button
    aria-label="Download"
    class="group/compact w-control-md min-w-control-md overflow-hidden transition-[width,min-width] duration-normal ease-in-out data-expanded:w-33 data-expanded:min-w-33"
    data-expanded={expanded || undefined}
    size="icon-md"
    onblur={() => (focused = false)}
    onfocus={() => (focused = true)}
    onpointerenter={() => (hovered = true)}
    onpointerleave={() => (hovered = false)}
  >
    <span
      class="inline-flex items-center justify-center gap-0 transition-[gap] duration-normal ease-in-out group-data-[expanded]/compact:gap-2"
    >
      <UploadIcon aria-hidden="true" />
      <Swap
        class="w-0 min-w-0 overflow-hidden transition-[width] duration-normal ease-in-out group-data-[expanded]/compact:w-17"
        swap={expanded}
      >
        <SwapIndicator aria-hidden="true" type="off" />
        <SwapIndicator aria-hidden="true" type="on">Download</SwapIndicator>
      </Swap>
    </span>
  </Button>
</Story>