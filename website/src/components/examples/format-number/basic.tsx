import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

export default function FormatNumberBasicDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Available balance</Card.Title>
        <Card.Description>The current balance across all projects.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <span>Balance</span>
          <strong>
            <Format.Number value={12_345.67} />
          </strong>
        </Stack>
      </Card.Body>
    </Card>
  );
}