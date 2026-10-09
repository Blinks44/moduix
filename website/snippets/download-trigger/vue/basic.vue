<script setup lang="ts">
import { DownloadTrigger } from '@ark-ui/vue/download-trigger';
import { Button } from '@moduix/vue/button';
const workspaceSummary = JSON.stringify(
  { project: 'moduix', status: 'ready', updatedAt: '2026-08-24T10:30:00.000Z' },
  null,
  2,
);
</script>
<template>
  <DownloadTrigger
    as-child
    :data="workspaceSummary"
    file-name="workspace-summary.json"
    mime-type="application/json"
  >
    <Button type="button">Download JSON</Button>
  </DownloadTrigger>
</template>