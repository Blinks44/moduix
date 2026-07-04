//#region demo
import { Card } from '@moduix/react';

const metric = {
  title: 'System load',
  description: 'Aggregated worker utilization across the current batch.',
  value: 64,
};

export function CustomCardDemo() {
  return (
    <Card className="customCard">
      <Card.Header>
        <Card.Title>{metric.title}</Card.Title>
        <Card.Description>{metric.description}</Card.Description>
      </Card.Header>
      <Card.Body>{metric.value}%</Card.Body>
    </Card>
  );
}
//#endregion