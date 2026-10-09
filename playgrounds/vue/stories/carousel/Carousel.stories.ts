import type { Meta, StoryObj } from '@storybook/vue3-vite';
import { computed, defineComponent, ref } from 'vue';
import { Button } from '@/components/button';
import {
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselContext,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
  CarouselRootProvider,
  useCarousel,
} from '@/components/carousel';
import { PlusIcon } from '@/lib/moduix/icons/ui/Icons';
import styles from './Carousel.stories.module.css';

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

const slides = [
  {
    id: 'fjord',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    id: 'coast',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
    alt: 'Ocean waves rolling onto a sandy beach.',
  },
  {
    id: 'village',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80',
    alt: 'A colorful hillside town on the coast.',
  },
  {
    id: 'forest',
    image:
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80',
    alt: 'A misty green forest with tall trees.',
  },
  {
    id: 'desert',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80',
    alt: 'Golden sand dunes under a bright sky.',
  },
  {
    id: 'lake',
    image:
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1280&q=80',
    alt: 'A quiet alpine lake surrounded by trees.',
  },
];

const variableSlides = [
  { id: 'wide-1', width: '13rem', image: slides[0].image, alt: slides[0].alt },
  { id: 'wide-2', width: '18rem', image: slides[1].image, alt: slides[1].alt },
  { id: 'wide-3', width: '10rem', image: slides[2].image, alt: slides[2].alt },
  { id: 'wide-4', width: '22rem', image: slides[3].image, alt: slides[3].alt },
  { id: 'wide-5', width: '14rem', image: slides[4].image, alt: slides[4].alt },
];

const ImageSlide = defineComponent({
  props: {
    alt: { type: String, required: true },
    src: { type: String, required: true },
  },
  setup(props) {
    return { props, styles };
  },
  template: `
    <figure :class="styles.slide">
      <img :src="props.src" :alt="props.alt" :class="styles.image" />
    </figure>
  `,
});

const storyComponents = {
  Button,
  Carousel,
  CarouselAutoplayIndicator,
  CarouselAutoplayTrigger,
  CarouselContext,
  CarouselControl,
  CarouselIndicator,
  CarouselIndicatorGroup,
  CarouselIndicators,
  CarouselItem,
  CarouselItemGroup,
  CarouselNextTrigger,
  CarouselPrevTrigger,
  CarouselProgressText,
  CarouselRootProvider,
  ImageSlide,
  PlusIcon,
};

function renderStory(template: string, setup?: () => Record<string, unknown>) {
  return () =>
    defineComponent({
      components: storyComponents,
      setup() {
        return { slides, styles, variableSlides, ...setup?.() };
      },
      template,
    });
}

