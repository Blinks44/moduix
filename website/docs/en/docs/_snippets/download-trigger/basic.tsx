import { DownloadTrigger } from '@ark-ui/react/download-trigger';
import { Button } from '@moduix/react/button';
import { Card } from '@moduix/react/card';
import { Stack } from '@moduix/react/stack';

const workspaceSummary = JSON.stringify(
  {
    project: 'moduix',
    status: 'ready',
    updatedAt: '2026-08-24T10:30:00.000Z',
  },
  null,
  2,
);

export default function DownloadTriggerBasicDemo() {
  return (
    <Card>
      <Card.Header>
        <Card.Title>Workspace summary</Card.Title>
        <Card.Description>Export the current workspace details as a JSON file.</Card.Description>
      </Card.Header>
      <Card.Body>
        <Stack gap={2}>
          <strong>Ready to export</strong>
          <span>JSON · 3 fields</span>
        </Stack>
      </Card.Body>
      <Card.Footer>
        <DownloadTrigger
          asChild
          data={workspaceSummary}
          fileName="workspace-summary.json"
          mimeType="application/json"
        >
          <Button type="button">Download JSON</Button>
        </DownloadTrigger>
      </Card.Footer>
    </Card>
  );
}