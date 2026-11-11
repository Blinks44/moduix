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
  import storyStyles from './Lightbox.stories.module.css';
  import LightboxStatus from './LightboxStatus.svelte';
  import LightboxSurface from './LightboxSurface.svelte';

  const { Story } = defineMeta({
    title: 'Components/Lightbox',
    component: Lightbox,
    tags: ['autodocs'],
    parameters: { layout: 'centered' },
  });
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
        <button {...props()} type="button" class={storyStyles.imageTrigger}>
          <img src={images[0].src} alt={images[0].alt} />
        </button>
      {/snippet}
    </LightboxTrigger>
    <LightboxSurface src={images[0].src} alt={images[0].alt} />
  </Lightbox>
</Story>

<Story name="Controlled" asChild>
  <div class={storyStyles.stack}>
    <span>{open ? 'Open' : 'Closed'}</span>
    <Lightbox bind:open>
      <LightboxTrigger class={storyStyles.textTrigger}>Open controlled lightbox</LightboxTrigger>
      <LightboxSurface src={images[1].src} alt={images[1].alt} />
    </Lightbox>
  </div>
</Story>

<Story name="Multiple Triggers" asChild>
  <Lightbox onTriggerValueChange={selectImage}>
    <div class={storyStyles.gallery}>
      {#each images as image (image.id)}
        <LightboxTrigger value={image.id}>
          {#snippet asChild(props)}
            <button {...props()} type="button" class={storyStyles.galleryTrigger}>
              <img src={image.src} alt={image.alt} />
            </button>
          {/snippet}
        </LightboxTrigger>
      {/each}
    </div>
    <LightboxSurface src={activeImage.src} alt={activeImage.alt} />
  </Lightbox>
</Story>

<Story name="Root Provider And Context" asChild>
  <div class={storyStyles.stack}>
    <button type="button" class={storyStyles.textTrigger} onclick={() => lightbox().setOpen(true)}>
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
  <div bind:this={rootRef} class={storyStyles.gallery}>
    {#each images as image (image.id)}
      <button type="button" class={storyStyles.galleryTrigger}>
        <img src={image.src} data-lightbox-src={image.src} alt={image.alt} />
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
    <div class={storyStyles.gallery}>
      {#each images as image (image.id)}
        <LightboxTrigger value={image.id}>
          {#snippet asChild(props)}
            <button {...props()} type="button" class={storyStyles.galleryTrigger}>
              <img src={image.src} alt={image.alt} />
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
    <LightboxTrigger class={storyStyles.textTrigger}>Open click-to-close lightbox</LightboxTrigger>
    <LightboxSurface src={images[1].src} alt={images[1].alt} closeOnClick />
  </Lightbox>
</Story>

<Story name="Custom Styling" asChild>
  <Lightbox>
    <LightboxTrigger class={storyStyles.textTrigger}>Open styled lightbox</LightboxTrigger>
    <LightboxBackdrop class={storyStyles.customBackdrop} />
    <LightboxPositioner>
      <LightboxContent class={storyStyles.customContent} aria-label={images[1].alt}>
        <LightboxCloseIcon class={storyStyles.customCloseIcon} />
        <LightboxBody>
          <LightboxImage src={images[1].src} alt={images[1].alt} />
        </LightboxBody>
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</Story>