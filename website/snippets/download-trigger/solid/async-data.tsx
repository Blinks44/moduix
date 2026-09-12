import { DownloadTrigger } from '@ark-ui/solid/download-trigger';
import { Button } from '@moduix/solid/button';

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
      asChild={(props) => <Button {...props()} type="button" variant="outline" />}
      data={createMemberExport}
      fileName="team-members.csv"
      mimeType="text/csv"
    >
      Download CSV
    </DownloadTrigger>
  );
}