export const Basic: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel aria-label="Basic image carousel" :class="styles.carousel" spacing="1em" :slide-count="slides.length">
        <CarouselItemGroup aria-label="Basic image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselIndicators />
        <CarouselProgressText />
      </Carousel>
    </div>
  `),
};

export const Controlled: Story = {
  args: { slideCount: slides.length },
  render: renderStory(
    `
      <div :class="styles.frame">
        <Carousel
          aria-label="Controlled image carousel"
          :class="styles.carousel"
          spacing="1em"
          :page="page"
          :slide-count="slides.length"
          @page-change="page = $event.page"
        >
          <CarouselItemGroup aria-label="Controlled image carousel">
            <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
              <ImageSlide :src="slide.image" :alt="slide.alt" />
            </CarouselItem>
          </CarouselItemGroup>
          <CarouselControl :class="styles.compactControls">
            <CarouselPrevTrigger />
            <CarouselNextTrigger />
          </CarouselControl>
          <div :class="styles.statusRow">
            <CarouselIndicators />
            <output :class="styles.output">Page {{ page + 1 }}</output>
          </div>
        </Carousel>
      </div>
    `,
    () => ({ page: ref(0) }),
  ),
};

export const DynamicSlides: Story = {
  args: { slideCount: slides.length },
  render: renderStory(
    `
      <div :class="styles.frame">
        <div :class="styles.exampleStack">
          <Carousel
            aria-label="Dynamic image carousel"
            :class="styles.carousel"
            :page="page"
            :slide-count="visibleSlides.length"
            spacing="1em"
            @page-change="page = $event.page"
          >
            <CarouselItemGroup aria-label="Dynamic image carousel">
              <CarouselItem v-for="(slide, index) in visibleSlides" :key="slide.id" :index="index">
                <ImageSlide :src="slide.image" :alt="slide.alt" />
              </CarouselItem>
            </CarouselItemGroup>
            <CarouselControl>
              <CarouselPrevTrigger />
              <CarouselIndicators />
              <CarouselNextTrigger />
            </CarouselControl>
          </Carousel>
          <Button
            variant="outline"
            :disabled="count === slides.length"
            @click="count = Math.min(slides.length, count + 1)"
          >
            <PlusIcon />
            Add slide
          </Button>
        </div>
      </div>
    `,
    () => {
      const count = ref(4);
      const page = ref(0);
      const visibleSlides = computed(() => slides.slice(0, count.value));
      return { count, page, visibleSlides };
    },
  ),
};

export const PauseOnHover: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel aria-label="Pause on hover image carousel" autoplay loop :class="styles.carousel" :slide-count="slides.length" spacing="1em">
        <CarouselContext v-slot="api">
          <p :class="styles.statusText">Autoplay: {{ api.isPlaying ? 'playing' : 'paused' }}</p>
          <CarouselItemGroup
            @focusin="api.pause()"
            @pointerenter="api.pause()"
            @pointerleave="api.play()"
          >
            <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
              <ImageSlide :src="slide.image" :alt="slide.alt" />
            </CarouselItem>
          </CarouselItemGroup>
          <CarouselControl @focusin="api.pause()" @pointerenter="api.pause()" @pointerleave="api.play()">
            <CarouselAutoplayTrigger>
              <CarouselAutoplayIndicator fallback="Play">Pause</CarouselAutoplayIndicator>
            </CarouselAutoplayTrigger>
            <CarouselIndicators />
          </CarouselControl>
        </CarouselContext>
      </Carousel>
    </div>
  `),
};

export const RootProvider: Story = {
  args: { slideCount: slides.length },
  render: renderStory(
    `
      <div :class="styles.frame">
        <div :class="styles.exampleStack">
          <output :class="styles.output">Page {{ carousel.page + 1 }}</output>
          <CarouselRootProvider aria-label="Root provider image carousel" :class="styles.carousel" :value="carousel">
            <CarouselItemGroup aria-label="Root provider image carousel">
              <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
                <ImageSlide :src="slide.image" :alt="slide.alt" />
              </CarouselItem>
            </CarouselItemGroup>
            <CarouselControl :class="styles.compactControls">
              <CarouselPrevTrigger />
              <CarouselNextTrigger />
            </CarouselControl>
            <CarouselIndicators />
          </CarouselRootProvider>
        </div>
      </div>
    `,
    () => ({ carousel: useCarousel({ slideCount: slides.length, spacing: '1em' }) }),
  ),
};

export const ScrollTo: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel aria-label="Scroll to image carousel" :class="styles.carousel" :slide-count="slides.length" spacing="1em">
        <CarouselContext v-slot="api">
          <div :class="styles.toolbar">
            <Button variant="outline" @click="api.scrollToIndex(3)">Go to slide 4</Button>
          </div>
        </CarouselContext>
        <CarouselItemGroup aria-label="Scroll to image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselIndicators />
      </Carousel>
    </div>
  `),
};

export const SlidesPerPage: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel
        aria-label="Two-up image carousel"
        :class="[styles.carousel, styles.wideCarousel]"
        :slide-count="slides.length"
        :slides-per-page="2"
        spacing="1em"
      >
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselItemGroup aria-label="Two-up image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :class="styles.shortSlide" :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselIndicators />
      </Carousel>
    </div>
  `),
};

