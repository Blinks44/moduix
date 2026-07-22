import { Button, Card } from '@moduix/react';

const product = {
  title: 'Warehouse capacity',
  description: 'North region allocation for the next planning cycle.',
  capacity: 72,
  image:
    'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1280&q=80',
  imageAlt: 'A warehouse with neatly stacked delivery boxes.',
};

export default function CardWithImageDemo() {
  return (
    <Card>
      <Card.Media>
        <img className="image" src={product.image} alt={product.imageAlt} />
      </Card.Media>
      <Card.Header>
        <Card.Title>{product.title}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
      </Card.Header>
      <Card.Body>{product.capacity}% allocated</Card.Body>
      <Card.Footer>
        <Button variant="outline">Open report</Button>
      </Card.Footer>
    </Card>
  );
}