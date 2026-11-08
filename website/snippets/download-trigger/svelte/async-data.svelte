<script lang="ts">
  import { DownloadTrigger } from '@ark-ui/svelte/download-trigger';
  import { Button } from '@moduix/svelte/button';
  const members = [
    ['Name', 'Role'],
    ['Ada Lovelace', 'Engineering'],
    ['Grace Hopper', 'Operations'],
  ];
  const createMemberExport = async () => {
    await new Promise((resolve) => window.setTimeout(resolve, 300));
    return new Blob([members.map((row) => row.join(',')).join('\n')], { type: 'text/csv' });
  };
</script>

<DownloadTrigger data={createMemberExport} fileName="team-members.csv" mimeType="text/csv">
  {#snippet asChild(props)}
    <Button {...props()} type="button" variant="outline">Download CSV</Button>
  {/snippet}
</DownloadTrigger>