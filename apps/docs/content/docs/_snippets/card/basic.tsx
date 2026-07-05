//#region demo
import { Button, Card } from '@moduix/react';

const content = {
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions · 12 checks passed',
};

export function CardDemo() {
  return (
    <Card className="card">
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
//#endregion