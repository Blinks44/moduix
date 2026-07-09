//#region demo
import { Carousel } from '@moduix/react';

const slides = [
  {
    id: 'fjord',
    src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1280&q=80',
    alt: 'A lakeside landscape with mountains and warm sunset light.',
  },
  {
    id: 'coast',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1280&q=80',
    alt: 'Ocean waves rolling onto a sandy beach.',
  },
  {
    id: 'village',
    src: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1280&q=80',
    alt: 'A colorful hillside town on the coast.',
  },
  {
    id: 'forest',
    src: 'https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1280&q=80',
    alt: 'A misty green forest with tall trees.',
  },
  {
    id: 'desert',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1280&q=80',
    alt: 'Golden sand dunes under a bright sky.',
  },
];

export function SpacingCarousel() {
  return (
    <Carousel slideCount={slides.length} slidesPerPage={1.5} spacing="3rem">
      <Carousel.ItemGroup aria-label="Spaced gallery">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <img src={slide.src} alt={slide.alt} />
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
//#endregion