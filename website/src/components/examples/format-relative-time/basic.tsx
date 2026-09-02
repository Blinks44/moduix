import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

const reviewStartsAt = new Date(Date.now() + 12 * 60 * 1000);

export default function FormatRelativeTimeBasicDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Scheduled review</Card.Title>
        <Card.Description>
          The editor can still make changes before the review begins.
        </Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <span>Starts</span>
          <strong>
            <Format.RelativeTime numeric="auto" value={reviewStartsAt} />
          </strong>
        </Stack>
      </Card.Body>
    </Card>
  );
}