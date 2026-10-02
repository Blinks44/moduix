<script setup lang="ts">
import { useEnvironmentContext } from '@ark-ui/vue/environment';
import { Card, CardBody, CardDescription, CardHeader, CardTitle } from '@moduix/vue/card';
import { Stack } from '@moduix/vue/stack';
import { onMounted, ref } from 'vue';
// Render under EnvironmentProvider when targeting a different document or shadow root.
const environment = useEnvironmentContext();
const details = ref({
  documentName: 'Detecting…',
  rootNode: 'Detecting…',
  windowHost: 'Detecting…',
});
onMounted(() => {
  const { getDocument, getRootNode, getWindow } = environment.value;
  const root = getRootNode();
  details.value = {
    rootNode:
      root.nodeType === 9 ? 'Document' : root.nodeType === 11 ? 'Shadow root' : root.nodeName,
    documentName: getDocument().title || 'Untitled document',
    windowHost: getWindow().location.hostname || 'Local preview',
  };
});
</script>
<template>
  <Card>
    <CardHeader
      ><CardTitle>Resolved environment</CardTitle
      ><CardDescription>Ark queries DOM APIs from this environment.</CardDescription></CardHeader
    >
    <CardBody
      ><Stack :gap="2">
        <span>Root node: {{ details.rootNode }}</span
        ><span>Document: {{ details.documentName }}</span
        ><span>Window: {{ details.windowHost }}</span>
      </Stack></CardBody
    >
  </Card>
</template>