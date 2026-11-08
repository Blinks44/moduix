<script lang="ts">
  import { DownloadTrigger } from '@ark-ui/svelte/download-trigger';
  import { Button } from '@moduix/svelte/button';
  const workspaceSummary = JSON.stringify(
    { project: 'moduix', status: 'ready', updatedAt: '2026-08-24T10:30:00.000Z' },
    null,
    2,
  );
</script>

<DownloadTrigger
  data={workspaceSummary}
  fileName="workspace-summary.json"
  mimeType="application/json"
>
  {#snippet asChild(props)}
    <Button {...props()} type="button">Download JSON</Button>
  {/snippet}
</DownloadTrigger>