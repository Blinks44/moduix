import { createSignal } from 'solid-js';
import type { JSX } from 'solid-js';
import type { Meta, StoryObj } from 'storybook-solidjs-vite';
import { Button } from '@/components/button/Button';
import { Carousel, useCarousel } from '@/components/carousel/Carousel';
import { PlusIcon } from '@/internal/icons/ui/Icons';
import { cn } from '@/lib/moduix/cn';

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
] as const;

const variableSlides = [
  { id: 'wide-1', width: '13rem', image: slides[0].image, alt: slides[0].alt },
  { id: 'wide-2', width: '18rem', image: slides[1].image, alt: slides[1].alt },
  { id: 'wide-3', width: '10rem', image: slides[2].image, alt: slides[2].alt },
  { id: 'wide-4', width: '22rem', image: slides[3].image, alt: slides[3].alt },
  { id: 'wide-5', width: '14rem', image: slides[4].image, alt: slides[4].alt },
] as const;

const frameClass = 'w-[min(52rem,calc(100vw-4rem))]';
const carouselClass = 'w-full max-w-128';
const wideCarouselClass = 'w-full max-w-192';
const imageClass =
  'block h-84 w-full overflow-hidden rounded-xl border border-border bg-card shadow-sm';
const shortImageClass = 'h-60';
const statusClass = 'm-0 text-sm text-muted-foreground tabular-nums';
const controlsClass = 'justify-center';

function ImageSlide(props: {
  src: string;
  alt: string;
  class?: string;
  style?: JSX.CSSProperties;
}) {
  return (
    <figure class={cn(imageClass, props.class)} style={props.style}>
      <img src={props.src} alt={props.alt} class="block size-full object-cover" />
    </figure>
  );
}

function Slides(props: { class?: string }) {
  return slides.map((slide, index) => (
    <Carousel.Item index={index}>
      <ImageSlide src={slide.image} alt={slide.alt} class={props.class} />
    </Carousel.Item>
  ));
}

const meta = {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div class={frameClass}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Carousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Basic image carousel"
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.ItemGroup aria-label="Basic image carousel">
        <Slides />
      </Carousel.ItemGroup>
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
      <Carousel.ProgressText />
    </Carousel>
  ),
};

export const Controlled: Story = {
  args: { slideCount: slides.length },
  render: () => {
    const [page, setPage] = createSignal(0);

    return (
      <Carousel
        aria-label="Controlled image carousel"
        slideCount={slides.length}
        page={page()}
        onPageChange={(details) => setPage(details.page)}
        class={carouselClass}
        spacing="1em"
      >
        <Carousel.ItemGroup aria-label="Controlled image carousel">
          <Slides />
        </Carousel.ItemGroup>
        <Carousel.Control class={controlsClass}>
          <Carousel.PrevTrigger />
          <Carousel.NextTrigger />
        </Carousel.Control>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <Carousel.Indicators />
          <output class={statusClass}>Page {page() + 1}</output>
        </div>
      </Carousel>
    );
  },
};

export const DynamicSlides: Story = {
  args: { slideCount: slides.length },
  render: () => {
    const [count, setCount] = createSignal(4);
    const [page, setPage] = createSignal(0);
    const visibleSlides = () => slides.slice(0, count());

    return (
      <div class="grid justify-items-start gap-3">
        <Carousel
          aria-label="Dynamic image carousel"
          slideCount={visibleSlides().length}
          page={page()}
          onPageChange={(details) => setPage(details.page)}
          class={carouselClass}
          spacing="1em"
        >
          <Carousel.ItemGroup aria-label="Dynamic image carousel">
            {visibleSlides().map((slide, index) => (
              <Carousel.Item index={index}>
                <ImageSlide src={slide.image} alt={slide.alt} />
              </Carousel.Item>
            ))}
          </Carousel.ItemGroup>
          <Carousel.Control>
            <Carousel.PrevTrigger />
            <Carousel.Indicators />
            <Carousel.NextTrigger />
          </Carousel.Control>
        </Carousel>
        <Button
          onClick={() => setCount((currentCount) => Math.min(slides.length, currentCount + 1))}
          disabled={count() === slides.length}
          variant="outline"
        >
          <PlusIcon />
          Add slide
        </Button>
      </div>
    );
  },
};

export const PauseOnHover: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Pause on hover image carousel"
      autoplay
      loop
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.Context>
        {(api) => (
          <>
            <p class={statusClass}>Autoplay: {api().isPlaying ? 'playing' : 'paused'}</p>
            <Carousel.ItemGroup
              onFocus={() => api().pause()}
              onPointerEnter={() => api().pause()}
              onPointerLeave={() => api().play()}
            >
              <Slides />
            </Carousel.ItemGroup>
            <Carousel.Control
              onFocus={() => api().pause()}
              onPointerEnter={() => api().pause()}
              onPointerLeave={() => api().play()}
            >
              <Carousel.AutoplayTrigger>
                <Carousel.AutoplayIndicator fallback="Play">Pause</Carousel.AutoplayIndicator>
              </Carousel.AutoplayTrigger>
              <Carousel.Indicators />
            </Carousel.Control>
          </>
        )}
      </Carousel.Context>
    </Carousel>
  ),
};

