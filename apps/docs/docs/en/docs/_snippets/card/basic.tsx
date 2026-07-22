import { Button, Card } from '@moduix/react';
import { PreviewLayout } from '@/components/examples/preview-layout';

const content = {
  title: 'Release health',
  description: 'Summary for the current production rollout.',
  summary: '98.4% successful sessions · 12 checks passed',
};

export default function CardDemo() {
  return (
    <PreviewLayout maxWidth="24rem">
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
    </PreviewLayout>
  );
}