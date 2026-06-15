import type { ComponentProps } from 'react';
import { clsx } from 'clsx';
import {
  SnapCarousel,
  SnapCarouselContent,
  SnapCarouselItem,
  SnapCarouselNext,
  SnapCarouselPrevious,
  SnapCarouselViewport,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './snap-carousel.module.css';

const destinations = [
  {
    eyebrow: 'Norway',
    title: 'Fjord route',
    description: 'A calm route through mountain water, cliffs, and long summer light.',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    eyebrow: 'Portugal',
    title: 'Ocean house',
    description: 'Native scrolling keeps touch, wheel, and trackpad gestures feeling natural.',
    image:
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
    alt: 'Ocean waves rolling onto a sandy beach.',
  },
  {
    eyebrow: 'Italy',
    title: 'Quiet courtyard',
    description: 'Use the simple content wrapper or compose viewport and items directly.',
    image:
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80',
    alt: 'A colorful hillside town on the coast.',
  },
  {
    eyebrow: 'Japan',
    title: 'Forest stay',
    description: 'Scroll-snap makes each panel settle without custom carousel state.',
    image:
      'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80',
    alt: 'A misty green forest with tall trees.',
  },
] as const;

export const snapCarouselOverrideCssProperties: CssPropertyInput[] = [
  ['--snap-carousel-focus-ring-color', 'var(--color-ring)', 'Controls focus-visible ring color.'],
  ['--snap-carousel-focus-ring-offset', 'var(--spacing-1)', 'Controls focus-visible ring offset.'],
  [
    '--snap-carousel-focus-ring-width',
    'var(--border-width-md)',
    'Controls focus-visible ring width.',
  ],
  ['--snap-carousel-gap', 'var(--spacing-3)', 'Controls root layout gap.'],
  ['--snap-carousel-height', '100%', 'Controls vertical carousel height.'],
  ['--snap-carousel-item-gap', 'var(--spacing-4)', 'Controls gap between snap items.'],
  ['--snap-carousel-item-size', '100%', 'Controls snap item flex basis.'],
  ['--snap-carousel-snap-stop', 'normal', 'Controls item `scroll-snap-stop`.'],
];

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function DestinationSlide({
  destination,
  index,
}: {
  destination: (typeof destinations)[number];
  index: number;
}) {
  return (
    <article className={styles.slide}>
      <img src={destination.image} alt={destination.alt} className={styles.image} />
      <div className={styles.slideContent}>
        <p className={styles.eyebrow}>
          {destination.eyebrow} / 0{index + 1}
        </p>
        <h3 className={styles.title}>{destination.title}</h3>
        <p className={styles.description}>{destination.description}</p>
      </div>
    </article>
  );
}

export function SnapCarouselCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={snapCarouselOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function SnapCarouselExample({ className, ...props }: ComponentProps<typeof SnapCarousel>) {
  return (
    <SnapCarousel className={clsx(styles.carousel, className)} {...props}>
      <SnapCarouselContent aria-label="Featured destinations">
        {destinations.map((destination, index) => (
          <DestinationSlide key={destination.title} destination={destination} index={index} />
        ))}
      </SnapCarouselContent>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  );
}

export function SnapCarouselCustomStylingExample() {
  return (
    <SnapCarousel className={clsx(styles.carousel, styles.peekCarousel)}>
      <SnapCarouselContent aria-label="Featured destinations" itemClassName={styles.peekItem}>
        {destinations.map((destination, index) => (
          <DestinationSlide key={destination.title} destination={destination} index={index} />
        ))}
      </SnapCarouselContent>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  );
}

export function SnapCarouselCompositionExample() {
  return (
    <SnapCarousel className={clsx(styles.carousel, styles.cardsCarousel)}>
      <SnapCarouselViewport aria-label="Featured destination cards">
        <SnapCarouselContent>
          {destinations.map((destination, index) => (
            <SnapCarouselItem key={destination.title} className={styles.cardItem}>
              <article className={styles.card}>
                <img src={destination.image} alt="" className={styles.cardImage} />
                <div>
                  <p className={styles.eyebrow}>
                    0{index + 1} / {destination.eyebrow}
                  </p>
                  <h3 className={styles.cardTitle}>{destination.title}</h3>
                  <p className={styles.cardDescription}>{destination.description}</p>
                </div>
              </article>
            </SnapCarouselItem>
          ))}
        </SnapCarouselContent>
      </SnapCarouselViewport>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  );
}

export function SnapCarouselVerticalExample() {
  return (
    <SnapCarousel orientation="vertical" className={clsx(styles.carousel, styles.verticalCarousel)}>
      <SnapCarouselContent aria-label="Vertical destination carousel">
        {destinations.map((destination, index) => (
          <DestinationSlide key={destination.title} destination={destination} index={index} />
        ))}
      </SnapCarouselContent>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  );
}