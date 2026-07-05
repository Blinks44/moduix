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
];

export function TravelCarousel() {
  return (
    <Carousel slideCount={slides.length}>
      <Carousel.Control>
        <Carousel.PrevTrigger />
        <Carousel.ItemGroup aria-label="Travel gallery">
          {slides.map((slide, index) => (
            <Carousel.Item key={slide.id} index={index}>
              <img src={slide.src} alt={slide.alt} />
            </Carousel.Item>
          ))}
        </Carousel.ItemGroup>
        <Carousel.NextTrigger />
      </Carousel.Control>

      <Carousel.IndicatorGroup>
        {slides.map((slide, index) => (
          <Carousel.Indicator key={slide.id} index={index} />
        ))}
      </Carousel.IndicatorGroup>

      <Carousel.ProgressText />
    </Carousel>
  );
}
//#endregion