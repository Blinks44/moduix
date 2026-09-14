import { Badge } from '@moduix/solid/badge';
import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import styles from '@/components/examples/card/card-horizontal.module.css';

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
    <Card class={styles.root}>
      <img class={styles.image} src={item.image} alt={item.imageAlt} />
      <div class={styles.content}>
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