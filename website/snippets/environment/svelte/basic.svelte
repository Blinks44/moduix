<script lang="ts">
  import { useEnvironmentContext } from '@ark-ui/svelte/environment';
  import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/svelte/card';
  import { Stack } from '@moduix/svelte/stack';
  import { onMount } from 'svelte';
  // Render under EnvironmentProvider when targeting a different document or shadow root.
  const environment = useEnvironmentContext();
  let details = $state({
    documentName: 'Detecting…',
    rootNode: 'Detecting…',
    windowHost: 'Detecting…',
  });
  onMount(() => {
    const { getDocument, getRootNode, getWindow } = environment();
    const root = getRootNode();
    details = {
      rootNode:
        root.nodeType === 9 ? 'Document' : root.nodeType === 11 ? 'Shadow root' : root.nodeName,
      documentName: getDocument().title || 'Untitled document',
      windowHost: getWindow().location.hostname || 'Local preview',
    };
  });
</script>

<Card>
  <CardHeader>
    <CardTitle>Resolved environment</CardTitle>
    <CardDescription>Ark queries DOM APIs from this environment.</CardDescription>
  </CardHeader>
  <CardBody>
    <Stack gap={2}>
      <span>Root node: {details.rootNode}</span>
      <span>Document: {details.documentName}</span>
      <span>Window: {details.windowHost}</span>
    </Stack>
  </CardBody>
</Card>