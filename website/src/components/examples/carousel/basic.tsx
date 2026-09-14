import { Carousel } from '@moduix/react/carousel';
import styles from '@/components/examples/carousel/carousel-basic.module.css';

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

export default function TravelCarousel() {
  return (
    <Carousel className={styles.root} aria-label="Travel gallery" slideCount={slides.length}>
      <Carousel.ItemGroup className={styles.itemGroup} aria-label="Travel gallery">
        {slides.map((slide, index) => (
          <Carousel.Item key={slide.id} index={index}>
            <img className={styles.image} src={slide.src} alt={slide.alt} />
          </Carousel.Item>
        ))}
      </Carousel.ItemGroup>

      <Carousel.Control className={styles.control}>
        <Carousel.PrevTrigger />
        <Carousel.NextTrigger />
      </Carousel.Control>

      <Carousel.Indicators />

      <Carousel.ProgressText />
    </Carousel>
  );
}