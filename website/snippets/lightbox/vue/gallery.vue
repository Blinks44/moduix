<script setup lang="ts">
import {
  Carousel,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
} from '@moduix/vue/carousel';
import {
  Lightbox,
  LightboxBackdrop,
  LightboxBody,
  LightboxCloseIcon,
  LightboxContent,
  LightboxGallery,
  LightboxPositioner,
  LightboxTrigger,
} from '@moduix/vue/lightbox';
import { ref } from 'vue';
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

const activeIndex = ref(0);
const activeImage = () => images[activeIndex.value] ?? images[0];
const selectImage = ({ value }: { value: string | null }) => {
  const nextIndex = images.findIndex((image) => image.id === value);
  activeIndex.value = nextIndex >= 0 ? nextIndex : 0;
};
</script>

<template>
  <Lightbox @trigger-value-change="selectImage">
    <div :class="styles.gallery">
      <LightboxTrigger v-for="image in images" :key="image.id" :value="image.id" as-child>
        <button type="button" :class="styles.galleryTrigger">
          <img :src="image.thumbnail" :alt="image.alt" />
        </button>
      </LightboxTrigger>
    </div>

    <LightboxBackdrop />
    <LightboxPositioner>
      <LightboxContent :aria-label="activeImage().alt">
        <LightboxCloseIcon />
        <LightboxBody>
          <LightboxGallery>
            <Carousel
              aria-label="Server-driven image carousel"
              :page="activeIndex"
              :slide-count="images.length"
              @page-change="activeIndex = $event.page"
            >
              <CarouselControl>
                <CarouselPrevTrigger />
                <CarouselItemGroup>
                  <CarouselItem v-for="(image, index) in images" :key="image.id" :index="index">
                    <img :src="image.src" :alt="image.alt" />
                  </CarouselItem>
                </CarouselItemGroup>
                <CarouselNextTrigger />
              </CarouselControl>
              <CarouselIndicatorGroup>
                <CarouselIndicator v-for="(image, index) in images" :key="image.id" :index="index">
                  <img :src="image.thumbnail" alt="" />
                </CarouselIndicator>
              </CarouselIndicatorGroup>
            </Carousel>
          </LightboxGallery>
        </LightboxBody>
      </LightboxContent>
    </LightboxPositioner>
  </Lightbox>
</template>