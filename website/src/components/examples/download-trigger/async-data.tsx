import { DownloadTrigger } from '@ark-ui/react/download-trigger';
import { Button } from '@moduix/react/button';

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
  );
}