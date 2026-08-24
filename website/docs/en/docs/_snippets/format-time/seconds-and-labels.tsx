import { Format } from '@ark-ui/react';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

export default function FormatTimeSecondsAndLabelsDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Workspace activity</Card.Title>
        <Card.Description>Choose the level of detail that the task needs.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={3}>
          <Stack direction="row" justify="space-between" style={{ inlineSize: '100%' }}>
            <span>Last sync</span>
            <strong>
              <Format.Time value="09:08:12" withSeconds />
            </strong>
          </Stack>
          <Stack direction="row" justify="space-between" style={{ inlineSize: '100%' }}>
            <span>Support window</span>
            <strong>
              <Format.Time amLabel="morning" pmLabel="evening" value="17:15" />
            </strong>
          </Stack>
        </Stack>
      </Card.Body>
    </Card>
  );
}