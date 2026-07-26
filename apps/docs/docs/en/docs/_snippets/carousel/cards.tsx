import { Button, Card, Carousel } from '@moduix/react';

const destinations = [
  {
    id: 'bergen',
    title: 'Bergen, Norway',
    description: 'A colorful harbor between seven mountains.',
    image:
      'https://images.unsplash.com/photo-1524666041070-9d87656c25bb?auto=format&fit=crop&w=1280&q=80',
  },
  {
    id: 'kyoto',
    title: 'Kyoto, Japan',
    description: 'Quiet temples, lantern-lit streets, and autumn gardens.',
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1280&q=80',
  },
  {
    id: 'lisbon',
    title: 'Lisbon, Portugal',
    description: 'Sunlit hills, tiled facades, and Atlantic views.',
    image:
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1280&q=80',
  },
];

export default function CardCarousel() {
  return (
    <Carousel aria-label="Featured destinations" slideCount={destinations.length}>
      <Carousel.ItemGroup>
        {destinations.map((destination, index) => (
          <Carousel.Item key={destination.id} index={index}>
            <Card style={{ width: '80%', height: '100%', marginInline: 'auto' }}>
              <Card.Media>
                <img
                  src={destination.image}
                  alt=""
                  style={{ display: 'block', width: '100%', height: '12rem', objectFit: 'cover' }}
                />
              </Card.Media>
              <Card.Header>
                <Card.Title>{destination.title}</Card.Title>
                <Card.Description>{destination.description}</Card.Description>
              </Card.Header>
              <Card.Footer style={{ marginTop: 'auto' }}>
                <Button style={{ marginTop: 'var(--moduix-spacing-3)' }} variant="outline">
                  Explore
                </Button>
              </Card.Footer>
            </Card>
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