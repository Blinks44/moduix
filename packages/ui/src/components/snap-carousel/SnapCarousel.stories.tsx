import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  SnapCarousel,
  SnapCarouselContent,
  SnapCarouselItem,
  SnapCarouselNext,
  SnapCarouselPrevious,
  SnapCarouselViewport,
} from './SnapCarousel';
import styles from './SnapCarousel.stories.module.css';

const slides = [
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
    description: 'Use the sugar component or compose the native parts directly.',
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

function Slide({ slide, index }: { slide: (typeof slides)[number]; index: number }) {
  return (
    <article className={styles.slide}>
      <img src={slide.image} alt={slide.alt} className={styles.image} />
      <div className={styles.slideContent}>
        <p className={styles.eyebrow}>
          {slide.eyebrow} / 0{index + 1}
        </p>
        <h3 className={styles.title}>{slide.title}</h3>
        <p className={styles.description}>{slide.description}</p>
      </div>
    </article>
  );
}

const meta = {
  title: 'Components/SnapCarousel',
  component: SnapCarousel,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <div className={styles.frame}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof SnapCarousel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => (
    <SnapCarousel>
      <SnapCarouselContent aria-label="Featured destinations">
        {slides.map((slide, index) => (
          <Slide key={slide.title} slide={slide} index={index} />
        ))}
      </SnapCarouselContent>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  ),
};

export const Composed: Story = {
  render: () => (
    <SnapCarousel className={styles.cards}>
      <SnapCarouselViewport aria-label="Featured cards">
        <SnapCarouselContent>
          {slides.map((slide, index) => (
            <SnapCarouselItem key={slide.title}>
              <article className={styles.card}>
                <p className={styles.eyebrow}>Card 0{index + 1}</p>
                <h3 className={styles.title}>{slide.title}</h3>
                <p className={styles.description}>{slide.description}</p>
              </article>
            </SnapCarouselItem>
          ))}
        </SnapCarouselContent>
      </SnapCarouselViewport>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  ),
};

export const Vertical: Story = {
  render: () => (
    <SnapCarousel orientation="vertical" className={styles.vertical}>
      <SnapCarouselContent aria-label="Vertical destination carousel">
        {slides.map((slide, index) => (
          <Slide key={slide.title} slide={slide} index={index} />
        ))}
      </SnapCarouselContent>
      <SnapCarouselPrevious />
      <SnapCarouselNext />
    </SnapCarousel>
  ),
};