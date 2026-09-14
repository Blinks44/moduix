import { DownloadTrigger } from '@ark-ui/react/download-trigger';
import { Button } from '@moduix/react/button';

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
    <DownloadTrigger
      asChild
      data={workspaceSummary}
      fileName="workspace-summary.json"
      mimeType="application/json"
    >
      <Button type="button">Download JSON</Button>
    </DownloadTrigger>
  );
}