export const RootProvider: Story = {
  args: { slideCount: slides.length },
  render: () => {
    const carousel = useCarousel({ slideCount: slides.length, spacing: '1em' });

    return (
      <div class="grid justify-items-start gap-3">
        <output class={statusClass}>Page {carousel().page + 1}</output>
        <Carousel.RootProvider
          aria-label="Root provider image carousel"
          value={carousel}
          class={carouselClass}
        >
          <Carousel.ItemGroup aria-label="Root provider image carousel">
            <Slides />
          </Carousel.ItemGroup>
          <Carousel.Control class={controlsClass}>
            <Carousel.PrevTrigger />
            <Carousel.NextTrigger />
          </Carousel.Control>
          <Carousel.Indicators />
        </Carousel.RootProvider>
      </div>
    );
  },
};

export const ScrollTo: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Scroll to image carousel"
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.Context>
        {(api) => (
          <div class="flex items-center justify-between gap-3">
            <Button onClick={() => api().scrollToIndex(3)} variant="outline">
              Go to slide 4
            </Button>
          </div>
        )}
      </Carousel.Context>
      <Carousel.ItemGroup aria-label="Scroll to image carousel">
        <Slides />
      </Carousel.ItemGroup>
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
    </Carousel>
  ),
};

export const SlidesPerPage: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Two-up image carousel"
      slideCount={slides.length}
      slidesPerPage={2}
      spacing="1em"
      class={wideCarouselClass}
    >
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.ItemGroup aria-label="Two-up image carousel">
        <Slides class={shortImageClass} />
      </Carousel.ItemGroup>
      <Carousel.Indicators />
    </Carousel>
  ),
};

export const Spacing: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Spaced image carousel"
      slideCount={slides.length}
      slidesPerPage={1.5}
      spacing="1em"
      class={wideCarouselClass}
    >
      <p class={statusClass}>spacing=&quot;1em&quot;</p>
      <Carousel.ItemGroup aria-label="Spaced image carousel">
        <Slides class={shortImageClass} />
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.Indicators />
        <Carousel.NextTrigger />
      </Carousel.Control>
    </Carousel>
  ),
};

export const ThumbnailIndicator: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Image carousel with thumbnail indicators"
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.ItemGroup aria-label="Image carousel with thumbnail indicators">
        <Slides />
      </Carousel.ItemGroup>
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.IndicatorGroup class="flex-wrap">
        {slides.map((slide, index) => (
          <Carousel.Indicator
            index={index}
            class="h-12 w-20 overflow-hidden rounded-lg border border-transparent bg-transparent p-0 opacity-65 transition-[border-color,opacity,transform] hover:opacity-90 data-current:h-12 data-current:w-20 data-current:-translate-y-px data-current:border-primary data-current:bg-transparent data-current:opacity-100"
          >
            <img src={slide.image} alt={slide.alt} class="block size-full object-cover" />
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel>
  ),
};

export const VariableSize: Story = {
  args: { slideCount: variableSlides.length },
  render: () => (
    <Carousel
      aria-label="Variable image carousel"
      autoSize
      padding="1rem"
      spacing="1em"
      slideCount={variableSlides.length}
      class={carouselClass}
    >
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.ItemGroup aria-label="Variable image carousel">
        {variableSlides.map((slide, index) => (
          <Carousel.Item index={index} snapAlign="center">
            <ImageSlide
              src={slide.image}
              alt={slide.alt}
              class={shortImageClass}
              style={{ width: slide.width }}
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Indicators />
    </Carousel>
  ),
};

export const Autoplay: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Autoplay image carousel"
      autoplay={{ delay: 3500 }}
      loop
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.Context>
        {(api) => (
          <>
            <Carousel.ItemGroup
              aria-label="Autoplay image carousel"
              onFocus={() => api().pause()}
              onPointerEnter={() => api().pause()}
            >
              <Slides />
            </Carousel.ItemGroup>
            <Carousel.Control
              class={controlsClass}
              onFocus={() => api().pause()}
              onPointerEnter={() => api().pause()}
            >
              <Carousel.AutoplayTrigger>
                <Carousel.AutoplayIndicator fallback="Play">Pause</Carousel.AutoplayIndicator>
              </Carousel.AutoplayTrigger>
              <Carousel.PrevTrigger />
              <Carousel.Indicators />
              <Carousel.NextTrigger />
            </Carousel.Control>
          </>
        )}
      </Carousel.Context>
    </Carousel>
  ),
};

export const Loop: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Looping image carousel"
      loop
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.ItemGroup aria-label="Looping image carousel">
        <Slides />
      </Carousel.ItemGroup>
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
      <Carousel.ProgressText />
    </Carousel>
  ),
};

export const MouseDrag: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      allowMouseDrag
      aria-label="Mouse draggable image carousel"
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.ItemGroup aria-label="Mouse draggable image carousel">
        <Slides />
      </Carousel.ItemGroup>
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
      <Carousel.ProgressText />
    </Carousel>
  ),
};

export const Rtl: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Right-to-left image carousel"
      dir="rtl"
      slideCount={slides.length}
      class={carouselClass}
      spacing="1em"
    >
      <Carousel.ItemGroup aria-label="Right-to-left image carousel">
        <Slides />
      </Carousel.ItemGroup>
      <Carousel.Control class={controlsClass}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
      <Carousel.ProgressText />
    </Carousel>
  ),
};

export const Vertical: Story = {
  args: { slideCount: slides.length },
  render: () => (
    <Carousel
      aria-label="Vertical image carousel"
      orientation="vertical"
      slideCount={slides.length}
      class="w-full max-w-152 data-[orientation=vertical]:h-112"
      spacing="1em"
    >
      <Carousel.ItemGroup aria-label="Vertical image carousel">
        <Slides class="h-full" />
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.Indicators />
        <Carousel.NextTrigger />
      </Carousel.Control>
    </Carousel>
  ),
};