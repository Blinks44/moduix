<script module lang="ts">
  import { defineMeta } from '@storybook/addon-svelte-csf';
  import {
    Carousel,
    CarouselControl,
    CarouselIndicator,
    CarouselIndicatorGroup,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
  } from '@/components/carousel';
  import {
    Lightbox,
    LightboxBackdrop,
    LightboxBind,
    LightboxBody,
    LightboxCloseIcon,
    LightboxContent,
    LightboxDescription,
    LightboxFooter,
    LightboxGallery,
    LightboxHeader,
    LightboxImage,
    LightboxPositioner,
    LightboxRootProvider,
    LightboxTitle,
    LightboxTrigger,
    useLightbox,
    type LightboxImageSelectDetails,
  } from '@/components/lightbox';
  import { images } from './images';
  import LightboxStatus from './LightboxStatus.svelte';
  import LightboxSurface from './LightboxSurface.svelte';

  const { Story } = defineMeta({
    title: 'Components/Lightbox',
    component: Lightbox,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });

  const imageTriggerClass = 'block cursor-zoom-in rounded-md border-0 bg-transparent p-0';
  const stackClass = 'grid justify-items-center gap-3';
  const textTriggerClass = 'rounded-md border-0 bg-muted px-4 py-3 text-foreground';
  const galleryClass = 'grid w-[min(30rem,calc(100vw-2rem))] grid-cols-3 gap-3';
  const galleryTriggerClass = 'block w-full cursor-zoom-in rounded-sm border-0 bg-transparent p-0';
  const customBackdropClass = 'bg-slate-900/70';
  const customContentClass = 'max-h-[72dvh] max-w-[72vw]';
  const customCloseIconClass = 'rounded-md bg-muted [@media(hover:hover)]:hover:bg-accent';
  const imageTriggerImageClass = 'block aspect-[16/10] w-70 rounded-md object-cover';
  const galleryTriggerImageClass = 'block aspect-square w-full rounded-sm object-cover';
</script>

<script lang="ts">
  let open = $state(false);
  let activeImage = $state(images[0]);
  let activeIndex = $state(0);
  let boundImage = $state<LightboxImageSelectDetails | null>(null);
  let rootRef: HTMLElement | null = $state(null);
  const lightbox = useLightbox({ id: 'lightbox-root-provider' });
  const serverImage = $derived(images[activeIndex] ?? images[0]);

  const selectImage = ({ value }: { value: string | null }) => {
    activeImage = images.find((image) => image.id === value) ?? images[0];
  };
  const selectServerImage = ({ value }: { value: string | null }) => {
    const nextIndex = images.findIndex((image) => image.id === value);
    activeIndex = nextIndex >= 0 ? nextIndex : 0;
  };
  const selectBoundImage = (details: LightboxImageSelectDetails) => {
    boundImage = details;
  };
</script>

