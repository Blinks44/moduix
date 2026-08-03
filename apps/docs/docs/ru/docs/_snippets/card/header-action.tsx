import { Badge } from '@moduix/react/badge';
import { Card } from '@moduix/react/card';

const incident = {
  title: 'Incident response',
  description: 'Owner rotation and escalation readiness.',
  status: 'Stable',
  summary: '18 min median response · 99.97% service uptime',
};

export default function CardActionDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>{incident.title}</Card.Title>
        <Card.Description>{incident.description}</Card.Description>
        <Card.Action style={{ alignSelf: 'start' }}>
          <Badge variant="secondary">{incident.status}</Badge>
        </Card.Action>
      </Card.Header>
      <Card.Body>{incident.summary}</Card.Body>
    </Card>
  );
}