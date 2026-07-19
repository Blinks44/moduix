//#region demo
import { Carousel } from '@moduix/react';

const slides = [
  {
    id: 'small',
    width: '13rem',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    id: 'medium',
    width: '18rem',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
    alt: 'Ocean waves rolling onto a sandy beach.',
  },
  {
    id: 'narrow',
    width: '10rem',
    src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80',
    alt: 'A colorful hillside town on the coast.',
  },
  {
    id: 'wide',
    width: '22rem',
    src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80',
    alt: 'A misty green forest with tall trees.',
  },
];

export function VariableSizeCarousel() {
  return (
    <Carousel
      autoSize
      slideCount={slides.length}
      spacing="var(--spacing-3)"
      padding="var(--spacing-4)"
    >
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>

      <Carousel.ItemGroup aria-label="Variable size gallery">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index} snapAlign="center">
            <img src={slide.src} alt={slide.alt} style={{ width: slide.width }} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Indicators />
    </Carousel>
  );
}
//#endregion