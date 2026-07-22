import { Badge, Card } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const incident = {
  title: 'Incident response',
  description: 'Owner rotation and escalation readiness.',
  status: 'Stable',
  summary: '18 min median response · 99.97% service uptime',
};

export default function CardActionDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
      <Card>
        <Card.Header>
          <Card.Title>{incident.title}</Card.Title>
          <Card.Description>{incident.description}</Card.Description>
          <Card.Action>
            <Badge variant="secondary">{incident.status}</Badge>
          </Card.Action>
        </Card.Header>
        <Card.Body>{incident.summary}</Card.Body>
      </Card>
    </PreviewLayout>
  );
}