<Story name="Basic" asChild>
  <Lightbox>
    <LightboxTrigger>
      {#snippet asChild(props)}
        <button {...props()} type="button" class={imageTriggerClass}>
          <img src={images[0].src} alt={images[0].alt} class={imageTriggerImageClass} />
        </button>
      {/snippet}
    </LightboxTrigger>
    <LightboxSurface src={images[0].src} alt={images[0].alt} />
  </Lightbox>
</Story>

<Story name="Controlled" asChild>
  <div class={stackClass}>
    <span>{open ? 'Open' : 'Closed'}</span>
    <Lightbox bind:open>
      <LightboxTrigger class={textTriggerClass}>Open controlled lightbox</LightboxTrigger>
      <LightboxSurface src={images[1].src} alt={images[1].alt} />
    </Lightbox>
  </div>
</Story>

<Story name="Multiple Triggers" asChild>
  <Lightbox onTriggerValueChange={selectImage}>
    <div class={galleryClass}>
      {#each images as image (image.id)}
        <LightboxTrigger value={image.id}>
          {#snippet asChild(props)}
            <button {...props()} type="button" class={galleryTriggerClass}>
              <img src={image.src} alt={image.alt} class={galleryTriggerImageClass} />
            </button>
          {/snippet}
        </LightboxTrigger>
      {/each}
    </div>
    <LightboxSurface src={activeImage.src} alt={activeImage.alt} />
  </Lightbox>
</Story>

<Story name="Root Provider And Context" asChild>
  <div class={stackClass}>
    <button type="button" class={textTriggerClass} onclick={() => lightbox().setOpen(true)}>
      Lightbox is {lightbox().open ? 'open' : 'closed'}
    </button>
    <LightboxRootProvider value={lightbox}>
      <LightboxBackdrop />
      <LightboxPositioner>
        <LightboxContent aria-label={images[2].alt}>
          <LightboxCloseIcon />
          <LightboxHeader>
            <LightboxTitle>{images[2].alt}</LightboxTitle>
            <LightboxDescription>State comes from useLightbox.</LightboxDescription>
          </LightboxHeader>
          <LightboxBody>
            <LightboxImage src={images[2].src} alt={images[2].alt} />
          </LightboxBody>
          <LightboxFooter><LightboxStatus /></LightboxFooter>
        </LightboxContent>
      </LightboxPositioner>
    </LightboxRootProvider>
  </div>
</Story>

<Story name="Bound Content" asChild>
  <div bind:this={rootRef} class={galleryClass}>
    {#each images as image (image.id)}
      <button type="button" class={galleryTriggerClass}>
        <img
          src={image.src}
          data-lightbox-src={image.src}
          alt={image.alt}
          class={galleryTriggerImageClass}
        />
      </button>
    {/each}
  </div>
  <Lightbox lazyMount unmountOnExit>
    <LightboxBind rootRef={() => rootRef} selector="button" onImageSelect={selectBoundImage} />
    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxContent aria-label={boundImage?.alt ?? 'Image preview'}>
        <LightboxCloseIcon />
        <LightboxBody>
          {#if boundImage}
            <LightboxImage src={boundImage.src} alt={boundImage.alt ?? ''} />
          {/if}
        </LightboxBody>
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</Story>

<Story name="Gallery From Server Data" asChild>
  <Lightbox onTriggerValueChange={selectServerImage}>
    <div class={galleryClass}>
      {#each images as image (image.id)}
        <LightboxTrigger value={image.id}>
          {#snippet asChild(props)}
            <button {...props()} type="button" class={galleryTriggerClass}>
              <img src={image.src} alt={image.alt} class={galleryTriggerImageClass} />
            </button>
          {/snippet}
        </LightboxTrigger>
      {/each}
    </div>
    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxContent aria-label={serverImage.alt}>
        <LightboxCloseIcon />
        <LightboxBody>
          <LightboxGallery>
            <Carousel
              aria-label="Server-driven image carousel"
              page={activeIndex}
              slideCount={images.length}
              onPageChange={(details) => (activeIndex = details.page)}
            >
              <CarouselControl>
                <CarouselPrevTrigger />
                <CarouselItemGroup>
                  {#each images as image, index (image.id)}
                    <CarouselItem {index}>
                      <img src={image.src} alt={image.alt} />
                    </CarouselItem>
                  {/each}
                </CarouselItemGroup>
                <CarouselNextTrigger />
              </CarouselControl>
              <CarouselIndicatorGroup>
                {#each images as image, index (image.id)}
                  <CarouselIndicator {index}>
                    <img src={image.src} alt="" />
                  </CarouselIndicator>
                {/each}
              </CarouselIndicatorGroup>
            </Carousel>
          </LightboxGallery>
        </LightboxBody>
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</Story>

<Story name="Click To Close Image" asChild>
  <Lightbox>
    <LightboxTrigger class={textTriggerClass}>Open click-to-close lightbox</LightboxTrigger>
    <LightboxSurface src={images[1].src} alt={images[1].alt} closeOnClick />
  </Lightbox>
</Story>

<Story name="Custom Styling" asChild>
  <Lightbox>
    <LightboxTrigger class={textTriggerClass}>Open styled lightbox</LightboxTrigger>
    <LightboxBackdrop class={customBackdropClass} />
    <LightboxPositioner>
      <LightboxContent class={customContentClass} aria-label={images[1].alt}>
        <LightboxCloseIcon class={customCloseIconClass} />
        <LightboxBody>
          <LightboxImage src={images[1].src} alt={images[1].alt} />
        </LightboxBody>
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</Story>