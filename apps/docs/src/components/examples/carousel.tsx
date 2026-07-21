import { useCarousel } from '@ark-ui/react/carousel';
import { Button, Carousel } from '@moduix/react';
import { clsx } from 'clsx';
import { Plus as PlusIcon } from 'lucide-react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './carousel.module.css';

const gallerySlides = [
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
  { id: 'wide-1', width: '13rem', image: gallerySlides[0].image, alt: gallerySlides[0].alt },
  { id: 'wide-2', width: '18rem', image: gallerySlides[1].image, alt: gallerySlides[1].alt },
  { id: 'wide-3', width: '10rem', image: gallerySlides[2].image, alt: gallerySlides[2].alt },
  { id: 'wide-4', width: '22rem', image: gallerySlides[3].image, alt: gallerySlides[3].alt },
  { id: 'wide-5', width: '14rem', image: gallerySlides[4].image, alt: gallerySlides[4].alt },
] as const;

export const carouselExampleCss = `
  [data-scope='carousel'][data-part='root'] {
    width: min(100%, 42rem);
  }

  [data-scope='carousel'][data-part='item-group'] {
    border-radius: var(--radius-xl);
  }

  [data-scope='carousel'][data-part='item'] > img {
    display: block;
    width: 100%;
    height: 21rem;
    object-fit: cover;
    border-radius: var(--radius-xl);
  }

  [data-scope='carousel'][data-part='indicator'][data-current] {
    background-color: var(--color-primary);
  }
`;

export const carouselSlidesData = `
  const slides = [
    {
      id: "fjord",
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80",
      alt: "A lakeside landscape with mountains and warm sunset light.",
    },
    {
      id: "coast",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80",
      alt: "Ocean waves rolling onto a sandy beach.",
    },
    {
      id: "village",
      src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80",
      alt: "A colorful hillside town on the coast.",
    },
    {
      id: "forest",
      src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80",
      alt: "A misty green forest with tall trees.",
    },
    {
      id: "desert",
      src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80",
      alt: "Golden sand dunes under a bright sky.",
    },
  ];
`;

export const carouselVariableSlidesData = `
  const slides = [
    {
      id: "small",
      width: "13rem",
      src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80",
      alt: "A lakeside landscape with mountains and warm sunset light.",
    },
    {
      id: "medium",
      width: "18rem",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80",
      alt: "Ocean waves rolling onto a sandy beach.",
    },
    {
      id: "narrow",
      width: "10rem",
      src: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80",
      alt: "A colorful hillside town on the coast.",
    },
    {
      id: "wide",
      width: "22rem",
      src: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80",
      alt: "A misty green forest with tall trees.",
    },
  ];
`;

export const carouselOverrideCssProperties: CssPropertyInput[] = [
  [
    '--carousel-control-bg',
    'color-mix(in oklab, var(--color-background) 92%, var(--color-card) 8%)',
    'Controls the trigger and autoplay button background.',
  ],
  [
    '--carousel-control-bg-hover',
    'var(--color-accent)',
    'Controls the trigger and autoplay button hover background.',
  ],
  [
    '--carousel-control-border-color',
    'color-mix(in oklab, var(--color-border) 88%, black 12%)',
    'Controls the trigger and autoplay button border color.',
  ],
  [
    '--carousel-control-border-color-hover',
    'color-mix(in oklab, var(--color-border) 50%, var(--color-foreground) 50%)',
    'Controls the trigger and autoplay button hover border color.',
  ],
  [
    '--carousel-control-color',
    'var(--color-foreground)',
    'Controls the trigger and autoplay button icon color.',
  ],
  [
    '--carousel-control-color-hover',
    'var(--color-accent-foreground)',
    'Controls the trigger and autoplay button hover icon color.',
  ],
  ['--carousel-control-shadow', 'var(--shadow-sm)', 'Controls the trigger shadow.'],
  ['--carousel-control-shadow-hover', 'var(--shadow-md)', 'Controls the trigger hover shadow.'],
  [
    '--carousel-autoplay-indicator-min-width',
    'var(--spacing-4)',
    'Controls the minimum status label width.',
  ],
  [
    '--carousel-autoplay-trigger-min-width',
    'calc(var(--size-md) + var(--spacing-3))',
    'Controls the labelled autoplay trigger minimum width.',
  ],
  ['--carousel-control-icon-size', 'var(--spacing-4)', 'Controls trigger icon size.'],
  ['--carousel-control-size', 'var(--size-md)', 'Controls trigger size.'],
  [
    '--carousel-focus-ring-color',
    'var(--color-ring)',
    'Controls focus ring color for triggers and indicators.',
  ],
  ['--carousel-focus-ring-offset', 'var(--focus-ring-offset)', 'Controls focus ring offset.'],
  [
    '--carousel-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus ring width.',
  ],
  ['--carousel-gap', 'var(--spacing-3)', 'Controls spacing between Ark parts.'],
  ['--carousel-height', '24rem', 'Controls the root height in vertical orientation.'],
  [
    '--carousel-indicator-bg',
    'color-mix(in oklab, var(--color-muted) 84%, var(--color-background) 16%)',
    'Controls idle indicator color.',
  ],
  ['--carousel-indicator-bg-current', 'var(--color-primary)', 'Controls current indicator color.'],
  [
    '--carousel-indicator-bg-hover',
    'color-mix(in oklab, var(--color-muted) 56%, var(--color-foreground) 44%)',
    'Controls indicator hover color.',
  ],
  ['--carousel-indicator-gap', 'var(--spacing-2)', 'Controls spacing between indicators.'],
  ['--carousel-indicator-size', 'var(--spacing-2)', 'Controls base indicator size.'],
  [
    '--carousel-progress-text-color',
    'var(--color-muted-foreground)',
    'Controls progress text color.',
  ],
  ['--carousel-progress-text-font-size', 'var(--text-sm)', 'Controls progress text font size.'],
  ['--carousel-track-radius', 'var(--radius-xl)', 'Controls the scroll track radius.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function ImageSlide({
  src,
  alt,
  className,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  style?: ComponentProps<'figure'>['style'];
}) {
  return (
    <figure className={clsx(styles.slide, className)} style={style}>
      <img src={src} alt={alt} className={styles.image} />
    </figure>
  );
}

