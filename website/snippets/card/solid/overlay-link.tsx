import { Button } from '@moduix/solid/button';
import { Card } from '@moduix/solid/card';
import styles from '@/components/examples/card/card-overlay-link.module.css';

const incident = {
  href: '/incidents/response',
  title: 'Incident response',
  description: 'Owner rotation and escalation readiness.',
  summary: '18 min median response',
};

export default function OverlayLinkCardDemo() {
  return (
    <Card class={styles.root}>
      <Card.Header>
        <Card.Title>
          <Card.Link href={incident.href}>{incident.title}</Card.Link>
        </Card.Title>
        <Card.Description>{incident.description}</Card.Description>
        <Card.Action>
          <Button variant="outline" size="sm">
            Acknowledge
          </Button>
        </Card.Action>
      </Card.Header>
      <Card.Body>{incident.summary}</Card.Body>
    </Card>
  );
}