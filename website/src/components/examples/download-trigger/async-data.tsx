import { DownloadTrigger } from '@ark-ui/react/download-trigger';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

const members = [
  ['Name', 'Role'],
  ['Ada Lovelace', 'Engineering'],
  ['Grace Hopper', 'Operations'],
];

async function createMemberExport() {
  await new Promise((resolve) => window.setTimeout(resolve, 300));

  return new Blob([members.map((row) => row.join(',')).join('\n')], { type: 'text/csv' });
}

export default function DownloadTriggerAsyncDataDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Team members</Card.Title>
        <Card.Description>Create the export only when someone asks for it.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <strong>2 members</strong>
          <span>CSV · generated on demand</span>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <DownloadTrigger
          asChild
          data={createMemberExport}
          fileName="team-members.csv"
          mimeType="text/csv"
        >
          <Button type="button" variant="outline">
            Download CSV
          </Button>
        </DownloadTrigger>
      </Card.Footer>
    </Card>
  );
}