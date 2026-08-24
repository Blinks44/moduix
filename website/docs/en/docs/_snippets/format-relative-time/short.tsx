import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

const lastSavedAt = new Date(Date.now() - 43 * 60 * 1000);

export default function FormatRelativeTimeShortDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Document status</Card.Title>
        <Card.Description>Use the compact form when space is limited.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <span>Last saved</span>
          <strong>
            <Format.RelativeTime style="short" value={lastSavedAt} />
          </strong>
        </Stack>
      </Card.Body>
    </Card>
  );
}