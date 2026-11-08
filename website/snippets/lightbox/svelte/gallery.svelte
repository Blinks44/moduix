<script lang="ts">
  import {
    Carousel,
    CarouselControl,
    CarouselIndicator,
    CarouselIndicatorGroup,
    CarouselItem,
    CarouselItemGroup,
    CarouselNextTrigger,
    CarouselPrevTrigger,
  } from '@moduix/svelte/carousel';
  import {
    Lightbox,
    LightboxBackdrop,
    LightboxBody,
    LightboxCloseIcon,
    LightboxContent,
    LightboxGallery,
    LightboxPositioner,
    LightboxTrigger,
  } from '@moduix/svelte/lightbox';
  import styles from '@/components/examples/lightbox/lightbox-gallery.module.css';

  const images = [
    {
      id: 'mountain',
      thumbnail:
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2200&q=90',
      alt: 'Mountain ridge at sunset',
    },
    {
      id: 'sea',
      thumbnail:
        'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
      src: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1800&q=90',
      alt: 'Sea cliffs under a cloudy sky',
    },
    {
      id: 'forest',
      thumbnail:
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1800&q=90',
      alt: 'Road through a green forest',
    },
  ];

  let activeIndex = $state(0);
  const activeImage = $derived(images[activeIndex] ?? images[0]);
  const selectImage = ({ value }: { value: string | null }) => {
    const nextIndex = images.findIndex((image) => image.id === value);
    activeIndex = nextIndex >= 0 ? nextIndex : 0;
  };
</script>

<Lightbox onTriggerValueChange={selectImage}>
  <div class={styles.gallery}>
    {#each images as image (image.id)}
      <LightboxTrigger value={image.id}>
        {#snippet asChild(props)}
          <button {...props()} type="button" class={styles.galleryTrigger}>
            <img src={image.thumbnail} alt={image.alt} />
          </button>
        {/snippet}
      </LightboxTrigger>
    {/each}
  </div>

  <LightboxBackdrop />
  <LightboxPositioner>
    <LightboxContent aria-label={activeImage.alt}>
      <LightboxCloseIcon />
      <LightboxBody>
        <LightboxGallery>
          <Carousel
            aria-label="Server-driven image carousel"
            bind:page={activeIndex}
            slideCount={images.length}
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
                  <img src={image.thumbnail} alt="" />
                </CarouselIndicator>
              {/each}
            </CarouselIndicatorGroup>
          </Carousel>
        </LightboxGallery>
      </LightboxBody>
    </LightboxContent>
  </LightboxPositioner>
</Lightbox>