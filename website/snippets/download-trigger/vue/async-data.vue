<script setup lang="ts">
import { DownloadTrigger } from '@ark-ui/vue/download-trigger';
import { Button } from '@moduix/vue/button';
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
<template>
  <DownloadTrigger
    as-child
    :data="createMemberExport"
    file-name="team-members.csv"
    mime-type="text/csv"
  >
    <Button type="button" variant="outline">Download CSV</Button>
  </DownloadTrigger>
</template>