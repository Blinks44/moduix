import { Badge } from '@moduix/react/badge';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';

const item = {
  title: 'The perfect latte',
  description: 'Espresso balanced with steamed milk and a light foam.',
  badge: 'Hot',
  action: 'Buy latte',
  image:
    'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1280&q=80',
  imageAlt: 'Caffè latte in a ceramic cup.',
};

export default function HorizontalCardDemo() {
  return (
    <Card
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(10rem, 0.8fr) minmax(0, 1.2fr)',
        overflow: 'hidden',
      }}
    >
      <img
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        src={item.image}
        alt={item.imageAlt}
      />
      <div style={{ display: 'flex', minWidth: 0, flexDirection: 'column' }}>
        <Card.Header>
          <Card.Title>{item.title}</Card.Title>
          <Card.Description>{item.description}</Card.Description>
        </Card.Header>
        <Card.Body>
          <Badge variant="secondary">{item.badge}</Badge>
        </Card.Body>
        <Card.Footer>
          <Button>{item.action}</Button>
        </Card.Footer>
      </div>
    </Card>
  );
}