export const Spacing: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel
        aria-label="Spaced image carousel"
        :class="[styles.carousel, styles.wideCarousel]"
        :slide-count="slides.length"
        :slides-per-page="1.5"
        spacing="1em"
      >
        <p :class="styles.statusText">spacing="1em"</p>
        <CarouselItemGroup aria-label="Spaced image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :class="styles.shortSlide" :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl>
          <CarouselPrevTrigger />
          <CarouselIndicators />
          <CarouselNextTrigger />
        </CarouselControl>
      </Carousel>
    </div>
  `),
};

export const ThumbnailIndicator: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel aria-label="Image carousel with thumbnail indicators" :class="styles.carousel" :slide-count="slides.length" spacing="1em">
        <CarouselItemGroup aria-label="Image carousel with thumbnail indicators">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselIndicatorGroup :class="styles.thumbnailGroup">
          <CarouselIndicator v-for="(slide, index) in slides" :key="slide.id" :class="styles.thumbnailIndicator" :index="index">
            <img :class="styles.thumbnailImage" :src="slide.image" :alt="slide.alt" />
          </CarouselIndicator>
        </CarouselIndicatorGroup>
      </Carousel>
    </div>
  `),
};

export const VariableSize: Story = {
  args: { slideCount: variableSlides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel
        aria-label="Variable image carousel"
        auto-size
        :class="styles.carousel"
        padding="var(--moduix-spacing-4)"
        :slide-count="variableSlides.length"
        spacing="1em"
      >
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselItemGroup aria-label="Variable image carousel">
          <CarouselItem v-for="(slide, index) in variableSlides" :key="slide.id" :index="index" snap-align="center">
            <ImageSlide
              :class="styles.variableSlide"
              :src="slide.image"
              :alt="slide.alt"
              :style="{ width: slide.width }"
            />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselIndicators />
      </Carousel>
    </div>
  `),
};

export const Autoplay: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel
        aria-label="Autoplay image carousel"
        :autoplay="{ delay: 3500 }"
        loop
        :class="styles.carousel"
        :slide-count="slides.length"
        spacing="1em"
      >
        <CarouselContext v-slot="api">
          <CarouselItemGroup aria-label="Autoplay image carousel" @focusin="api.pause()" @pointerenter="api.pause()">
            <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
              <ImageSlide :src="slide.image" :alt="slide.alt" />
            </CarouselItem>
          </CarouselItemGroup>
          <CarouselControl :class="styles.compactControls" @focusin="api.pause()" @pointerenter="api.pause()">
            <CarouselAutoplayTrigger>
              <CarouselAutoplayIndicator fallback="Play">Pause</CarouselAutoplayIndicator>
            </CarouselAutoplayTrigger>
            <CarouselPrevTrigger />
            <CarouselIndicators />
            <CarouselNextTrigger />
          </CarouselControl>
        </CarouselContext>
      </Carousel>
    </div>
  `),
};

export const Loop: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel aria-label="Looping image carousel" loop :class="styles.carousel" :slide-count="slides.length" spacing="1em">
        <CarouselItemGroup aria-label="Looping image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselIndicators />
        <CarouselProgressText />
      </Carousel>
    </div>
  `),
};

export const MouseDrag: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel
        allow-mouse-drag
        aria-label="Mouse draggable image carousel"
        :class="styles.carousel"
        :slide-count="slides.length"
        spacing="1em"
      >
        <CarouselItemGroup aria-label="Mouse draggable image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselIndicators />
        <CarouselProgressText />
      </Carousel>
    </div>
  `),
};

export const Rtl: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel aria-label="Right-to-left image carousel" dir="rtl" :class="styles.carousel" :slide-count="slides.length" spacing="1em">
        <CarouselItemGroup aria-label="Right-to-left image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl :class="styles.compactControls">
          <CarouselPrevTrigger />
          <CarouselNextTrigger />
        </CarouselControl>
        <CarouselIndicators />
        <CarouselProgressText />
      </Carousel>
    </div>
  `),
};

export const Vertical: Story = {
  args: { slideCount: slides.length },
  render: renderStory(`
    <div :class="styles.frame">
      <Carousel
        aria-label="Vertical image carousel"
        :class="[styles.carousel, styles.verticalCarousel]"
        orientation="vertical"
        :slide-count="slides.length"
        spacing="1em"
      >
        <CarouselItemGroup aria-label="Vertical image carousel">
          <CarouselItem v-for="(slide, index) in slides" :key="slide.id" :index="index">
            <ImageSlide :class="styles.verticalSlide" :src="slide.image" :alt="slide.alt" />
          </CarouselItem>
        </CarouselItemGroup>
        <CarouselControl>
          <CarouselPrevTrigger />
          <CarouselIndicators />
          <CarouselNextTrigger />
        </CarouselControl>
      </Carousel>
    </div>
  `),
};