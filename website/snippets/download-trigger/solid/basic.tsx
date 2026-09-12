import { DownloadTrigger } from '@ark-ui/solid/download-trigger';
import { Button } from '@moduix/solid/button';

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
      asChild={(props) => <Button {...props()} type="button" />}
      data={workspaceSummary}
      fileName="workspace-summary.json"
      mimeType="application/json"
    >
      Download JSON
    </DownloadTrigger>
  );
}