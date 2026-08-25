import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

export default function FormatTimeBasicDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Next departure</Card.Title>
        <Card.Description>Route 14 · Central station</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <span>Boarding starts at</span>
          <strong>
            <Format.Time value="18:45" />
          </strong>
        </Stack>
      </Card.Body>
    </Card>
  );
}