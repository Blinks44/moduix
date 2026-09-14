import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import styles from '@/components/examples/card/card-basic.module.css';

const content = {
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions · 12 checks passed',
};

export default function CardDemo() {
  return (
    <Card class={styles.root}>
      <Card.Header>
        <Card.Title>{content.title}</Card.Title>
        <Card.Description>{content.description}</Card.Description>
      </Card.Header>
      <Card.Body>{content.summary}</Card.Body>
      <Card.Footer>
        <Button variant="outline">View log</Button>
        <Button>Promote release</Button>
      </Card.Footer>
    </Card>
  );
}