export function CarouselCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={carouselOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

type CarouselExampleProps = Omit<ComponentProps<typeof Carousel.Root>, 'slideCount'> & {
  slideCount?: number;
};

export function CarouselExample({
  className,
  slideCount = gallerySlides.length,
  ...props
}: CarouselExampleProps) {
  const slides = gallerySlides.slice(0, slideCount);

  return (
    <Carousel slideCount={slideCount} className={clsx(styles.carousel, className)} {...props}>
      <Carousel.ItemGroup aria-label="Featured travel gallery">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
      <Carousel.ProgressText />
    </Carousel>
  );
}

export function ControlledCarouselExample() {
  const [page, setPage] = useState(0);

  return (
    <Carousel
      slideCount={gallerySlides.length}
      page={page}
      onPageChange={(details) => setPage(details.page)}
      className={styles.carousel}
    >
      <Carousel.ItemGroup aria-label="Controlled travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <div className={styles.statusRow}>
        <Carousel.Indicators />
        <output className={styles.output}>Page {page + 1}</output>
      </div>
    </Carousel>
  );
}

export function AutoplayCarouselExample() {
  return (
    <Carousel
      autoplay={{ delay: 3500 }}
      loop
      slideCount={gallerySlides.length}
      className={styles.carousel}
    >
      <Carousel.ItemGroup aria-label="Autoplay travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.AutoplayTrigger>
          <Carousel.AutoplayIndicator fallback="Play">Pause</Carousel.AutoplayIndicator>
        </Carousel.AutoplayTrigger>
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
    </Carousel>
  );
}

export function LoopCarouselExample() {
  return (
    <Carousel loop slideCount={gallerySlides.length} className={styles.carousel}>
      <Carousel.ItemGroup aria-label="Looping travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
      <Carousel.ProgressText />
    </Carousel>
  );
}

export function MouseDragCarouselExample() {
  return (
    <Carousel allowMouseDrag slideCount={gallerySlides.length} className={styles.carousel}>
      <Carousel.ItemGroup aria-label="Mouse draggable travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
      <Carousel.ProgressText />
    </Carousel>
  );
}

export function PauseOnHoverCarouselExample() {
  return (
    <Carousel autoplay loop slideCount={gallerySlides.length} className={styles.carousel}>
      <Carousel.Context>
        {(api) => (
          <>
            <p className={styles.statusText}>Autoplay: {api.isPlaying ? 'playing' : 'paused'}</p>
            <Carousel.ItemGroup
              aria-label="Pause on hover travel gallery"
              onPointerOver={() => api.pause()}
              onPointerLeave={() => api.play()}
            >
              {gallerySlides.map((slide, index) => (
                <Carousel.Item key={slide.id} index={index}>
                  <ImageSlide src={slide.image} alt={slide.alt} />
                </Carousel.Item>
              ))}
            </Carousel.ItemGroup>
          </>
        )}
      </Carousel.Context>
      <Carousel.Indicators />
    </Carousel>
  );
}

export function DynamicSlidesCarouselExample() {
  const [count, setCount] = useState(4);
  const [page, setPage] = useState(0);
  const slides = gallerySlides.slice(0, count);

  const handleAddSlide = () => {
    setCount((currentCount) => Math.min(gallerySlides.length, currentCount + 1));
  };

  return (
    <div className={styles.exampleStack}>
      <Carousel
        slideCount={slides.length}
        page={page}
        onPageChange={(details) => setPage(details.page)}
        className={styles.carousel}
      >
        <Carousel.ItemGroup aria-label="Dynamic travel gallery">
          {slides.map((slide, index) => (
            <Carousel.Item key={slide.id} index={index}>
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
      <Button onClick={handleAddSlide} disabled={count === gallerySlides.length} variant="outline">
        <PlusIcon />
        Add slide
      </Button>
    </div>
  );
}

export function RootProviderCarouselExample() {
  const carousel = useCarousel({ slideCount: gallerySlides.length });

  return (
    <div className={styles.exampleStack}>
      <output className={styles.output}>Page {carousel.page + 1}</output>
      <Carousel.RootProvider value={carousel} className={styles.carousel}>
        <Carousel.ItemGroup aria-label="Root provider travel gallery">
          {gallerySlides.map((slide, index) => (
            <Carousel.Item key={slide.id} index={index}>
              <ImageSlide src={slide.image} alt={slide.alt} />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.Control className={styles.compactControls}>
          <Carousel.PrevTrigger />
          <Carousel.NextTrigger />
        </Carousel.Control>
        <Carousel.Indicators />
      </Carousel.RootProvider>
    </div>
  );
}

export function ScrollToCarouselExample() {
  return (
    <Carousel slideCount={gallerySlides.length} className={styles.carousel}>
      <Carousel.Context>
        {(api) => (
          <div className={styles.toolbar}>
            <Button onClick={() => api.scrollToIndex(3)} variant="outline">
              Go to slide 4
            </Button>
          </div>
        )}
      </Carousel.Context>
      <Carousel.ItemGroup aria-label="Scroll to travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.Indicators />
    </Carousel>
  );
}

export function SlidesPerPageCarouselExample() {
  return (
    <Carousel
      slideCount={gallerySlides.length}
      slidesPerPage={2}
      spacing="var(--spacing-3)"
      className={clsx(styles.carousel, styles.wideCarousel)}
    >
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.ItemGroup aria-label="Two-up travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} className={styles.shortSlide} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Indicators />
    </Carousel>
  );
}

export function SpacingCarouselExample() {
  return (
    <Carousel
      slideCount={gallerySlides.length}
      slidesPerPage={1.5}
      spacing="3rem"
      className={clsx(styles.carousel, styles.wideCarousel)}
    >
      <p className={styles.statusText}>spacing=&quot;3rem&quot;</p>
      <Carousel.ItemGroup aria-label="Spaced travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} className={styles.shortSlide} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.Indicators />
        <Carousel.NextTrigger />
      </Carousel.Control>
    </Carousel>
  );
}

export function ThumbnailIndicatorCarouselExample() {
  return (
    <Carousel slideCount={gallerySlides.length} className={styles.carousel}>
      <Carousel.ItemGroup aria-label="Travel gallery with thumbnail indicators">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.IndicatorGroup className={styles.thumbnailGroup}>
        {gallerySlides.map((slide, index) => (
          <Carousel.Indicator key={slide.id} index={index} className={styles.thumbnailIndicator}>
            <img src={slide.image} alt={slide.alt} className={styles.thumbnailImage} />
          </Carousel.Indicator>
        ))}
      </Carousel.IndicatorGroup>
    </Carousel>
  );
}

export function VariableSizeCarouselExample() {
  return (
    <Carousel
      autoSize
      padding="var(--spacing-4)"
      spacing="var(--spacing-3)"
      slideCount={variableSlides.length}
      className={styles.carousel}
    >
      <Carousel.Control className={styles.compactControls}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>
      <Carousel.ItemGroup aria-label="Variable size travel gallery">
        {variableSlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index} snapAlign="center">
            <ImageSlide
              src={slide.image}
              alt={slide.alt}
              className={styles.variableSlide}
              style={{ width: slide.width }}
            />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Indicators />
    </Carousel>
  );
}

export function VerticalCarouselExample() {
  return (
    <Carousel
      orientation="vertical"
      slideCount={gallerySlides.length}
      className={clsx(styles.carousel, styles.verticalCarousel)}
    >
      <Carousel.ItemGroup aria-label="Vertical travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} className={styles.verticalSlide} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.Indicators />
        <Carousel.NextTrigger />
      </Carousel.Control>
    </Carousel>
  );
}

export function AdvancedCustomizationCarouselExample() {
  return (
    <Carousel
      slideCount={gallerySlides.length}
      slidesPerPage={2}
      spacing="var(--spacing-3)"
      className={clsx(styles.carousel, styles.wideCarousel)}
    >
      <Carousel.Context>
        {(api) => (
          <>
            <div className={styles.toolbar}>
              <Button
                onClick={() => {
                  api.scrollTo(1);
                }}
                variant="outline"
              >
                Go to slide 4
              </Button>
            </div>
            <Carousel.Control>
              <Carousel.PrevTrigger />
              <Carousel.IndicatorGroup>
                {api.pageSnapPoints.map((_, index) => (
                  <Carousel.Indicator key={index} index={index} />
                ))}
              </Carousel.IndicatorGroup>
              <Carousel.NextTrigger />
            </Carousel.Control>
          </>
        )}
      </Carousel.Context>
      <Carousel.ItemGroup aria-label="Advanced customization travel gallery">
        {gallerySlides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <ImageSlide src={slide.image} alt={slide.alt} className={styles.shortSlide} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>
    </Carousel>
  );
}